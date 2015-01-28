application.controller("headerController", function ($scope) {
    var currentDashboard="";
    var storedDashboards = getListDashboards();
    var titles = _.map(storedDashboards, function (dashboard) { return dashboard["Title"] });
    titles.push("");
    $scope.dashboardOptions = titles;
    $scope.currentDashboard = currentDashboard;
    $scope.changeCurrentDashboard = function () {
        var id = _.filter(storedDashboards, function (dashboard) { return (dashboard["Title"] === $scope.currentDashboard) })[0]["Id"];
        var l = JSON.parse(getDashboard(id)["Config"]);
        var l = [
            {
                name: "dataTable",
                config: null,
                position: {
                    left: 10,
                    top: 10
                }
            }
        ];
        core.setGlobalConfig(l, document.getElementById("dashboard123"));
        var t = l;
    };
});