var moduleChartConfig = function () {

    function getDefaultConfig() {
        return {
            title: "Title",
            xAxis: "",
            seriesName: "",
            seriesData: "",
            chartType: "",
            zoomType: "",
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
            }

        }
    }

    function fillHtmlTemplate(sb, data, config) {
        var schema = data.schema;
        var angular = sb.require('angular');
        var $scope = angular.element(sb.getContainer()).scope();
        $scope.$apply(function () {

            $scope.oneAtATime = true;

            $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };

            chartTypeOptions = [
                "line",
                "scatter",
                "column",
                "spline",
                "area",
                "areaspline",
                "bar"
            ];

            config.chartType = chartTypeOptions[0];
            config.xAxis = schema[0];
            config.seriesName = schema[1];
            config.seriesData = schema[2];

            $scope.schemaOptions = schema;
            $scope.chartTypeOptions = chartTypeOptions;
            $scope.config = config;

            $scope.zoomOptions = [
                "",
                "x",
                "y",
                "x and y"
            ];
            $scope.zoomSelect = $scope.zoomOptions[0];


            $scope.chartConfigUpdate = function () {
                var element = sb.getContainer();
                comboBoxChanged(sb, element, config);
            };

            $scope.dataConfigUpdate = function () {
                var element = sb.getContainer();
                comboBoxChanged(sb, element, config);
            };
        });
    }



    function createUi(sb, config) {
        var element = sb.getContainer();
        var dataSource = sb.getDatasource();
        var $ = sb.require('JQuery');

        if (dataSource.data.length < 1) {
            $(element).hide();
            return;
        }

        fillHtmlTemplate(sb, dataSource, config);
        $(element).show();
    }


    function main(sb, config) {
        var element = sb.getContainer();
        var dataSource = sb.getDatasource();
        createUi(sb, config);
        comboBoxChanged(sb, element, config);
        if (dataSource.data.length < 1)
            $(element).hide();
        else
            $(element).show();
    }

    function comboBoxChanged(sb, element, config) {
        var event = {
            type: events.updatedChartConfig,
            data: config
        }
        sb.notify(event);
    }




    return {
        name: "chartConfig",
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

