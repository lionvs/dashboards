function login(username, password) {

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
        alert(resp.status + ": " + resp.statusText);
    });
}

function register(username, password, password2) {
    var data = {
        UserName: $("#registerUsername").val(),
        Password: $("#registerPassword").val(),
        ConfirmPassword: $("#registerConfirmPassword").val()
    };

    $.ajax({
        type: 'POST',
        url: '/api/Account/Register',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(data)
    }).done(function () {
        login(data.UserName, data.Password);
    }).fail(function (resp) {
        alert(resp.status + ": " + resp.statusText);
    });
}

function saveDashboard(title, description) {
    user.setHeaders();

    var dashboard = {
        Title: title,
        Config: JSON.stringify(core.getGlobalConfig()),
        Description: description,
        DataSource: JSON.stringify(core.getDatasource())
    }

    $.ajax({
        headers: user.headers,
        type: 'POST',
        url: '/api/Dashboard',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dashboard)
    }).done(function (resp) {
        if (resp.success === true)
            alert("done");
        else alert("error");
    }).fail(function (resp) {
        alert(resp.status + ": " + resp.statusText);
    });
}

function getListDashboards() {
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
        alert(resp.status + ": " + resp.statusText);
    });
    return result;
}

function getDashboard(id) {
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
        alert(resp.status + ": " + resp.statusText);
    });
    return result;
}

function deleteDashboard(id) {
    user.setHeaders();
    $.ajax({
        headers: user.headers,
        type: 'DELETE',
        url: '/api/dashboard/' + id,
        async: false
    }).done(function () {
        alert("done");
    }).fail(function (resp) {
        alert(resp.status + ": " + resp.statusText);
    });
}

function editDashboard(id, title, description) {
    var dashboard = {
        Title: title,
        Config: JSON.stringify(core.getGlobalConfig()),
        Description: description,
        DataSource: JSON.stringify(core.getDatasource())
    }
    $.ajax({
        headers: user.headers,
        type: 'PUT',
        url: '/api/dashboard/' +id,
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(dashboard)
    }).done(function () {
        alert("done");
    }).fail(function (resp) {
        alert(resp.status + ": " + resp.statusText);
    });
}

function openFile() {
    user.setHeaders();
    var formData = new FormData();
    var opmlFile = $(fileToUpload)[0];
    var ext = opmlFile.value.substring(opmlFile.value.lastIndexOf('.') + 1);
    if (ext == "xlsx") {
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
            var myDataSource = {};
            myDataSource.data = resp;
            myDataSource.schema = getSchema(myDataSource.data);
            var event = {
                type: events.uploadedDataSource,
                data: myDataSource
            }
            sandBox.create().notify(event);
            event.type = events.updatedDataSource;
            sandBox.create().notify(event);
            alert("done");
        }).fail(function (resp) {
            alert(resp.status + ": " + resp.statusText);
        });
    } else {
        alert("chose .xlsx file");
    }
};

function getSchema(data) {
    return _.keys(data[0]);
}