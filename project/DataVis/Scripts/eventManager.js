var eventManager = function () {
    var registeredEvents = {};

    return {
        registerEvent: function (eventType, eventFunc, element) {
            if (!registeredEvents[eventType])
                registeredEvents[eventType] = [];
            registeredEvents[eventType].push({
                func: eventFunc,
                idElement: element
            });
        },
        unRegisterEvent: function (eventType, element) {
            registeredEvents[eventType] = _.filter(registeredEvents[eventType], function (obj) {
                if (element[0])
                    return obj.idElement !== element[0];
                return obj.idElement !== element;
            });
        },
        triggerEvent: function (event) {
            for (var listener in registeredEvents[event.type])
                registeredEvents[event.type][listener].func(event.data);
        },
        unRegisterAllEvents: function (element) {
            for (var eventType in registeredEvents)
                this.unRegisterEvent(eventType, element);
        }

    }

}();