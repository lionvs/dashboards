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
        alert("Done!");
    }).fail(function (resp) {
        alert(resp.status + ": " + resp.statusText);
    });
}