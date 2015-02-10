var core = function (sandbox, eventManager, widgetManager,toolBox) {
    var registeredModules = {};
    var originalDataSource = {
        data: [],
        schema: []
    }
    var dataSource = {
        data: [],
        schema: []
    }

    eventManager.registerEvent(events.uploadedDataSource, function (data) {
        originalDataSource = data;
    }, document);

    eventManager.registerEvent(events.updatedDataSource, function (data) {
        dataSource = data;
    }, document);

    return {
        registerWidget: function (widget) {
            registeredModules[widget.name] = widget;
            toolBox.addWidget(widget.imgUrl, widget.name,widget.title);
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
            _.each(widgetManager.getElements(), this.stopWidget);
        },
        registerEvent: function (eventType, eventFunc, element) {
            eventManager.registerEvent(eventType, eventFunc, element);
        },

        unRegisterEvent: function (eventType, element) {
            eventManager.unRegisterEvent(eventType, element);
        },

        triggerEvent: function (event) {
            eventManager.triggerEvent(event);
        },

        getDatasource: function () {
            return dataSource;
        },
        getOriginalDatasource: function () {
            return originalDataSource;
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
        setGlobalConfig: function (globalConfig, container,newDataSource) {
            this.stopAllWidgets();
            dataSource = newDataSource;
            container.innerHTML = "";
            _.each(globalConfig, function(config) {
                var element = angularHelper.createElement(container, config.name);
                this.startWidget(config.name, element,config.position);
                this.setConfig(element, config.config);
            }, this);
        },
    }
}




