var core = function () {
    var registeredModules = {};
    var registeredEvents = {};
    var dataSource = {
        data: [],
        schema: []
    }
    var configChart = {
        title: "Chart",
        xAxis: "",
        seriesName: "",
        seriesData: "",
        chartType: "",
        tooltip :
            {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3,
                shared: true,
                useHTML: true,
                crosshairs: [true,true]
            },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        }

    };

    return {
        registerModule: function(module) {
            registeredModules[module.name] = module;
        },

        startModule: function(module, element) {
            var sb = sandBox.create(element);
            registeredModules[module.name].init(sb);
        },

        stopModule: function (module, element) {
            registeredModules[module.name].destroy(element);
            for (var eventType in registeredEvents)
                this.unRegisterEvent(eventType, element);
        },

        registerEvent: function (eventType, eventFunc, element) {
            if (!registeredEvents[eventType])
                registeredEvents[eventType] = [];
            registeredEvents[eventType].push({
                func: eventFunc,
                idElement: element
            });
        },

        unRegisterEvent: function(eventType, element) {
            registeredEvents[eventType] = registeredEvents[eventType].filter(function(obj) {
                return obj.idElement != element;
            });
        },

        triggerEvent: function (event) {
            if (event.type === events.updatedDataSource) 
                dataSource = event.data;
            else if(event.type === events.updatedChartConfig) 
                configChart = event.data;
            for (var listener in registeredEvents[event.type])
                registeredEvents[event.type][listener].func(event.data);
        },

        getDatasource: function() {
            return dataSource;
        },

        getConfigChart: function() {
            return configChart;
        }
        

    }
}();




