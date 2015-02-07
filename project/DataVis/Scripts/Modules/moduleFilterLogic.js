var moduleFilterLogic = function () {

    function isValid(num, config) {
        return _.contains(config.validValues, num[config.key]);
    }

    function isValidWhenNumber(num, config) {
        return Number(num[config.key]) >= Number(config.min)
            && Number(num[config.key]) <= Number(config.max);
    }

    function isValidWhenString(num, config) {
        return _.indexOf(config.listOfValues, num[config.key]) >= config.indexOfMin
            && _.indexOf(config.listOfValues, num[config.key]) <= config.indexOfMax;
    }


    function filterByRange(inputData, config) {
        config.min = config.min === "" || config.min === null ? -Infinity : config.min;
        config.max = config.max === "" || config.max === null ? Infinity : config.max;
        if (Number(config.listOfValues[0]) == config.listOfValues[0]) {
            var filteredData = _.filter(inputData, function (num) {
                return isValidWhenNumber(num, config);
            });
        }
        else {
            config.indexOfMin = _.indexOf(config.listOfValues, config.min);
            config.indexOfMax = _.indexOf(config.listOfValues, config.max);
            config.indexOfMax = config.indexOfMax === -1 ? Infinity : config.indexOfMax;
            var filteredData = _.filter(inputData, function (num) {
                return isValidWhenString(num, config);
            });
        }
        return filteredData;
    }

    function filterBySelector(inputData, config) {
        var filteredData = _.filter(inputData, function (num) {
            return isValid(num, config);
        });
        return filteredData;
    }

    function filter(inputData, config, sb) {
        var filteredDataSource = {};
        if (config.type === "rangeFilter")
            filteredDataSource.data = filterByRange(inputData, config);
        if (config.type === "selectorFilter")
            filteredDataSource.data = filterBySelector(inputData, config);
        filteredDataSource.schema = sb.getOriginalDatasource().schema;
        return filteredDataSource;
    }

    return {
        name: "filterLogic",
        init: function (sb) {
            sb.listen(events.updatedFilterConfig, function (newConfig) {
                var inputData = sb.getOriginalDatasource().data;
                var filteredDataSource = filter(inputData, newConfig, sb);
                var event = {
                    type: events.updatedDataSource,
                    data: filteredDataSource
                }
                sb.notify(event);
            });
        }
    }
}();