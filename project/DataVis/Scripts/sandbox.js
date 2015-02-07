var sandBox = {
    create: function (element) {
        var libraries = {
            JQuery: $,
            angular: angular
        }
        return {
            getContainer: function () {
                return element;
            },

            notify: function (event) {
                core.triggerEvent(event);
            },
            listen: function (eventType, func) {
                core.registerEvent(eventType, func, element);
            },
            stopListen: function (eventType) {
                core.unRegisterEvent(eventType, element);
            },
            getDatasource: function () {
                return core.getDatasource();
            },
            getOriginalDatasource: function () {
                return core.getOriginalDatasource();
            },
            require: function (library) {
                return libraries[library];
            }
        }
    }
};