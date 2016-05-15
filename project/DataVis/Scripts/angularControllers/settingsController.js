application.controller("settingsController", function ($scope, getCurrentDashboard, getCurrentTitle, $modalInstance, $rootScope) {
    $scope.showSaveAsNewButton = true;

    var toolBoxScope = angular.element($("#toolBox")).scope();
    $scope.widgets = toolBoxScope.widgets;

    if (getCurrentTitle === "") {
        $scope.showSaveAsNewButton = false;
    } else {
        $scope.inputDashboardName = getCurrentDashboard["Title"];
        $scope.inputDashboardDescription = getCurrentDashboard["Description"];
    }

    $scope.saveAsNewDashboard = function () {
        save();
    }

    $scope.saveDashboard = function () {
        if (getCurrentTitle === "") {
            save();
        }
        else {
            edit();
        }
    };

    $scope.closeModal = function () {
        $modalInstance.dismiss();
    }


    function edit() {
        proxy.editDashboard(getCurrentDashboard["Id"], $scope.inputDashboardName, $scope.inputDashboardDescription);
        $rootScope.$broadcast("newDashboard", { changedTitle: $scope.inputDashboardName });
        $scope.closeModal();
    }
});