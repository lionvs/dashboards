var widgetProgressBarFiltered = function () {

    var schemaItemForEverything = "Everything";

    function getDefaultConfig() {
        return {
            width: '250px',
            height: '200px',
            key: schemaItemForEverything,
            listProgressBars: []
        }
    }

    function countPercentWithKey(key, listOfValuesCurrent, listOfValuesOriginal) {
        var numberCurrent = (_.filter(listOfValuesCurrent,function (item) { return item === key; })).length;
        var numberOriginal = (_.filter(listOfValuesOriginal, function (item) { return item === key; })).length;
        return countPercent(numberCurrent, numberOriginal);
    }

    function numberToFixed(i, digits) {
        var pow = Math.pow(10, digits);

        return Math.floor(i * pow) / pow;
    }

    function countPercent(numberCurrent, numberOriginal) {
        var result = 100 - ((numberCurrent * 100) / numberOriginal);
        return numberToFixed(result, 2);
    }

    function createListProgressBars(sandbox, config) {
        var originalData = sandbox.getOriginalDatasource().data;
        var currentData = sandbox.getDatasource().data;

        var listOfValuesOriginal = _.map(originalData, function (item) {
            return item[config.key];
        });

        var listOfValuesCurrent = _.map(currentData, function (item) {
            return item[config.key];
        });

        var uniqueListOfValues = _.uniq(listOfValuesOriginal);

        if (config.key === schemaItemForEverything) {
            var percent = countPercent(listOfValuesCurrent.length, listOfValuesOriginal.length);
            config.listProgressBars = [{ name: schemaItemForEverything, percent: percent, style: { 'width': percent + '%' } }];
            return;
        }

        config.listProgressBars = _.map(uniqueListOfValues, function (item) {
            var percent = countPercentWithKey(item,listOfValuesCurrent,listOfValuesOriginal);
            return { name: item, percent: percent, style: { 'width': percent +'%' } };
        });
    }

    function fillHtmlTemplate(sandbox, data, schema,config) {
        var angular = sandbox.require('angular');
        var $scope = angular.element(sandbox.getContainer()).scope();
        _.defer(function () {
            $scope.schemaOptions = [schemaItemForEverything].concat(sandbox.getOriginalDatasource().schema);
            $scope.config = config;
            $scope.createListProgressBars = function () {
                createListProgressBars(sandbox, config);
            };
            $scope.$digest();
        });
    }

    function setResizable(element, config, $) {
        if (config)
            $(element.children[0]).width(config.width).height(config.height);
        $(element.children[0]).resizable({
            resize: function (e, ui) {
                config.width = ui.size.width;
                config.height = ui.size.height;
            }
        });
    }

    function createProgressBars(sandbox, config) {
        var element = sandbox.getContainer();
        var dataSource = sandbox.getDatasource();
        var $ = sandbox.require('JQuery');

        createListProgressBars(sandbox, config);
        fillHtmlTemplate(sandbox, dataSource.data, dataSource.schema,config);
        setResizable(element, config, $);
    }

    return {
        name: "progressBarFiltered",
        init: function(sandbox) {
            var config = getDefaultConfig(sandbox);

            createProgressBars(sandbox, config);
            sandbox.listen(events.updatedDataSource, function () {
                createProgressBars(sandbox, config);
            });

            return {
                setConfig: function(newConfig) {
                    config = newConfig;
                    createProgressBars(sandbox, config);
                },
                getConfig: function() {
                    return config;
                }
            }
        },
        displayedName: "Data status",
        imgUrl: "progressBar",
        title: "This progress bar shows how many percent of specific data has been filtered"
}
}();

