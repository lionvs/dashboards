var proxy = {

    login: function (username, password) {

        var loginData = {
            grant_type: 'password',
            username: username,
            password: password
        };

        $.ajax({
            type: 'POST',
            url: '/Token',
            data: loginData
        }).done(function (data) {
            sessionStorage.setItem("accessToken", data.access_token);
            sessionStorage.setItem("username", data.userName);
            window.location.href = '/home/index';
        }).fail(function (resp) {
            $.notify(resp.status + ": " + resp.statusText);
        });
    },

    register: function (username, password, password2) {
        var data = {
            UserName: $("#registerUsername").val(),
            Password: $("#registerPassword").val(),
            ConfirmPassword: $("#registerConfirmPassword").val()
        };

        if (data.Password !== data.ConfirmPassword) {
            $.notify("Password does not match the confirm password", "error");
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/api/Account/Register',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data)
        }).done(function () {
            proxy.login(data.UserName, data.Password);
        }).fail(function (resp) {
            $.notify(resp.status + ": " + resp.statusText);
        });
    },

    logOut: function () {
        $.ajax({
            headers: user.headers,
            type: 'POST',
            url: '/api/Account/Logout'
        }).done(function () {
            sessionStorage.removeItem(user.tokenKey);
            location.reload();
        }).fail(function (resp) {
            $.notify(resp.status + ": " + resp.statusText);
        });
    },

    saveDashboard: function (title, description, userName) {
        user.setHeaders();

        var dashboard = {
            Title: title,
            UserName: userName,
            Config: JSON.stringify(core.getGlobalConfig()),
            Description: description,
            DataSource: JSON.stringify({
                Copy: core.getDatasource(),
                Original: core.getOriginalDatasource()
            })
        }

        $.ajax({
            headers: user.headers,
            type: 'POST',
            url: '/api/Dashboard',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(dashboard)
        }).done(function (resp) {
            if (resp.Message === null)
                $.notify("done");
            else
                $.notify(resp.Message, "error");
        }).fail(function (resp) {
            $.notify(resp.status + ": " + resp.statusText);
        });
    },

    getListDashboards: function () {
        var result;
        user.setHeaders();
        $.ajax({
            headers: user.headers,
            dataType: "json",
            type: 'GET',
            url: '/api/dashboard',
            async: false
        }).done(function (resp) {
            result = resp;
        }).fail(function (resp) {
            $.notify(resp.status + ": " + resp.statusText);
        });
        return result;
    },

    getDashboard: function (id) {
        var result;
        user.setHeaders();
        $.ajax({
            headers: user.headers,
            dataType: "json",
            type: 'GET',
            url: '/api/dashboard/' + id,
            async: false
        }).done(function (resp) {
            result = resp;
        }).fail(function (resp) {
            $.notify(resp.status + ": " + resp.statusText);
        });
        return result;
    },

    deleteDashboard: function (id) {
        user.setHeaders();
        $.ajax({
            headers: user.headers,
            type: 'DELETE',
            url: '/api/dashboard/' + id,
            async: false
        }).done(function () {
            $.notify("done");
        }).fail(function (resp) {
            $.notify(resp.status + ": " + resp.statusText);
        });
    },

    editDashboard: function (id, title, description) {
        var dashboard = {
            Title: title,
            Config: JSON.stringify(core.getGlobalConfig()),
            Description: description,
            DataSource: JSON.stringify({
                Copy: core.getDatasource(),
                Original: core.getOriginalDatasource()
            })
        }
        $.ajax({
            headers: user.headers,
            type: 'PUT',
            url: '/api/dashboard/' + id,
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(dashboard)
        }).done(function () {
            $.notify("done");
        }).fail(function (resp) {
            $.notify(resp.status + ": " + resp.statusText);
        });
    },

    openFile: function () {
        user.setHeaders();
        var formData = new FormData();
        var opmlFile = $("#fileToUpload")[0];
        var ext = opmlFile.value.substring(opmlFile.value.lastIndexOf('.') + 1);
        if (ext === "xlsx" || ext === "csv") {
            formData.append(opmlFile, opmlFile.files[0]);

            $.ajax({
                url: '/api/File',
                type: 'POST',
                data: formData,
                async: true,
                contentType: false,
                processData: false,
                headers: user.headers
            }).done(function (resp) {
                if (resp.Message != null) {
                    $.notify(resp.Message);
                }
                else {
                    var myDataSource = {};
                    myDataSource.data = resp.Data;
                    myDataSource.schema = proxy.getSchema(myDataSource.data);
                    var event = {
                        type: events.uploadedDataSource,
                        data: myDataSource
                    }
                    eventManager.triggerEvent(event);
                    event.type = events.updatedDataSource;
                    eventManager.triggerEvent(event);
                    $.notify("done");
                }
            }).fail(function (resp) {
                $.notify(resp.status + ": " + resp.statusText);
            });
        } else {
            $.notify("chose .xlsx or .csv file");
        }
        $("#fileToUpload")[0].value = null;
    },

    getSchema: function (data) {
        return _.keys(data[0]);
    }
}