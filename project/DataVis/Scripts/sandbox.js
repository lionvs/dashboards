var sandBox = {
    create: function (element,eventManager) {
        var libraries = {
            JQuery: $,
            angular: angular
        }
        return {
            getContainer: function () {
                return element;
            },

            notify: function (event) {
                eventManager.triggerEvent(event);
            },
            listen: function (eventType, func) {
                eventManager.registerEvent(eventType, func, element);
            },
            stopListen: function (eventType) {
                eventManager.unRegisterEvent(eventType, element);
            },
            getDatasource: function () {
                return core.getDatasource();
            },
            getOriginalDatasource: function () {
                return core.getOriginalDatasource();
            },
            getGlobalConfig: function () {
                return core.getGlobalConfig();
            },
            require: function (library) {
                return libraries[library];
            }
        }
    }
};