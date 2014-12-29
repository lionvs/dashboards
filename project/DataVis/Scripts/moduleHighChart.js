var moduleHighChart = function () {


    function getUniqueValues(data, property) {
        var uniqueValues = [];
        for (var i = 0; i < data.length; i++)
            if ((data[i][property]) && uniqueValues.indexOf(data[i][property]) < 0)
                uniqueValues.push(data[i][property]);
        return uniqueValues;
    }

    function getSeries(data, seriesNames, xAxis, configChart) {
        var series = [];
        var key1 = configChart.xAxis;
        var key2 = configChart.seriesName;
        var key3 = configChart.seriesData;
        for (var i = 0; i < seriesNames.length; i++) {
            var obj = {};
            obj.name = seriesNames[i];
            obj.data = [];
            for (var k = 0; k < xAxis.length; k++) {
                for (var j = 0; j < data.length; j++) {
                    if (data[j][key2] === obj.name && data[j][key1] === xAxis[k]) {
                        var val = data[j][key3];
                        if (isNumber(val))
                            obj.data.push(val);
                        else
                            obj.data.push(null);
                        j = data.length;
                    }
                    if (j == data.length - 1)
                        obj.data.push(null);
                }
            }
            series.push(obj);
        }
        return series;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function drawChart(element, datasource, configChart) {
        var xAxis = getUniqueValues(datasource.data, configChart.xAxis);
        var seriesNames = getUniqueValues(datasource.data, configChart.seriesName);
        var series = getSeries(datasource.data, seriesNames, xAxis, configChart);

        $(element).highcharts({
            chart: {
                type: configChart.chartType
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

    function main(sb) {
        var e = sb.getElement();
        var d = sb.getDatasource();
        if (d.data.length < 1)
            $(e).hide();
        else
            $(e).show();

        var config = sb.getConfigChart();

        drawChart(e, d, config);
    }

    return {
        name: "highChart",
        init: function (sb) {
            sb.listen(events.updatedDataSource, function () {
                main(sb);
            });
            sb.listen(events.updatedChartConfig, function () {
                main(sb);
            });
            main(sb);
        }
    }
}();

