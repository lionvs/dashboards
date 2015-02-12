application.controller("modalInputController", function ($scope, getCurrentDashboard, getCurrentTitle, $modalInstance, $rootScope) {
    $scope.showSaveAsNewButton = true;
    if (getCurrentTitle === "") {
        $scope.showSaveAsNewButton = false;
    } else {
        $scope.inputDashboardName = getCurrentDashboard["Title"];
        $scope.inputDashboardDescription = getCurrentDashboard["Description"];
    }

    $scope.saveDashboard = function () {
        if (getCurrentTitle === "") {
            saveDashboard($scope.inputDashboardName, $scope.inputDashboardDescription);
            $rootScope.$broadcast("newDashboard", { changedTitle: $scope.inputDashboardName });
            $scope.closeModal();
        } else {
            editDashboard(getCurrentDashboard["Id"], $scope.inputDashboardName, $scope.inputDashboardDescription);
            $rootScope.$broadcast("newDashboard", { changedTitle: $scope.inputDashboardName });
            $scope.closeModal();
        }
    };

    $scope.closeModal = function () {
        $modalInstance.dismiss();
    }
});