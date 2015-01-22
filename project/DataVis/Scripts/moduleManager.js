var moduleManager = function () {
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
        }
    }
}();