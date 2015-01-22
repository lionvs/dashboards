var moduleUploadData = function () {

    var mySandbox;
    var elementInputFile;

    function getDefaultConfig() {
        return null;
    }

    function getSchema(data) {
        return _.keys(data[0]);
    }

    function openFile() {
        user.setHeaders();
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
                headers: user.headers
            }).done(function (resp) {
                var myDataSource = {};
                myDataSource.data = resp;
                myDataSource.schema = getSchema(myDataSource.data);
                var event = {
                    type: events.uploadedDataSource,
                    data: myDataSource
                }
                mySandbox.notify(event);
                event.type = events.updatedDataSource;
                mySandbox.notify(event);
            }).fail(function (resp) {
                alert(resp.status + ": " + resp.statusText);
            });
        } else {
            alert("chose .xlsx file");
        }
    };



    function main(sb, config) {
        var element = sb.getContainer();
        element.innerHTML = '<span class="btn btn-block btn-lg btn-info btn-file"> \
            Open .xlsx file \
            <input type="file" id="fileToUpload"> \
            </span>';

        elementInputFile = element.childNodes[0].childNodes[1];
        $(elementInputFile).change(openFile);
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

