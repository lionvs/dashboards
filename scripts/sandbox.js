var sandBox = {
    create: function (element) {

        return {
            getElement: function() {
                return element;
            },
            notify: function (event) {
                core.triggerEvent(event);
            },
            listen: function (eventType, func) {
                core.registerEvent(eventType, func,element);
            },
            stopListen: function(eventType) {
                core.unRegisterEvent(eventType, element);
            }

        }
    }
};