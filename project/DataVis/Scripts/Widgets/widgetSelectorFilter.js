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

    function fillScope($scope, sandbox, data, config) {
        $scope.$apply(function () {
            $scope.schemaOptions = sandbox.getOriginalDatasource().schema;
            $scope.selectorFilterConfig = config;
            $scope.sendFilterConfig = function () {
                var event = {
                    type: events.updatedFilterConfig,
                    data: config
                }
                sandbox.notify(event);
            };
            $scope.getListOfValues = function () {
                getListOfValues(data, config);
            };
        });
    }

    function fillHtmlTemplate(sandbox, data, config) {
        var angular = sandbox.require('angular');
        var $scope = angular.element(sandbox.getContainer()).scope();
        fillScope($scope, sandbox, data, config);
    }

    function createFilterUIAndData(sandbox, config) {
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
        name: "selectorFilter",
        init: function (sandbox) {
            var config = getDefaultConfig();
            sandbox.listen(events.uploadedDataSource, function () {
                createFilterUIAndData(sandbox, config);
            });
            createFilterUIAndData(sandbox, config);

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    createFilterUIAndData(sandbox, config);
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