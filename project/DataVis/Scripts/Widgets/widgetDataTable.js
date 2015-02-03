var widgetDataTable = function () {

    function getDefaultConfig() {
        return{
            width: '250px',
            height: '200px'
        }
    }

    function fillHtmlTemplate(sb, data, schema) {
        var angular = sb.require('angular');
        var $scope = angular.element(sb.getContainer()).scope();
        $scope.$apply(function () {
            $scope.schema = schema;
            $scope.data = data;
        });

    }

    function setResizable(element, config, $) {
        if (config)
            $(element).width(config.width).height(config.height);
        $(element).resizable({
            resize: function (e, ui) {
                config.width = ui.size.width;
                config.height = ui.size.height;
            }
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
        setResizable(element, config, $);
        
        $(element).show();
    }

    return {
        name: "dataTable",
        init: function (sb) {
            var config = getDefaultConfig();

            
            createDataTable(sb, config);
            sb.listen(events.updatedDataSource, function () {
                createDataTable(sb, config);
            });

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    createDataTable(sb, config);
                },
                getConfig: function () {
                    return config;
                }
            }
        },
        imgUrl: "DataTable"
    }
}();

