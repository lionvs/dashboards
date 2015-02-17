var user = {
    headers: {
        Authorization: null,
    },
    setHeaders: function () {
        this.headers.Authorization = 'Bearer ' + sessionStorage.getItem("accessToken");
    },
    getUserName: function () {
        return sessionStorage.getItem("username");
    }
}