var globalConfig = {
    dashboard: ""
}

application.controller("headerDashboardSelector", function ($scope) {

    $scope.globalConfig = globalConfig;

    $scope.dashboardOptions = [
        "dashboard1",
        "dashboard2",
        "dashboard3",
        "dashboard4",
        "dashboard5",
        "dashboard6",
        "dashboard7"
    ];
});