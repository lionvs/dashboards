var core = function (sandbox, eventManager, widgetManager,toolBox) {
    var registeredModules = {};
    var dataSource = {
        data: [],
        schema: []
    }

    

    return {
        registerWidget: function (widget) {
            registeredModules[widget.name] = widget;
            toolBox.addWidget(widget.imgUrl, widget.name);
        },

        startWidget: function (widgetName, element, position) {
            if (!registeredModules[widgetName])
                return;
            var sb = sandBox.create(element);
            var moduleInstance = registeredModules[widgetName].init(sb);
            widgetManager.addModule(moduleInstance, element, widgetName,position);
        },

        startModule:function(module,element) {
            var sb = sandBox.create(element);
            module.init(sb);
        },

        stopWidget: function (element) {
            widgetManager.removeModule(element);
            eventManager.unRegisterAllEvents(element);
            $(element).remove();
        },

        stopAllWidgets:function() {
            _.each(widgetManager.getElements(), function(element) {
                this.stopWidget(element);
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
            widgetManager.setConfig(element, config);
        },
        getConfig: function (element) {
            return widgetManager.getConfig(element);
        },
        getGlobalConfig: function() {
            return widgetManager.getGlobalConfig();
        },
        createAngularElement: function (container, classTitle) {
            var element = angular.element(container);
            element.append("<div class='" + classTitle + "'></div>");
            var $injector = element.injector();
            var addedDiv = angular.element(container.lastChild);
            var $scope = addedDiv.scope();
            var $compile = $injector.get('$compile');
            $compile(addedDiv)($scope);
            $scope.$apply();
            return container.lastChild;
        },
        setGlobalConfig: function (globalConfig, container) {
            this.stopAllWidgets();
            container.innerHTML = "";
            _.each(globalConfig, function(config) {
                var element = this.createAngularElement(container, config.name);
                this.startWidget(config.name, element,config.position);
                this.setConfig(element, config.config);
            }, this);
        },
        setDataSource: function(newDataSource) {
            dataSource = newDataSource;
        }
    }
}




