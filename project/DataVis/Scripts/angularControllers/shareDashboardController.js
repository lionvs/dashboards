application.controller("shareDashboardController", function ($scope, getCurrentDashboard, getCurrentTitle, $modalInstance, $rootScope) {
    nullTitle = "";
    if (getCurrentTitle !== nullTitle) {
        $scope.dashboardName = getCurrentDashboard["Title"];
        $scope.dashboardDescription = getCurrentDashboard["Description"];
    }

    $scope.sendDashboard = function () {
        proxy.saveDashboard($scope.dashboardName, $scope.dashboardDescription, $scope.inputUserName);
        $modalInstance.dismiss();
    };

    $scope.closeModal = function () {
        $modalInstance.dismiss();
    }
});