var moduleUploadData = function () {
    
    var mySandbox;
    var elementInputFile;

    function getSchema(data) {
        var schema= {}
        for(var i=0;i<data.length;i++)
            for(var j in data[i])
                if (!schema[j])
                    schema[j] = "";
        var result = [];
        for (var item in schema)
            result.push(item);
        return result;
    }

    function getDataBySource(fileId) {
        $.getJSON('/api/File/' + fileId)
            .done(function (resp) {
                if (resp.Data.success == true) {
                    //   dataSource = resp.Data.dataObj;
                    var myDataSource = {};
                    myDataSource.data = resp.Data.dataObj;
                    myDataSource.schema = getSchema(myDataSource.data);
                    var event = {
                        type: events.updatedDataSource,
                        data: myDataSource
                    }
                    mySandbox.notify(event);
                }
                else { alert(resp.Data.msg); }
            });
    }

    function uploadedData() {
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
                var fileId = resp.Data.id;
                getDataBySource(fileId);
                
                
            });
        } else {
            alert("chose .xlsx file");
        }
    };

    return {
        name: "uploadData",
        init: function (sb) {
            mySandbox = sb;
            var element = sb.getElement();
            element.innerHTML = '<span class="btn btn-block btn-lg btn-info btn-file"> \
            Upload .xlsx file \
            <input type="file" id="fileToUpload"> \
            </span>';

            elementInputFile = element.childNodes[0].childNodes[1];
            $(elementInputFile).change(uploadedData);
        }
    }
}();

