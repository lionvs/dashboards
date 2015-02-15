var moduleFilterLogic = function () {

    function readValidValuesForSelector(config) {
        var validValues = _.filter(config.validationListOfValues, function (num) {
            return num.isValid;
        });
        config.validValues = _.map(validValues, function (num) {
            return num.value;
        });
    }

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
            if (config.indexOfMax === -1) {
                config.indexOfMax = Infinity;
                config.max = Infinity;
            }
            if (config.indexOfMin === -1) {
                config.min = -Infinity;
            }
            var filteredData = _.filter(inputData, function (num) {
                return isValidWhenString(num, config);
            });
        }
        return filteredData;
    }

    function filterBySelector(inputData, config) {
        readValidValuesForSelector(config);
        var filteredData = _.filter(inputData, function (num) {
            return isValid(num, config);
        });
        return filteredData;
    }

    function filter(inputData, config, sb) {
        var filteredData;
        if (config.type === "rangeFilter")
            filteredData = filterByRange(inputData, config);
        if (config.type === "selectorFilter")
            filteredData = filterBySelector(inputData, config);
        return filteredData;
    }

    return {
        name: "filterLogic",
        init: function (sb) {
            sb.listen(events.updatedFilterConfig, function () {
                var globalConfig = core.getGlobalConfig();
                var filterConfigs = _.filter(globalConfig, function (num) {
                    return (num.name === "selectorFilter" || num.name === "rangeFilter") && num.config.key !== null;
                });
                var inputData = sb.getOriginalDatasource().data;
                var inputSchema = sb.getOriginalDatasource().schema;
                var filteredDataSource = {
                    data: [],
                    schema: []
                }
                filteredDataSource.data = inputData;
                filteredDataSource.schema = inputSchema;
                _.each(filterConfigs, function (num) {
                    filteredDataSource.data = filter(filteredDataSource.data, num.config, sb);
                });
                var event = {
                    type: events.updatedDataSource,
                    data: filteredDataSource
                }
                sb.notify(event);
            });
        }
    }
}();