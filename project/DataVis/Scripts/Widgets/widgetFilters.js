var widgetFilters = function () {
    
    function getDefaultConfig() {
        return {
            title: {
                key: null,
                validArr: []
            },
            x: {
                key: null,
                min: null,
                max: null,
                indexOfMin: null,
                indexOfMax: null
            },
            y: {
                key: null,
                min: null,
                max: null
            },
            originalDataSource: {}
        }
    }

    var titlesArr = [];
    var valuesOfX = [];

    function parseDataSource(data, config) {
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

    function readValidTitlesArr(config) {
        var validTitles = _.filter(titlesArr, function (num) {
            return num.isValid;
        });
        config.title.validArr = _.map(validTitles, function (num) {
            return num.value;
        });
    }

    function hasValidTitle(num, config) {
        return _.contains(config.title.validArr, num[config.title.key]);
    }

    function hasValidXWhenXNumber(num, config) {
        return Number(num[config.x.key]) >= Number(config.x.min)
            && Number(num[config.x.key]) <= Number(config.x.max);
    }

    function hasValidXWhenXString(num, config) {
        return _.indexOf(valuesOfX, num[config.x.key]) >= config.x.indexOfMin
            && _.indexOf(valuesOfX, num[config.x.key]) <= config.x.indexOfMax;
    }

    function hasValidY(num, config) {
        return num[config.y.key] >= config.y.min && num[config.y.key] <= config.y.max;
    }


    function hasValidAllPropsWhenXNumber(num, config) {
        return hasValidTitle(num, config) && hasValidXWhenXNumber(num, config) && hasValidY(num, config);
    }

    function hasValidAllPropsWhenXString(num, config) {
        return hasValidTitle(num, config) && hasValidXWhenXString(num, config) && hasValidY(num, config);
    }

    function filter(inputData, config) {
        config.x.min = config.x.min === "" || config.x.min === null ? -Infinity : config.x.min;
        config.x.max = config.x.max === "" || config.x.max === null ? Infinity : config.x.max;
        config.y.min = config.y.min === "" || config.y.min === null ? -Infinity : config.y.min;
        config.y.max = config.y.max === "" || config.y.max === null ? Infinity : config.y.max;
        readValidTitlesArr(config);
        if (Number(valuesOfX[0]) == valuesOfX[0]) {
            var filteredData = _.filter(inputData, function (num) {
                return hasValidAllPropsWhenXNumber(num, config);
            });
        }
        else {
            config.x.indexOfMin = _.indexOf(valuesOfX, config.x.min);
            config.x.indexOfMax = _.indexOf(valuesOfX, config.x.max);
            config.x.indexOfMax = config.x.indexOfMax === -1 ? Infinity : config.x.indexOfMax;
            var filteredData = _.filter(inputData, function (num) {
                return hasValidAllPropsWhenXString(num, config);
            });
        }
        return filteredData;
    }

    function fillScope($scope, sb, data, config) {
        $scope.titlesArr = titlesArr;
        $scope.filterConfig = config;
        $scope.filterData = function() {
            var myDataSource = {};
            myDataSource.schema = sb.getDatasource().schema;
            myDataSource.data = filter(data, config);
            var event = {
                type: events.updatedDataSource,
                data: myDataSource
            }
            sb.notify(event);
        };
        $scope.resetDataSource = function() {
            var event = {
                type: events.updatedDataSource,
                data: config.originalDataSource
            }
            sb.notify(event);
        }
    }

    function fillHtmlTemplate(sb, data, config) {
        parseDataSource(data, config);
        var angular = sb.require('angular');
        var $scope = angular.element(sb.getContainer()).scope();
        if (!$scope.$$phase) {
            $scope.$apply(function() {
                fillScope($scope, sb, data, config);
            });
        } else fillScope($scope, sb, data, config);
    }

    function createFilterUIAndData(sb, config) {
        var element = sb.getContainer();
        var dataSource = sb.getDatasource();
        var $ = sb.require('JQuery');

        if (dataSource.data.length < 1) {
            $(element).hide();
            return;
        }

        fillHtmlTemplate(sb, dataSource.data, config);
        $(element).show();
    }

    function changeFilterConfigKeys(filterConfig, chartConfig) {
        filterConfig.title.key = chartConfig.seriesName;
        filterConfig.x.key = chartConfig.xAxis;
        filterConfig.y.key = chartConfig.seriesData;
    }

    return {
        name: "filter",
        init: function (sb) {
            var config = getDefaultConfig();
            sb.listen(events.uploadedDataSource, function (dataSource) {
                config.originalDataSource = dataSource;
            });
            sb.listen(events.updatedDataSource, function () {
                createFilterUIAndData(sb, config);
            });
            sb.listen(events.updatedChartConfig, function (newConfig) {
                changeFilterConfigKeys(config, newConfig);
                createFilterUIAndData(sb, config);
            });
            createFilterUIAndData(sb, config);

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    createFilterUIAndData(sb, config);
                },
                getConfig: function () {
                    return config;
                }
            }
        },

        imgUrl: "Filters"
    }
}();