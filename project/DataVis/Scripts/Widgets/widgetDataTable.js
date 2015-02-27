var widgetDataTable = function () {

    function getDefaultConfig() {
        return{
            width: '250px',
            height: '200px'
        }
    }

    function fillHtmlTemplate(sandbox, data, schema) {
        var angular = sandbox.require('angular');
        var $scope = angular.element(sandbox.getContainer()).scope();
        _.defer(function() {
            $scope.schema = schema;
            $scope.data = data;
            $scope.$digest();
        });
    }

    function setResizable(element, config, $) {
        if (config)
            $(element.children[0]).width(config.width).height(config.height);
        $(element.children[0]).resizable({
            resize: function (e, ui) {
                config.width = ui.size.width;
                config.height = ui.size.height;
            }
        });
    }

    function createDataTable(sandbox, config) {
        var element = sandbox.getContainer();
        var dataSource = sandbox.getDatasource();
        var $ = sandbox.require('JQuery');

        fillHtmlTemplate(sandbox, dataSource.data, dataSource.schema);
        setResizable(element, config, $);
    }

    return {
        name: "dataTable",
        init: function (sandbox) {
            var config = getDefaultConfig();

            
            createDataTable(sandbox, config);
            sandbox.listen(events.updatedDataSource, function () {
                createDataTable(sandbox, config);
            });

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    createDataTable(sandbox, config);
                },
                getConfig: function () {
                    return config;
                }
            }
        },
        displayedName: "Table",
        imgUrl: "DataTable",
        title: "This is table for showing data that is currently in use"
    }
}();

