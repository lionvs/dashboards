var user = {
    name : null,
    headers: {
        Authorization: null,
    },
    setHeaders: function () {
        this.headers.Authorization = 'Bearer ' + sessionStorage.getItem("accessToken");
    },
    setUserName: function () {
        this.name = sessionStorage.getItem("username");
    }
}