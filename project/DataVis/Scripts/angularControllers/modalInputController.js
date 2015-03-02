application.controller("modalInputController", function ($scope, getCurrentDashboard, getCurrentTitle, $modalInstance, $rootScope) {
    $scope.showSaveAsNewButton = true;
    if (getCurrentTitle === "") {
        $scope.showSaveAsNewButton = false;
    } else {
        $scope.inputDashboardName = getCurrentDashboard["Title"];
        $scope.inputDashboardDescription = getCurrentDashboard["Description"];
    }
    $scope.saveAsNewDashboard = function () {
        proxy.saveDashboard($scope.inputDashboardName, $scope.inputDashboardDescription, null);
        $rootScope.$broadcast("newDashboard", { changedTitle: $scope.inputDashboardName });
        $scope.closeModal();
    }

    $scope.saveDashboard = function () {
        if (getCurrentTitle === "") {
            proxy.saveDashboard($scope.inputDashboardName, $scope.inputDashboardDescription, null);
            $rootScope.$broadcast("newDashboard", { changedTitle: $scope.inputDashboardName });
            $scope.closeModal();
        }
        else {
            proxy.editDashboard(getCurrentDashboard["Id"], $scope.inputDashboardName, $scope.inputDashboardDescription);
            $rootScope.$broadcast("newDashboard", { changedTitle: $scope.inputDashboardName });
            $scope.closeModal();
        }
    };

    $scope.closeModal = function () {
        $modalInstance.dismiss();
    }
});