var moduleFilters = function () {
    var valuesOfX = ['Jan', 'Feb', 'Mar', 'Dec'];//only test array
    var titlesArr = [
        { val: 'London', isValid: true },
        { val: 'Lviv', isValid: true },
        { val: 'Kyiv', isValid: true }]; //only test array for reading titles, in real i'll parse titles from dataSource
    //or get titles from sandbox, because other module already parse it


    var config = {
        title: {
            key: 'City',               //must take from UI or sandbox
            validArr: []
        },
        x: {
            key: 'Month',               //must take from UI or sandbox
            min: (-Infinity),
            max: (Infinity),
            indexOfMin: (-Infinity),
            indexOfMax: (Infinity)
        },
        y: {
            key: 'Temperature',               //must take from UI or sandbox
            min: (-Infinity),
            max: (Infinity)
        }
    }

    function readValidTitlesArr() {
        var validTitles = _.filter(titlesArr, function (num) { return num.isValid; });
        config.title.validArr = _.map(validTitles, function (num) { return num.val; });
    }

    function hasValidTitle(num) {
        return _.contains(config.title.validArr, num[config.title.key]);
    }

    function hasValidXWhenXNumber(num) {
        return num[config.x.key] >= config.x.min && num[config.x.key] <= config.x.max;
    }

    function hasValidXWhenXString(num) {
        return _.indexOf(valuesOfX, num[config.x.key]) >= config.x.indexOfMin
            && _.indexOf(valuesOfX, num[config.x.key]) <= config.x.indexOfMax;
    }

    function hasValidY(num) {
        return num[config.y.key] >= config.y.min && num[config.y.key] <= config.y.max;
    }


    function hasValidAllPropsWhenXNumber(num) {
        return hasValidTitle(num) && hasValidXWhenXNumber(num) && hasValidY(num);
    }

    function hasValidAllPropsWhenXString(num) {
        return hasValidTitle(num) && hasValidXWhenXString(num) && hasValidY(num);
    }

    function filter(inputData) {
        var updatedConfig = _.extend({
            x: {
                min: (-Infinity),
                max: (Infinity)
            },
            y: {
                min: (-Infinity),
                max: (Infinity)
            }
        },
        config);
        config = updatedConfig;
        readValidTitlesArr();
        if (parseInt(valuesOfX[0]) == valuesOfX[0]) {
            var filteredData = _.filter(inputData, function (num) { return hasValidAllPropsWhenXNumber(num); });
        }
        else {
            config.x.indexOfMin = _.indexOf(valuesOfX, num[config.x.min]);
            config.x.indexOfMax = _.indexOf(valuesOfX, num[config.x.max]);
            config.x.indexOfMax = config.x.indexOfMax === -1 ? Infinity : config.x.indexOfMax;
            var filteredData = _.filter(inputData, function (num) { return hasValidAllPropsWhenXString(num); });
        }
        return filteredData;
    }

    function getDefaultConfig() {
        return null;
    }

    function main(sb, config) {
        var inputData = sb.getDatasource();
    }

    return {
        name: "filter",
        init: function (sb) {
            var config = getDefaultConfig();
            sb.listen(events.updatedDataSource, function () {
                main(sb, config);
            });
            main(sb, config);

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    main(sb, config);
                },
                getConfig: function () {
                    return config;
                }
            }
        }
    }
}();

