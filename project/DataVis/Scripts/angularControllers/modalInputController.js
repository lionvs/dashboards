application.controller("modalInputController", function ($scope, getCurrentDashboard, getCurrentTitle, $modalInstance, $rootScope) {
    if (getCurrentTitle === "") {
    } else {
        $scope.inputDashboardName = getCurrentDashboard["Title"];
        $scope.inputDashboardDescription = getCurrentDashboard["Description"];
    }

    $scope.saveDashboard = function () {
        if (getCurrentTitle === "") {
            saveDashboard($scope.inputDashboardName, $scope.inputDashboardDescription);
            $rootScope.$broadcast("newDashboard");
            $scope.closeModal();
        } else {
            editDashboard($scope.inputDashboardName, $scope.inputDashboardDescription);
            $rootScope.$broadcast("newDashboard");
            $scope.closeModal();
        }

    };
    $scope.closeModal = function () {
        $modalInstance.dismiss();
    }
});