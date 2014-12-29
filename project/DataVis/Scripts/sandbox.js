var sandBox = {
    create: function (element) {
        
        return {
            getElement: function() {
                return element;
            },

            notify: function(event) {
                core.triggerEvent(event);
            },
            listen: function (eventType,eventFunc) {
               core.registerEvent(eventType,eventFunc);
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