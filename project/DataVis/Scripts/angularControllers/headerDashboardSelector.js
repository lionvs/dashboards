var dashboard;
if (typeof application != 'undefined') {
    application.controller("headerDashboardSelector", function ($scope) {

        $scope.dashboard = dashboard;

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
}