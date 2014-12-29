var moduleDataTable = function () {
    function createTableHtml(dataSource) {
        var innerHtml = "<table border='1'> <tr>";
        for (var i = 0; i < dataSource.schema.length; i++)
            innerHtml += "<th>" + dataSource.schema[i] + "</th>";
        //innerHtml +='<th>Show</th>';
        innerHtml += "</tr>";

        for (var j = 0; j < dataSource.data.length; j++) {
            innerHtml += "<tr>"
            for (var i = 0; i < dataSource.schema.length; i++) {
                var schemaItem = dataSource.schema[i];
                var val = dataSource.data[j][schemaItem]
                if (!val && !isNumber(val))
                    val = "";
                innerHtml += "<td>" + val + "</td>";
            }
            //innerHtml += '<td><input type="checkbox" checked></td>'
            innerHtml += "</tr>"
        }
        innerHtml += "</table>";
        return innerHtml;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function main(sb) {
        var e = sb.getElement();
        var d = sb.getDatasource();

        if (d.data.length < 1)
            $(e).hide();
        else
            $(e).show();

        e.innerHTML = createTableHtml(d);
    }

    return {
        name: "dataTable",
        init: function (sb) {
            sb.listen(events.updatedDataSource, function() {
                main(sb);
            });
            main(sb);
        }
    }
}();

