application.controller("headerController", function ($scope) {
    var currentDashboard="";
    var storedDashboards = getListDashboards();
    var titles = _.map(storedDashboards, function (dashboard) { return dashboard["Title"] });
    titles.push("");
    $scope.dashboardOptions = titles;
    $scope.currentDashboard = currentDashboard;
    $scope.changeCurrentDashboard = function () {
        var id = _.filter(storedDashboards, function (dashboard) { return (dashboard["Title"] === $scope.currentDashboard) })[0]["Id"];
        var data = JSON.parse(getDashboard(id)["DataSource"]);
        core.setDataSource(data);
        var globalConfig = JSON.parse(getDashboard(id)["Config"]);
        core.setGlobalConfig(globalConfig, document.getElementById("dashboard"));
    };
});