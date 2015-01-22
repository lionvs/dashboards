var moduleManager = function () {
    var runModule = function () {
        return {
            UploadData: function () {
                core.registerModule(moduleUploadData);
                core.startModule(moduleUploadData, document.getElementById("uploadData"));
            },
            DataTable: function () {
                core.registerModule(moduleDataTable);
                core.startModule(moduleDataTable, document.getElementById("dataTable"));
            },


            HighChart: function () {
                core.registerModule(moduleHighChart);
                core.startModule(moduleHighChart, document.getElementById("chart"));
            },
            ChartConfig: function () {
                core.registerModule(moduleChartConfig);
                core.startModule(moduleChartConfig, document.getElementById("chartConfig"));
            },
            Filters: function () {
                core.registerModule(moduleFilters);
                core.startModule(moduleFilters, document.getElementById("filter"));
            }
        }
    }
    var runningModules = [];
    return {
        addModule: function (moduleInstance, element) {
            runningModules.push({
                module: moduleInstance,
                element: element
            });
        },
        removeModule: function (element) {
            runningModules = _.filter(runningModules, function (obj) {
                return obj.element !== element;
            });
        },
        setConfig: function (element, config) {
            var moduleWithinCurrentElement = _.find(runningModules, function (obj) {
                return obj.element === element;
            });
            moduleWithinCurrentElement.module.setConfig(config);
        },
        getConfig: function (element) {
            var moduleWithinCurrentElement = _.find(runningModules, function (obj) {
                return obj.element === element;
            });
            return moduleWithinCurrentElement.module.getConfig();
        },
        runModule: runModule()
    }
}();