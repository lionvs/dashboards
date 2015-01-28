var moduleManager = function () {
    var runningModules = [];
    return {
        addModule: function (moduleInstance, element, name, position) {
           
            $(element).draggable();
            $(element).offset(position);
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
        getElements: function() {
            return _.map(runningModules, function(module) {
                return module.element;
            });
        },
        getGlobalConfig: function() {
            var globalConfig = _.map(runningModules, function (module) {
                var offset = $(module.element).offset();
                return {
                    config: this.getConfig(module.element),
                    name: module.moduleName,
                    position: {
                        left: offset.left,
                        top: offset.top
                    }
                }
            }, this);
            return globalConfig;
        }
    }
}();