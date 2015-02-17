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

    function fillScope($scope, sandbox, data, config) {
        $scope.$apply(function () {
            $scope.rangeFilterConfig = config;
            $scope.schemaOptions = sandbox.getOriginalDatasource().schema;
            $scope.getListOfValues = function () {
                getListOfValues(data, config);
            };
            $scope.sendFilterConfig = function () {
                var event = {
                    type: events.updatedFilterConfig,
                    data: config
                }
                sandbox.notify(event);
            };
        });
    }

    function fillHtmlTemplate(sandbox, data, config) {
        getListOfValues(data, config);
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
        name: "rangeFilter",
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
        imgUrl: "RangeFilter",
        title: "range filter"
    }
}();