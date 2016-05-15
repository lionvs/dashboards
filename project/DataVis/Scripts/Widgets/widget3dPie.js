var widget3dPie = function () {

    var plotOptions = [
    { type: "line", draw: defaultChart2 },
    { type: "scatter", draw: defaultChart2 },
    { type: "column", draw: defaultChart2 },
    { type: "spline", draw: defaultChart2 },
    { type: "area", draw: defaultChart2 },
    { type: "areaspline", draw: defaultChart2 },
    { type: "bar", draw: defaultChart2 }
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
            return { name: currentSeriesName, data: num[1] };
        });
        return series;
    }

    function setResizable(element, config, $, fn) {
        $(element.children[0]).width(config.width).height(config.height);
        $(element.children[1]).width(config.width);
        var chartElement = $(element).find(highChartArea);
        $(element.children[0]).resizable({
            resize: function (e, ui) {
                config.width = ui.size.width;
                config.height = ui.size.height;
                config.chartHeight = ui.size.height - 70;
                $(element.children[1]).width(config.width);
                $(chartElement).highcharts().setSize(
                    element.children[0].offsetWidth - 35,
                    element.children[0].offsetHeight - 70,
                    false
                );
                fn();
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
        $scope.themeOptions = _.map(themeOptions, function (option) { return option.name });
        $scope.schemaOptions = schema;
        $scope.chartTypeOptions = _.map(plotOptions, function (option) { return option.type });
        $scope.config = config;
        $scope.zoomOptions = zoomOptions;

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

        setResizable(element, config, $, function () { drawChart(chartElement, dataSource, config); });
        fillHtmlTemplate(sandbox, dataSource, config);
        drawChart(chartElement, dataSource, config);
    }

    return {
        name: "3dPie",
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
        displayedName: "3d Pie",
        imgUrl: "Chart",
        title: "This is 3d Pie"
    }

    function defaultChart2(element, datasource, configChart) {
        var xAxis = getUniqueValues(datasource.data, configChart.xAxis);
        var seriesNames = getUniqueValues(datasource.data, configChart.seriesName);
        var series = getSeries(datasource.data, seriesNames, xAxis, configChart);
        var intField = configChart.seriesName;
        var data = xAxis.map(function (xAxisValue) {
            var xAxisData = datasource.data.filter(function (d) { return d[configChart.xAxis] == xAxisValue });
            var avg = xAxisData.map(function (d) { return d[intField] }).reduce(function (prev, curr) { return prev + curr }, 0);
            return [xAxisValue, Math.round(avg / xAxisData.length)];
        });

        $(element).highcharts({
            chart: {
                height: configChart.chartHeight,
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: configChart.title
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                }
            },
            series: [{
                name: intField,
                data: data
            }]
        });
    }
}();

