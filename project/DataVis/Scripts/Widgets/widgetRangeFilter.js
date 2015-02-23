var widgetRangeFilter = function () {

    function getDefaultConfig() {
        return {
            key: null,
            min: null,
            max: null,
            indexOfMin: null,
            indexOfMax: null,
            listOfValues: [],
            isActiveNow: true
        }
    }

    function getListOfValues(data, config) {
        config.listOfValues = _.uniq(_.map(data, function (num) {
            return num[config.key];
        }));
    }

    function isValidWhenNumber(num, config) {
        return Number(num[config.key]) >= Number(config.min)
            && Number(num[config.key]) <= Number(config.max);
    }

    function isValidWhenString(num, config) {
        return _.indexOf(config.listOfValues, num[config.key]) >= config.indexOfMin
            && _.indexOf(config.listOfValues, num[config.key]) <= config.indexOfMax;
    }


    function filter(inputData, config) {
        if (config.key === null) return inputData;
        config.min = config.min === "" || config.min === null ? -Infinity : config.min;
        config.max = config.max === "" || config.max === null ? Infinity : config.max;
        if (Number(config.listOfValues[0]) == config.listOfValues[0]) {
            var filteredData = _.filter(inputData, function (num) {
                return isValidWhenNumber(num, config);
            });
        }
        else {
            config.indexOfMin = _.indexOf(config.listOfValues, config.min);
            config.indexOfMax = _.indexOf(config.listOfValues, config.max);
            if (config.indexOfMax === -1) {
                config.indexOfMax = Infinity;
                config.max = Infinity;
            }
            if (config.indexOfMin === -1) {
                config.min = -Infinity;
            }
            var filteredData = _.filter(inputData, function (num) {
                return isValidWhenString(num, config);
            });
        }
        return filteredData;
    }

    function fillScope($scope, sandbox, data, config) {
        $scope.$apply(function () {
            $scope.config = config;
            $scope.schemaOptions = sandbox.getOriginalDatasource().schema;
            $scope.getListOfValues = function () {
                getListOfValues(data, config);
            };
            $scope.requireFiltering = function () {
                var event = {
                    type: events.requireFiltering,
                    data: config
                }
                sandbox.notify(event);
            };
            $scope.deactivateWidget = function () {
                config.isActiveNow = false;
            };
            $scope.activateWidget = function () {
                config.isActiveNow = true;
            };
        });
    }

    function fillHtmlTemplate(sandbox, data, config) {
        getListOfValues(data, config);
        var angular = sandbox.require('angular');
        var $scope = angular.element(sandbox.getContainer()).scope();
        fillScope($scope, sandbox, data, config);
    }

    function createFilterUI(sandbox, config) {
        var element = sandbox.getContainer();
        var dataSource = sandbox.getOriginalDatasource();
        var $ = sandbox.require('JQuery');

        if (dataSource.data.length < 1) {
            $(element).hide();
            return;
        }

        fillHtmlTemplate(sandbox, dataSource.data, config);
        $(element).show();
    }

    return {
        name: "rangeFilter",
        init: function (sandbox) {
            var config = getDefaultConfig();
            sandbox.listen(events.uploadedDataSource, function () {
                createFilterUI(sandbox, config);
            });
            createFilterUI(sandbox, config);
            sandbox.listen(events.requireListOfFilters, function () {
                if (config.isActiveNow) {
                    var event = {
                        type: events.sendFilterSettings,
                        data:
                            {
                                config: config,
                                filter: function (inputData, config) {
                                    return filter(inputData, config);
                                }
                            }
                    }
                    sandbox.notify(event);
                }
            });

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    createFilterUI(sandbox, config);
                },
                getConfig: function () {
                    return config;
                }
            }
        },
        imgUrl: "RangeFilter",
        title: "range filter"
    }
}();
