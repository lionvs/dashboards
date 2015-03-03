var widgetSelectorFilter = function () {

    function getDefaultConfig() {
        return {
            key: null,
            validationListOfValues: [],
            validValues: [],
            isActiveNow: true
        }
    }


    function getListOfValues(data, config) {
        var listOfValues = _.uniq(_.map(data, function (num) {
            return num[config.key];
        }));
        var sortedListOfValues = _.sortBy(listOfValues, function (num) {
            return Number(num);
        });
        config.validationListOfValues = _.map(sortedListOfValues, function (num) {
            return { value: num, isValid: true };
        });
    }

    function readValidValues(config) {
        var validValues = _.filter(config.validationListOfValues, function (num) {
            return num.isValid;
        });
        config.validValues = _.map(validValues, function (num) {
            return num.value;
        });
    }

    function isValid(num, config) {
        return _.contains(config.validValues, num[config.key]);
    }

    function filter(inputData, config) {
        if (config.key === null) return inputData;
        readValidValues(config);
        var filteredData = _.filter(inputData, function (num) {
            return isValid(num, config);
        });
        return filteredData;
    }

    var requiredFilteringId;

    function fillScope($scope, sandbox, data, config) {
        $scope.$apply(function () {
            $scope.schemaOptions = sandbox.getOriginalDatasource().schema;
            $scope.config = config;
            $scope.requireLazyFiltering = function (timeout) {
                if (config.isActiveNow) {
                    clearTimeout(requiredFilteringId);
                    requiredFilteringId = setTimeout(function () {
                        var event = {
                            type: events.requireFiltering,
                            data: config
                        }
                        sandbox.notify(event);
                    }, timeout);
                }
            };
            $scope.getListOfValues = function () {
                getListOfValues(data, config);
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
        var angular = sandbox.require('angular');
        var $scope = angular.element(sandbox.getContainer()).scope();
        fillScope($scope, sandbox, data, config);
    }

    function createFilterUI(sandbox, config) {
        var element = sandbox.getContainer();
        var dataSource = sandbox.getOriginalDatasource();
        var $ = sandbox.require('JQuery');
        fillHtmlTemplate(sandbox, dataSource.data, config);
    }

    return {
        name: "selectorFilter",
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
        displayedName: "Selector filter",
        imgUrl: "SelectorFilter",
        title: "selector filter"
    }
}();
