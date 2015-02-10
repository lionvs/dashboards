var widgetSelectorFilter = function () {

    function getDefaultConfig() {
        return {
            type: "selectorFilter",
            key: null,
            validationListOfValues: [],
            validValues: []
        }
    }

    var listOfValues = [];

    function getListOfValues(data, config) {
        listOfValues = _.uniq(_.map(data, function (num) {
            return num[config.key];
        }));
        config.validationListOfValues = _.map(listOfValues, function (num) {
            return { value: num, isValid: true };
        });
    }

    function fillScope($scope, sb, data, config) {
        $scope.$apply(function () {
            $scope.schemaOptions = sb.getOriginalDatasource().schema;
            $scope.selectorFilterConfig = config;
            $scope.sendFilterConfig = function () {
                var event = {
                    type: events.updatedFilterConfig,
                    data: config
                }
                sb.notify(event);
            };
            $scope.getListOfValues = function () {
                getListOfValues(data, config);
            };
        });
    }

    function fillHtmlTemplate(sb, data, config) {
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
        name: "selectorFilter",
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
        imgUrl: "SelectorFilter",
        title: "selector filter"
    }
}();