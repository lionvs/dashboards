var moduleChartConfig = function () {

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
        $(element).show();
    }

    function getSelectedText(element) {

        if (element.selectedIndex == -1)
            return null;

        return element.options[element.selectedIndex].text;
    }

    function comboBoxChanged(sb, element) {
        var configChart = sb.getConfigChart();
        var select = element.getElementsByClassName('combo');
        for (var i = 0; i < select.length; i++)
            configChart[select[i].id] = getSelectedText(select[i]);
        configChart.chartType = getSelectedText(element.querySelector("#chartType"));
        var event = {
            type: events.updatedChartConfig,
            data: configChart
        }
        sb.notify(event);
    }

    function main(sb) {
        var element = sb.getElement();
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
            comboBoxChanged(sb, element);
        });
        var combo = element.getElementsByClassName('combo');
        for (var i = 0; i < combo.length; i++)
            $(combo[i]).change(function () {
                comboBoxChanged(sb, element);
            });
        comboBoxChanged(sb, element);

        if (dataSource.data.length < 1)
            $(element).hide();
        else
            $(element).show();
    }

    return {
        name: "chartConfig",
        init: function (sb) {
            sb.listen(events.updatedDataSource, function () {
                main(sb);
            });
            main(sb);
        }
    }
}();

