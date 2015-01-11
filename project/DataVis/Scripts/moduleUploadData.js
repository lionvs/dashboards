var moduleUploadData = function () {

    var mySandbox;
    var elementInputFile;

    function getDefaultConfig() {
        return null;
    }

    function getSchema(data) {
        var schema = {}
        for (var i = 0; i < data.length; i++)
            for (var j in data[i])
                if (!schema[j])
                    schema[j] = "";
        var result = [];
        for (var item in schema)
            result.push(item);
        return result;
    }

    function uploadData() {
        var formData = new FormData();
        var opmlFile = $(elementInputFile)[0];
        var ext = opmlFile.value.substring(opmlFile.value.lastIndexOf('.') + 1);
        if (ext == "xlsx") {
            formData.append("opmlFile", opmlFile.files[0]);

            $.ajax({
                url: '/api/File',
                type: 'POST',
                data: formData,
                async: true,
                contentType: false,
                processData: false,
            }).done(function (resp) {
                var url = resp.url;
                getDataBySource(url);


            });
        } else {
            alert("chose .xlsx file");
        }
    };

    function getDataBySource(url) {
        $.getJSON(url)
            .done(function (resp) {
                    var myDataSource = {};
                    myDataSource.data = resp;
                    myDataSource.schema = getSchema(myDataSource.data);
                    var event = {
                        type: events.updatedDataSource,
                        data: myDataSource
                    }
                    mySandbox.notify(event);
            });
    }


    function main(sb, config) {
        var element = sb.getContainer();
        element.innerHTML = '<span class="btn btn-block btn-lg btn-info btn-file"> \
            Upload .xlsx file \
            <input type="file" id="fileToUpload"> \
            </span>';

        elementInputFile = element.childNodes[0].childNodes[1];
        $(elementInputFile).change(uploadData);
    }

    return {
        name: "uploadData",
        init: function (sb) {
            mySandbox = sb;
            var config = getDefaultConfig();
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

