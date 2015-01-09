var moduleDataTable = function () {

    function getDefaultConfig() {
        return null;
    }

    function createTableHtml(dataSource) {
        var innerHtml = "<table border='1'> <tr>";
        var i;
        for (i = 0; i < dataSource.schema.length; i++)
            innerHtml += "<th>" + dataSource.schema[i] + "</th>";
        //innerHtml +='<th>Show</th>';
        innerHtml += "</tr>";

        for (var j = 0; j < dataSource.data.length; j++) {
            innerHtml += "<tr>";
            for (i = 0; i < dataSource.schema.length; i++) {
                var schemaItem = dataSource.schema[i];
                var val = dataSource.data[j][schemaItem];
                if (!val && !isNumber(val))
                    val = "";
                innerHtml += "<td>" + val + "</td>";
            }
            //innerHtml += '<td><input type="checkbox" checked></td>'
            innerHtml += "</tr>";
        }
        innerHtml += "</table>";
        return innerHtml;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function main(sb,config) {
        var element = sb.getContainer();
        var dataSource = sb.getDatasource();

        if (dataSource.data.length < 1)
            $(element).hide();
        else
            $(element).show();

        element.innerHTML = createTableHtml(dataSource);
    }

    return {
        name: "dataTable",
        init: function (sb) {
            var config = getDefaultConfig();
            sb.listen(events.updatedDataSource, function() {
                main(sb,config);
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

