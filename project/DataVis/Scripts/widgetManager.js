var widgetManager = function () {
    var runningModules = [];
    var draggableHeader = 'panel-heading';
    var limitTop = 30;
    var limitLeft = 0;

    function setDraggable(element) {
        if (!element.getElementsByClassName(draggableHeader)[0]) {
            $(element).draggable();
            return;
        }
        $(element).draggable({
            handle: "." + draggableHeader,
            stop: function(event, ui) {
                if (ui.offset.top < limitTop) {
                    $(this).offset({ top: limitTop + 10 });
                }
                if (ui.offset.left < limitLeft) {
                    $(this).offset({ left: limitLeft });
                }
            }
        });
    }

    function setPosition(element, position) {
        $(element).offset(position);
    }

    return {
        addModule: function (moduleInstance, element, name, position) {

            setDraggable(element);
            setPosition(element, position);
            
            runningModules.push({
                module: moduleInstance,
                element: element,
                moduleName: name
            });
        },
        removeModule: function (element) {
            runningModules = _.filter(runningModules, function (obj) {
                if(element[0])
                    return obj.element !== element[0];
                return obj.element !== element;
            });
        },
        setConfig: function (element, config) {
            var moduleWithinCurrentElement = _.find(runningModules, function (obj) {
                return obj.element === element;
            });
            if (!moduleWithinCurrentElement)
                return;
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