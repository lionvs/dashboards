var widgetHighChart = function () {

    chartTypeOptions = [
    "line",
    "scatter",
    "column",
    "spline",
    "area",
    "areaspline",
    "bar"
    ];

    zoomOptions = [
            "",
            "x",
            "y",
            "x and y"
    ];

    function getDefaultConfig(data) {
        var schema = data.schema;
        return {
            title: "Title",
            xAxis: schema[0],
            seriesName: schema[1],
            seriesData: schema[2],
            chartType: chartTypeOptions[3],
            zoomType: zoomOptions[0],
            panning: true,
            panKey: 'shift',
            inverted: false,
            tooltip:
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
                crosshairs: [true, true]
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            width: '250px',
            height: '400px'
        }
    }

    function setResizable(element, config, $) {
        $(element).width(config.width).height(config.height);
        var chartElement = $(element).children("#chartModule").children("#chartArea");
        $(element).resizable({
            resize: function (e, ui) {
                config.width = ui.size.width;
                config.height = ui.size.height;
                $(chartElement).highcharts().setSize(
                    element.offsetWidth,
                    element.offsetHeight -30,
                    false
                );
            }
        });
    }

    function fillHtmlTemplate(sb, data, config) {
        var schema = data.schema;
        var angular = sb.require('angular');
        var $scope = angular.element(sb.getContainer()).scope();
        var element = angular.element(sb.getContainer());
        var chartElement;
        $scope.isCollapsed = false;
        $scope.schemaOptions = schema;
        $scope.chartTypeOptions = chartTypeOptions;
        $scope.config = config;
        $scope.zoomOptions = zoomOptions;

        $scope.chartConfigUpdate = function () {
            chartElement = $(element).children("#chartModule").children("#chartArea");
            $(chartElement).highcharts().setTitle({ text: config.title });
        };
        $scope.dataConfigUpdate = function () {
            chartElement = $(element).children("#chartModule").children("#chartArea");
            drawChart(chartElement, data, config);
        };

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
        var groupedData = _.groupBy(data, function (row) { return row[keys.seriesName]; });
        var groupedSeriesData = _.map(groupedData, function (num) { return num; });
        var seriesData = _.map(groupedSeriesData, function (element) {
            return _.map(xAxis, function (abscissa) {
                var point = _.map(_.filter(element, function (num) {
                    return num[keys.xAxis] === abscissa;
                }), function (row) {
                    return row[keys.seriesData]
                })[0];
                if (_.isUndefined(point)) return null;
                return point;
            });
        });
        var seriesObject = _.zip(seriesNames, seriesData);
        var series = _.map(seriesObject, function (num) {
            var currentSeriesName;
            if (_.isNumber(name)) { currentSeriesName = name.toString(); } else { currentSeriesName = num[0]; }
            return { name: currentSeriesName, data: num[1] };
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
                height: 400,
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

    function createWidget(sb, config) {
        var element = sb.getContainer();
        var dataSource = sb.getDatasource();

        if (dataSource.data.length < 1)
            $(element).hide();
        else
            $(element).show();
        setResizable(element, config, $);
        fillHtmlTemplate(sb, dataSource, config);
        var chartElement = $(element).children("#chartModule").children("#chartArea");
        drawChart(chartElement, dataSource, config);

        
    }

    return {
        name: "highChart",
        init: function (sb) {
            var config = getDefaultConfig(sb.getDatasource());
            sb.listen(events.uploadedDataSource, function () {
                config = getDefaultConfig(sb.getDatasource());
                createWidget(sb, config);
            });
            sb.listen(events.updatedDataSource, function () {
                createWidget(sb, config);
            });
            createWidget(sb, config);

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    createWidget(sb, config);
                },
                getConfig: function () {
                    return config;
                }
            }
        },
        imgUrl: "Chart",
        title: "chart"
    }
}();

