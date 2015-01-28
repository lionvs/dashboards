application.controller("modalInputController", function ($scope) {
    $scope.inputDashboardName = "";
    $scope.inputDashboardDescription = "";
    $scope.saveDashboard = function () {
        saveDashboard($scope.inputDashboardName, $scope.inputDashboardDescription);
    };
});