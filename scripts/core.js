var core = function () {
    var registeredModules = {};
    var registeredEvents = {};
    return {
        registerModule: function (module) {
            registeredModules[module.name] = module;
        },

        startModule: function (module, element) {
            var sb = sandBox.create(element);
            registeredModules[module.name].init(sb);
        },
        stopModule: function (module, element) {
            registeredModules[module.name].destroy(element);
            for (var eventType in registeredEvents)
                this.unRegisterEvent(eventType, element);
        },

        registerEvent: function (eventType, eventFunc,element) {
            if (!registeredEvents[eventType])
                registeredEvents[eventType] = [];
            registeredEvents[eventType].push({
                func: eventFunc,
                idElement: element
            });
        },
        triggerEvent: function (event) {
            for (var listener in registeredEvents[event.type])
                registeredEvents[event.type][listener].func(event.data);
        },
        unRegisterEvent: function(eventType, element) {
            registeredEvents[eventType] = registeredEvents[eventType].filter(function(obj) {
                return obj.idElement != element;
            });
        }
    }
}();




