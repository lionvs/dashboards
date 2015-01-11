var moduleChartConfig = function () {

    function getDefaultConfig() {
        return {
            title: "Chart",
            xAxis: "",
            seriesName: "",
            seriesData: "",
            chartType: "",
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

    function createCombo(element, dataSource) {
        var schema = dataSource.schema;
        var select = element.getElementsByClassName('combo');
        for (var j = 0; j < select.length; j++) {
            for (var i = 0; i < schema.length; i++) {
                var opt = document.createElement('option');
                opt.value = schema[i];
                opt.innerHTML = schema[i];
                select[j].appendChild(opt);
                if (i == j) {
                    $(select[i]).val(opt.value);
                }
            }
        }
    }

    function getSelectedText(element) {

        if (element.selectedIndex == -1)
            return null;

        return element.options[element.selectedIndex].text;
    }

    function comboBoxChanged(sb, element, config) {
        var select = element.getElementsByClassName('combo');
        for (var i = 0; i < select.length; i++)
            config[select[i].id] = getSelectedText(select[i]);
        config.chartType = getSelectedText(element.querySelector("#chartType"));
        var event = {
            type: events.updatedChartConfig,
            data: config
        }
        sb.notify(event);
    }

    function main(sb, config) {
        var element = sb.getContainer();
        element.innerHTML = 'Select xAxis <select id="xAxis" class="combo"></select><br /> \
    Select titles of data  <select id="seriesName" class="combo"></select><br />                   \
    Select yAxis (data)  <select id="seriesData" class="combo"></select><br />                      \
    Select chart type  <select id="chartType">                                                 \
                           <option>line</option>                                    \
                           <option>column</option>                                \
                           <option>area</option>                                    \
                           <option>areaspline</option>                                    \
                           <option>spline</option>                                    \
                       </select> ';


        var dataSource = sb.getDatasource();

        createCombo(element, dataSource);

        $(element.querySelector("#chartType")).change(function () {
            comboBoxChanged(sb, element, config);
        });
        var combo = element.getElementsByClassName('combo');
        for (var i = 0; i < combo.length; i++)
            $(combo[i]).change(function () {
                comboBoxChanged(sb, element, config);
            });
        comboBoxChanged(sb, element, config);

        if (dataSource.data.length < 1)
            $(element).hide();
        else
            $(element).show();
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

