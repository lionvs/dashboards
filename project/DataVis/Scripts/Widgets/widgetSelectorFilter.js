var widgetSelectorFilter = function () {

    function getDefaultConfig() {
        return {
            key: null,
            validValues: []
        }
    }

    var listOfValues = [];
    var validationListOfValues = [];

    function getListOfValues(data, config) {
        listOfValues = _.uniq(_.map(data, function (num) {
            return num[config.key];
        }));
        validationListOfValues = _.map(listOfValues, function (num) {
            return { value: num, isValid: true };
        });
    }

    function readValidValues(data, config) {
        var validValues = _.filter(validationListOfValues, function (num) {
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
        readValidValues(inputData, config);
        var filteredData = _.filter(inputData, function (num) {
            return isValid(num, config);
        });
        return filteredData;
    }

    function fillScope($scope, sb, data, config) {
        $scope.selectorFilterConfig = config;
        $scope.schemaOptions = sb.getDatasource().schema;
        $scope.validationListOfValues = validationListOfValues;
        $scope.getListOfValues = function () {
            getListOfValues(data, config);
            fillScope($scope, sb, data, config);
        };
        $scope.filterDataBySelector = function () {
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
        name: "selectorFilter",
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
        imgUrl: "SelectorFilter"
    }
}();