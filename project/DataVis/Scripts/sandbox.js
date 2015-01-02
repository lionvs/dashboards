var sandBox = {
    create: function (element) {
        
        return {
            getContainer: function() {
                return element;
            },

            notify: function(event) {
                core.triggerEvent(event);
            },
            listen: function (eventType, func) {
                core.registerEvent(eventType, func, element);
            },
            stopListen: function(eventType) {
                core.unRegisterEvent(eventType, element);
            },
            getDatasource: function() {
                return core.getDatasource();
            },
            getConfigChart: function () {
                return core.getConfigChart();
            }

        }
    }
};