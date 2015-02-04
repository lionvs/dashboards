var widgetRangeFilter = function () {

    function getDefaultConfig() {
        return {
            key: null,
            min: null,
            max: null,
            indexOfMin: null,
            indexOfMax: null
        }
    }

    var listOfValues = [];

    function getListOfValues(data, config) {
        listOfValues = _.uniq(_.map(data, function (num) {
            return num[config.key];
        }));
    }

    function isValidWhenNumber(num, config) {
        return Number(num[config.key]) >= Number(config.min)
            && Number(num[config.key]) <= Number(config.max);
    }

    function isValidWhenString(num, config) {
        return _.indexOf(listOfValues, num[config.key]) >= config.indexOfMin
            && _.indexOf(listOfValues, num[config.key]) <= config.indexOfMax;
    }


    function filter(inputData, config) {
        config.min = config.min === "" || config.min === null ? -Infinity : config.min;
        config.max = config.max === "" || config.max === null ? Infinity : config.max;
        if (Number(listOfValues[0]) == listOfValues[0]) {
            var filteredData = _.filter(inputData, function (num) {
                return isValidWhenNumber(num, config);
            });
        }
        else {
            config.indexOfMin = _.indexOf(listOfValues, config.min);
            config.indexOfMax = _.indexOf(listOfValues, config.max);
            config.indexOfMax = config.indexOfMax === -1 ? Infinity : config.indexOfMax;
            var filteredData = _.filter(inputData, function (num) {
                return isValidWhenString(num, config);
            });
        }
        return filteredData;
    }

    function fillScope($scope, sb, data, config) {
        $scope.rangeFilterConfig = config;
        $scope.schemaOptions = sb.getDatasource().schema;
        $scope.getListOfValues = function () {
            getListOfValues(data, config);
        };
        $scope.filterDataByRange = function () {
            var myDataSource = {};
            myDataSource.schema = sb.getDatasource().schema;
            myDataSource.data = filter(data, config);
            var event = {
                type: events.updatedDataSource,
                data: myDataSource
            }
            sb.notify(event);
        };
    }

    function fillHtmlTemplate(sb, data, config) {
        getListOfValues(data, config);
        var angular = sb.require('angular');
        var $scope = angular.element(sb.getContainer()).scope();
        fillScope($scope, sb, data, config);
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

    return {
        name: "rangeFilter",
        init: function (sb) {
            var config = getDefaultConfig();
            sb.listen(events.updatedDataSource, function () {
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
        imgUrl: "RangeFilter"
    }
}();