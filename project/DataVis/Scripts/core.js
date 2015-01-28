var core = function (sandbox, eventManager, moduleManager) {
    var registeredModules = {};
    var dataSource = {
        data: [],
        schema: []
    }


    return {
        registerModule: function (module) {
            registeredModules[module.name] = module;
        },

        startModule: function (moduleName, element,position) {
            var sb = sandBox.create(element);
            var moduleInstance = registeredModules[moduleName].init(sb);
            moduleManager.addModule(moduleInstance, element, moduleName,position);
        },

        stopModule: function (element) {
            moduleManager.removeModule(element);
            eventManager.unRegisterAllEvents(element);
        },

        stopAllModules:function() {
            _.each(moduleManager.getElements(), function(element) {
                this.stopModule(element);
            }, this);
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
        },
        setGlobalConfig: function (globalConfig, container) {
            this.stopAllModules();
            container.innerHTML = "";
            var element = angular.element(container);
            _.each(globalConfig, function(config) {
                element.append("<div class='" + config.name + "'></div>");
                var $injector = element.injector();
                var divs = container.querySelectorAll('div');
                var addedDiv = angular.element(divs[divs.length - 1]);
                var $scope = addedDiv.scope();
                var $compile = $injector.get('$compile');
                $compile(addedDiv)($scope);
                $scope.$apply();
                this.startModule(config.name, container.lastChild,config.position);
                this.setConfig(container.lastChild, config.config);
            }, this);
        },
        setDataSource: function(newDataSource) {
            dataSource = newDataSource;
        }
    }
}




