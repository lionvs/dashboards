var widget3dScatterChart = function () {

    var plotOptions = [
    { type: "line", draw: defaultChart },
    { type: "scatter", draw: defaultChart },
    { type: "column", draw: defaultChart },
    { type: "spline", draw: defaultChart },
    { type: "area", draw: defaultChart },
    { type: "areaspline", draw: defaultChart },
    { type: "bar", draw: defaultChart }
    ];

    var themeOptions = [
        { name: "dark", draw: darkUnica.runTheme },
        { name: "sand", draw: sandSignika.runTheme },
        { name: "grid", draw: gridLight.runTheme }
    ]

    var zoomOptions = [
            "",
            "x",
            "y",
            "x and y"
    ];

    var highChartArea = "#chartArea";

    function getDefaultConfig(data) {
        var schema = data.schema;
        return {
            title: "Title",
            xAxis: schema[0],
            yAxis: schema[1],
            zAxis: schema[2],
            seriesName: schema[1],
            seriesData: schema[2],
            chartType: "spline",
            zoomType: zoomOptions[0],
            themeType: "dark",
            chartHeight: 330,
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
            width: '700px',
            height: '400px',
        }
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
            return { name: currentSeriesName, colorByPoint: true, data: num[1] };
        });
        return series;
    }

    function setResizable(element, config, $) {
        $(element.children[0]).width(config.width).height(config.height);
        var chartElement = $(element).find(highChartArea);
        $(element.children[0]).resizable({
            resize: function (e, ui) {
                config.width = ui.size.width;
                config.height = ui.size.height;
                config.chartHeight = ui.size.height - 70;
                $(chartElement).highcharts().setSize(
                    element.children[0].offsetWidth - 35,
                    element.children[0].offsetHeight - 70,
                    false
                );
            }
        });
    }

    function fillHtmlTemplate(sandbox, data, config) {
        var schema = data.schema;
        var angular = sandbox.require('angular');
        var $scope = angular.element(sandbox.getContainer()).scope();
        var element = angular.element(sandbox.getContainer());
        var chartElement;
        $scope.collapse = true;
        $scope.collapseOpen = function () {
            if (!$scope.collapse)
                $scope.collapse = true;
            else
                $scope.collapse = false;
        }

        $scope.schemaOptions = schema;
        $scope.chartTypeOptions = _.map(plotOptions, function (option) { return option.type });
        $scope.config = config;
        $scope.zoomOptions = zoomOptions;
        $scope.themeOptions = _.map(themeOptions, function (option) { return option.name });

        $scope.chartConfigUpdate = function () {
            chartElement = $(element).find(highChartArea);
            $(chartElement).highcharts().setTitle({ text: config.title });
        };
        $scope.dataConfigUpdate = function () {
            chartElement = $(element).find(highChartArea);
            drawChart(chartElement, data, config);
        };
    }

    function drawChart(element, datasource, configChart) {
        if (!configChart)
            return;
        var chart = _.findWhere(plotOptions, { type: configChart.chartType });
        var theme = _.findWhere(themeOptions, { name: configChart.themeType });
        theme.draw();
        chart.draw(element, datasource, configChart);
    }

    function createWidget(sandbox, config) {
        var element = sandbox.getContainer();
        var chartElement = $(element).find(highChartArea);
        var dataSource = sandbox.getDatasource();

        setResizable(element, config, $);
        fillHtmlTemplate(sandbox, dataSource, config);
        drawChart(chartElement, dataSource, config);
    }

    return {
        name: "highChart3dScatterChart",
        init: function (sandbox) {
            var config = getDefaultConfig(sandbox.getDatasource());
            sandbox.listen(events.uploadedDataSource, function (dataSource) {
                config = getDefaultConfig(dataSource);
                createWidget(sandbox, config);
            });
            sandbox.listen(events.updatedDataSource, function () {
                createWidget(sandbox, config);
            });
            createWidget(sandbox, config);

            return {
                setConfig: function (newConfig) {
                    config = newConfig;
                    createWidget(sandbox, config);
                },
                getConfig: function () {
                    return config;
                }
            }
        },
        displayedName: "3d Chart",
        imgUrl: "Chart",
        title: "This is 3d chart"
    }

    function generateAxis(axisData, text) {
        return _.every(axisData, function (d) { return _.isNumber(d) })
            ? {
                title: { text: text },
                min: _.min(axisData),
                max: _.max(axisData)
            }
            : {
                title: { text: text },
                categories: _.uniq(axisData)
            }
    }

    function defaultChart(element, datasource, configChart) {
        var xAxis = getUniqueValues(datasource.data, configChart.xAxis);
        var seriesNames = getUniqueValues(datasource.data, configChart.seriesName);
        var series = getSeries(datasource.data, seriesNames, xAxis, configChart);

        Highcharts.getOptions().colors = $.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.4,
                    cy: 0.3,
                    r: 0.5
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.2).get('rgb')]
                ]
            };
        });
        var yAxis = generateAxis(datasource.data.map(function (d) { return d[configChart.yAxis] }), configChart.yAxis);
        var zAxis = generateAxis(datasource.data.map(function (d) { return d[configChart.zAxis] }), configChart.zAxis);
        var xAxis = { categories: xAxis, title: { text: configChart.xAxis } };

        function dataGenerator(axisData, value) {
            return axisData.categories ? axisData.categories.indexOf(value) : value;
        }

        var data = datasource.data.map(function (d) { return [dataGenerator(d[configChart.xAxis]), dataGenerator(d[configChart.yAxis]), dataGenerator(d[configChart.zAxis])] });

        $(element).highcharts({
            chart: {
                margin: 100,
                type: 'scatter',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: 30,
                    depth: 250,
                    viewDistance: 5,
                    fitToPlot: false,
                    frame: {
                        bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                        back: { size: 1, color: 'rgba(0,0,0,0.04)' },
                        side: { size: 1, color: 'rgba(0,0,0,0.06)' }
                    }
                }
            },
            title: {
                text: 'Title'
            },
            plotOptions: {
                scatter: {
                    width: 10,
                    height: 10,
                    depth: 10
                }
            },
            yAxis: yAxis,
            xAxis: xAxis,
            zAxis: zAxis,
            legend: {
                enabled: false
            },
            series: [{
                name: 'Data',
                colorByPoint: true,
                data: datasource.data.map(function (d) { return [dataGenerator(xAxis, d[configChart.xAxis]), dataGenerator(yAxis, d[configChart.yAxis]), dataGenerator(zAxis, d[configChart.zAxis])] })
            }]
        });
        var chart = $(element).highcharts();

        $(element).bind('mousedown.hc touchstart.hc', function (eStart) {
            eStart = chart.pointer.normalize(eStart);

            var posX = eStart.pageX,
                posY = eStart.pageY,
                alpha = chart.options.chart.options3d.alpha,
                beta = chart.options.chart.options3d.beta,
                newAlpha,
                newBeta,
                sensitivity = 5; // lower is more sensitive

            $(document).bind({
                'mousemove.hc touchdrag.hc': function (e) {
                    // Run beta
                    newBeta = beta + (posX - e.pageX) / sensitivity;
                    chart.options.chart.options3d.beta = newBeta;

                    // Run alpha
                    newAlpha = alpha + (e.pageY - posY) / sensitivity;
                    chart.options.chart.options3d.alpha = newAlpha;

                    chart.redraw(false);
                },
                'mouseup touchend': function () {
                    $(document).unbind('.hc');
                }
            });
        });
    }
}();

