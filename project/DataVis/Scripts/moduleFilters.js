var moduleFilters = function () {
    
    var config = {
        title: {
            key: 'City',               //must take from UI or sandbox
            validArr: []
        },
        x: {
            key: 'Month',               //must take from UI or sandbox
            min: (-Infinity),
            max: (Infinity),
            indexOfMin: (-Infinity),
            indexOfMax: (Infinity)
        },
        y: {
            key: 'Temperature',               //must take from UI or sandbox
            min: (-Infinity),
            max: (Infinity)
        },
        originalDataSource: {}
    }

    var titlesArr = [];
    var valuesOfX = [];

    function parseDataSource(data) {
        var titles = _.uniq(_.map(data, function (num) {
            return num[config.title.key];
        }));
        titlesArr = _.map(titles, function (num) {
            return { value: num, isValid: true };
        });
        valuesOfX = _.uniq(_.map(data, function (num) {
            return num[config.x.key];
        }));
    }

    function readValidTitlesArr() {
        var validTitles = _.filter(titlesArr, function (num) {
            return num.isValid;
        });
        config.title.validArr = _.map(validTitles, function (num) {
            return num.value;
        });
    }

    function hasValidTitle(num) {
        return _.contains(config.title.validArr, num[config.title.key]);
    }

    function hasValidXWhenXNumber(num) {
        return parseInt(num[config.x.key]) >= parseInt(config.x.min)
            && parseInt(num[config.x.key]) <= parseInt(config.x.max);
    }

    function hasValidXWhenXString(num) {
        return _.indexOf(valuesOfX, num[config.x.key]) >= config.x.indexOfMin
            && _.indexOf(valuesOfX, num[config.x.key]) <= config.x.indexOfMax;
    }

    function hasValidY(num) {
        return num[config.y.key] >= config.y.min && num[config.y.key] <= config.y.max;
    }


    function hasValidAllPropsWhenXNumber(num) {
        return hasValidTitle(num) && hasValidXWhenXNumber(num) && hasValidY(num);
    }

    function hasValidAllPropsWhenXString(num) {
        return hasValidTitle(num) && hasValidXWhenXString(num) && hasValidY(num);
    }

    function filter(inputData) {
        config.x.min = config.x.min === "" ? -Infinity : config.x.min;
        config.x.max = config.x.max === "" ?  Infinity : config.x.max;
        config.y.min = config.y.min === "" ? -Infinity : config.y.min;
        config.y.max = config.y.max === "" ?  Infinity : config.y.max;
        readValidTitlesArr();
        if (parseInt(valuesOfX[0]) == valuesOfX[0]) {
            var filteredData = _.filter(inputData, function (num) {
                return hasValidAllPropsWhenXNumber(num);
            });
        }
        else {
            config.x.indexOfMin = _.indexOf(valuesOfX, config.x.min);
            config.x.indexOfMax = _.indexOf(valuesOfX, config.x.max);
            config.x.indexOfMax = config.x.indexOfMax === -1 ? Infinity : config.x.indexOfMax;
            var filteredData = _.filter(inputData, function (num) {
                return hasValidAllPropsWhenXString(num);
            });
        }
        return filteredData;
    }


    function fillHtmlTemplate(sb, data) {
        parseDataSource(data);
        var angular = sb.require('angular');
        var $scope = angular.element(sb.getContainer()).scope();
        $scope.$apply(function () {
            $scope.titlesArr = titlesArr;
            $scope.filterConfig = config;
            $scope.filterData = function () {
                var myDataSource = {};
                myDataSource.schema = sb.getDatasource().schema;
                myDataSource.data = filter(data);
                var event = {
                    type: events.updatedDataSource,
                    data: myDataSource
                }
                sb.notify(event);
            };
            $scope.resetDataSource = function () {
                var event = {
                    type: events.updatedDataSource,
                    data: config.originalDataSource
                }
                sb.notify(event);
            }
        });
    }

    function createFilterUIAndData(sb, config) {
        var element = sb.getContainer();
        var dataSource = sb.getDatasource();
        var $ = sb.require('JQuery');

        if (dataSource.data.length < 1) {
            $(element).hide();
            return;
        }

        fillHtmlTemplate(sb, dataSource.data);
        $(element).show();
    }

    return {
        name: "filter",
        init: function (sb) {
            sb.listen(events.uploadedDataSource, function (dataSource) {
                config.originalDataSource = dataSource;
            });
            sb.listen(events.updatedDataSource, function () {
                createFilterUIAndData(sb, config);
            });
            createFilterUIAndData(sb, config);

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    main(sb, config);
                    createFilterUIAndData(sb, config);
                },
                getConfig: function () {
                    return config;
                }
            }
        }
    }
}();