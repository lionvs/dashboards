var widgetRangeFilter = function () {

    function getDefaultConfig() {
        return {
            type: "rangeFilter",
            key: null,
            min: null,
            max: null,
            indexOfMin: null,
            indexOfMax: null,
            listOfValues: []
        }
    }

    var listOfValues = [];

    function getListOfValues(data, config) {
        config.listOfValues = _.uniq(_.map(data, function (num) {
            return num[config.key];
        }));
    }

    function fillScope($scope, sb, data, config) {
        $scope.rangeFilterConfig = config;
        $scope.schemaOptions = sb.getOriginalDatasource().schema;
        $scope.getListOfValues = function () {
            getListOfValues(data, config);
        };
        $scope.filterDataByRange = function () {
            var event = {
                type: events.updatedFilterConfig,
                data: config
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
        var dataSource = sb.getOriginalDatasource();
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
            sb.listen(events.uploadedDataSource, function () {
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