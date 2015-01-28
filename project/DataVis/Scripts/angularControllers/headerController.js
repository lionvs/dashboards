application.controller("headerController", function ($scope) {
    var dashboard="";
    var dashboards = getListDashboards();
    var titles = _.map(dashboards, function (dashboard) { return dashboard["Title"] });
    titles.push("");
    $scope.dashboardOptions = titles;
    $scope.dashboard = dashboard;
});