var core = function (sandbox, eventManager, widgetManager) {
    var registeredWidgets = {};
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
            registeredWidgets[widget.name] = widget;
            eventManager.triggerEvent({
                type: events.registerWidgetRequest,
                data: {
                    imgUrl: widget.imgUrl,
                    displayedName : widget.displayedName,
                    name: widget.name,
                    title: widget.title
                }
            });
        },

        startWidget: function (widgetName, element, position) {
            if (!registeredWidgets[widgetName])
                return;
            var sandbox = sandBox.create(element, eventManager);
            var moduleInstance = registeredWidgets[widgetName].init(sandbox);
            widgetManager.addModule(moduleInstance, element, widgetName, position);

        },

        startModule:function(module,element) {
            var sandbox = sandBox.create(element, eventManager);
            module.init(sandbox);
        },

        stopWidget: function (element) {
            widgetManager.removeModule(element);
            eventManager.unRegisterAllEvents(element);
            $(element).remove();
        },

        stopAllWidgets:function() {
            _.each(widgetManager.getElements(), this.stopWidget);
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
            dataSource = newDataSource.Copy;
            originalDataSource = newDataSource.Original;
            container.innerHTML = "";
            _.each(globalConfig, function(config) {
                var element = angularHelper.createElement(container, config.name);
                var $timeout = angularHelper.getTimeout(element);
                var that = this;
                $timeout(function () {
                    that.startWidget(config.name, element, config.position);
                    that.setConfig(element, config.config);
                });
            }, this);
        }
    }
}




