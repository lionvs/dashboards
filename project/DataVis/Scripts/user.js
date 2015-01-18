var user = {
    name : null,
    isLogged: false,
    headers: {
        Authorization: null,
    },
    setHeaders: function () {
        this.headers.Authorization = 'Bearer ' + sessionStorage.getItem("accessToken");
    },
    setUserName: function () {
        this.name = sessionStorage.getItem("username");
    },
}

//    $.ajax({
//        type: 'GET',
//        url: '/api/values',
//        headers: user.headers
//    }).done(function (data) {
//        self.result(data);
//    }).fail(function (resp) {
//        alert(resp.status + ": " + resp.statusText);
//    });

//function logOut() {
//    
//}
