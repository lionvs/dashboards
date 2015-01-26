var moduleManager = function () {
    var runningModules = [];
    return {
        addModule: function (moduleInstance, element,name) {
            runningModules.push({
                module: moduleInstance,
                element: element,
                moduleName: name
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
        getGlobalConfig: function() {
            var globalConfig = [];
            for (var i = 0; i < runningModules.length; i++) {
                globalConfig.push({
                    config: this.getConfig(runningModules[i].element),
                    name: runningModules[i].moduleName
                });
            };
            return globalConfig;
        }
       
    }
}();