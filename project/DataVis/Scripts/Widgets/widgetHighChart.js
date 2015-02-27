var widgetHighChart = function () {

    plotOptions = [
    { type: "line", draw: defaultChart },
    { type: "scatter", draw: defaultChart },
    { type: "column", draw: defaultChart },
    { type: "spline", draw: defaultChart },
    { type: "area", draw: defaultChart },
    { type: "areaspline", draw: defaultChart },
    { type: "bar", draw: defaultChart }
    ];

    themeOptions = [
        { name: "dark", draw: setDarkUnicaTheme },
    ]

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
            chartType: "spline",
            zoomType: zoomOptions[0],
            themeType: "dark",
            chartHeight: 400,
            panning: true,
            panKey: 'shift',
            inverted: false,
            rangeName: 'Lviv',
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
            height: 'auto',
        }
    }

    function setResizable(element, config, $) {
        $(element.children[0]).width(config.width).height(config.height);
        var chartElement = $(element).find("#chartArea");
        $(element.children[0]).resizable({
            resize: function (e, ui) {
                config.width = ui.size.width;
                config.height = ui.size.height;
                $(chartElement).highcharts().setSize(
                    element.children[0].offsetWidth-35,
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
        $scope.isCollapsed = false;
        $scope.schemaOptions = schema;
        $scope.chartTypeOptions = _.map(plotOptions, function (option) { return option.type });
        $scope.config = config;
        $scope.zoomOptions = zoomOptions;
        $scope.themeOptions = _.map(themeOptions, function (option) { return option.name });

        $scope.chartConfigUpdate = function () {
            chartElement = $(element).find("#chartArea");
            $(chartElement).highcharts().setTitle({ text: config.title });
        };
        $scope.dataConfigUpdate = function () {
            chartElement = $(element).find("#chartArea");
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
        var chart = _.findWhere(plotOptions, { type: configChart.chartType });
        var theme = _.findWhere(themeOptions, { name: configChart.themeType });
        theme.draw();
        chart.draw(element, datasource, configChart);
    }

    function createWidget(sandbox, config) {
        var element = sandbox.getContainer();
        var dataSource = sandbox.getDatasource();

        if (dataSource.data.length < 1)
            $(element).hide();
        else
            $(element).show();
        setResizable(element, config, $);
        fillHtmlTemplate(sandbox, dataSource, config);



        var angular = sandbox.require('angular');
        var myElement = angular.element(sandbox.getContainer());
        var $injector = myElement.injector();
        var $timeout = $injector.get('$timeout');
        $timeout(function () {
            var chartElement = $(element).find("#chartArea");
            drawChart(chartElement, dataSource, config);
        }, 1);
    }

    return {
        name: "highChart",
        init: function (sandbox) {
            var config = getDefaultConfig(sandbox.getDatasource());
            sandbox.listen(events.uploadedDataSource, function () {
                config = getDefaultConfig(sandbox.getDatasource());
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
        displayedName: "Chart",
        imgUrl: "Chart",
        title: "This is chart"
    }

    function defaultChart(element, datasource, configChart) {
        var xAxis = getUniqueValues(datasource.data, configChart.xAxis);
        var seriesNames = getUniqueValues(datasource.data, configChart.seriesName);
        var series = getSeries(datasource.data, seriesNames, xAxis, configChart);
        $(element).highcharts({
            chart: {
                height: configChart.chartHeight,
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
    function pieChart(element, datasource, configChart) {
        var xAxis = getUniqueValues(datasource.data, configChart.xAxis);
        var series = getPieSeries(datasource.data, xAxis, configChart);
        $(element).highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: configChart.title
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: configChart.chartType,
                name: 'Lviv',
                data: [
                    ['Firefox', 45.0],
                    ['IE', 26.8],
                    ['Chrome', 12.8],
                    ['Safari', 8.5],
                    ['Opera', 6.2],
                    ['Others', 0.7]
                ]
            }]
        });
    }

    getPieSeries(dataSource, xAxis, config)
    {
        var keys = {
            xAxis: config.xAxis,
            seriesName: config.seriesName,
            rangeName: config.rangeName,
            seriesData: config.seriesData
        };
        var groupedData = _.groupBy(data, function (row) { return row[keys.seriesName]; });
    }


    function setDarkUnicaTheme() {
        // Load the fonts
        Highcharts.createElement('link', {
            href: '//fonts.googleapis.com/css?family=Unica+One',
            rel: 'stylesheet',
            type: 'text/css'
        }, null, document.getElementsByTagName('head')[0]);

        Highcharts.theme = {
            colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
               "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                       [0, '#2a2a2b'],
                       [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: "'Unica One', sans-serif"
                },
                plotBorderColor: '#606063'
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                }
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                title: {
                    style: {
                        color: '#A0A0A3'

                    }
                }
            },
            yAxis: {
                gridLineColor: '#707073',
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        color: '#B0B0B3'
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            legend: {
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },

            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },

            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },

            // scroll charts
            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#CCC'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },

            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },

            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            },

            // special colors for some of the
            legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
            background2: '#505053',
            dataLabelsColor: '#B0B0B3',
            textColor: '#C0C0C0',
            contrastTextColor: '#F0F0F3',
            maskColor: 'rgba(255,255,255,0.3)'
        };

        // Apply the theme
        Highcharts.setOptions(Highcharts.theme);
    }
}();

