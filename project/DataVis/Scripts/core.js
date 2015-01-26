﻿var core = function (sandbox, eventManager, moduleManager) {
    var registeredModules = {};
    var dataSource = {
        data: [],
        schema: []
    }


    return {
        registerModule: function (module) {
            registeredModules[module.name] = module;
        },

        startModule: function (module, element) {
            var sb = sandBox.create(element);
            var moduleInstance = registeredModules[module.name].init(sb);
            moduleManager.addModule(moduleInstance, element,module.name);
        },

        stopModule: function (module, element) {
            registeredModules[module.name].destroy(element);
            moduleManager.removeModule(element);
            eventManager.unRegisterAllEvents(element);
        },

        registerEvent: function (eventType, eventFunc, element) {
            eventManager.registerEvent(eventType, eventFunc, element);
        },

        unRegisterEvent: function (eventType, element) {
            eventManager.unRegisterEvent(eventType, element);
        },

        triggerEvent: function (event) {
            if (event.type === events.updatedDataSource)
                dataSource = event.data;
            eventManager.triggerEvent(event);
        },

        getDatasource: function () {
            return dataSource;
        },

        setConfig: function (element, config) {
            moduleManager.setConfig(element, config);
        },
        getConfig: function (element) {
            return moduleManager.getConfig(element);
        },
        getGlobalConfig: function() {
            return moduleManager.getGlobalConfig();
        }
    }
}




