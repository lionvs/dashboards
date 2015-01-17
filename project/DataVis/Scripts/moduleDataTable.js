var moduleDataTable = function () {

    function getDefaultConfig() {
        return null;
    }

    function fillHtmlTemplate(sb, data, schema) {
        var angular = sb.require('angular');
        var $scope = angular.element(sb.getContainer()).scope();
        $scope.$apply(function () {
            $scope.schema = schema;
            $scope.data = data;
        });
    }

    function createDataTable(sb, config) {
        var element = sb.getContainer();
        var dataSource = sb.getDatasource();
        var $ = sb.require('JQuery');

        if (dataSource.data.length < 1) {
            $(element).hide();
            return;
        }

        fillHtmlTemplate(sb, dataSource.data, dataSource.schema);
        $(element).show();
    }

    return {
        name: "dataTable",
        init: function (sb) {
            var config = getDefaultConfig();

            sb.listen(events.updatedDataSource, function () {
                createDataTable(sb, config);
            });
            createDataTable(sb, config);

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    createDataTable(sb, config);
                },
                getConfig: function () {
                    return config;
                }
            }
        }
    }
}();

