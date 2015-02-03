var widgetHighChart = function () {

    function getDefaultConfig() {
        return null;
    }

    function getUniqueValues(data, propertyName) {
        return _.chain(data)
         .map(function (num) { return num[propertyName]; })
         .uniq()
         .value();
    }

    function getSeries(data, seriesNames, xAxis, configChart) {
        var keys = {
            xAxis: configChart.xAxis,
            seriesName: configChart.seriesName,
            seriesData: configChart.seriesData
        };
        var series = [];

        _.each(seriesNames, function (name) {
            var currentSeriesName;
            var seriesPoints = [];
            _.each(xAxis, function (abscissa) {
                var row = _.filter(data, function (d) {
                    return ((d[keys.seriesName] === name) && (d[keys.xAxis] === abscissa));
                });
                var ordinate = _.map(row, function (r) {
                    return _.property(keys.seriesData)(r);
                });
                if (ordinate.length === 0) { seriesPoints.push(null); } else { seriesPoints.push(ordinate[0]); }
            });
            if (_.isNumber(name)) { currentSeriesName = name.toString(); } else { currentSeriesName = name; }
            var seriesObject = {
                name: currentSeriesName,
                data: seriesPoints
            };
            series.push(seriesObject);
        });
        return series;
    }

    function drawChart(element, datasource, configChart) {
        if (!configChart)
            return;
        var xAxis = getUniqueValues(datasource.data, configChart.xAxis);
        var seriesNames = getUniqueValues(datasource.data, configChart.seriesName);
        var series = getSeries(datasource.data, seriesNames, xAxis, configChart);

        $(element).highcharts({
            chart: {
                type: configChart.chartType,
                zoomType: configChart.zoomType,
                panning: configChart.panning,
                panKey: configChart.panKey,
                inverted: configChart.inverted
            },
            title: {
                text: configChart.title
            },
            xAxis: {
                categories: xAxis
            },
            yAxis: {
                title: {
                    text: configChart.seriesData
                }
            },
            tooltip: configChart.tooltip,
            plotOptions: configChart.plotOptions,
            series: series

        });
    }

    function main(sb, config) {
        var element = sb.getContainer();
        var dataSource = sb.getDatasource();

        if (dataSource.data.length < 1)
            $(element).hide();
        else
            $(element).show();

        drawChart(element, dataSource, config);
    }

    return {
        name: "highChart",
        init: function (sb) {
            var config = getDefaultConfig();
            sb.listen(events.updatedDataSource, function () {
                main(sb, config);
            });
            sb.listen(events.updatedChartConfig, function (newConfig) {
                config = newConfig;
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
        },

        imgUrl: "Chart"
    }
}();

