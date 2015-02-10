application.controller("headerController", function ($scope, $modal, $timeout) {
    $scope.saveEditDashboardButton = "Save";
    $scope.currentDashboard = "";
    var storedDashboards = getListDashboards();
    setTitles($scope);

    $scope.changeCurrentDashboard = function () {
        $scope.currentDashboardObject = _.filter(storedDashboards, function (dashboard) {
            return (dashboard["Title"] === $scope.currentDashboard);
        })[0];
        if ($scope.currentDashboard === "") {
            $scope.saveEditDashboardButton = "Save";
            $scope.showDeleteButton = false;
            cleanDashboard();
        } else {
            $scope.saveEditDashboardButton = "Edit";
            $scope.showDeleteButton = true;
            setDashboard(storedDashboards, $scope);
        }
    };

    $scope.deleteDashboard = function () {
        var id = _.filter(storedDashboards, function (dashboard) {
            return (dashboard["Title"] === $scope.currentDashboard);
        })[0]["Id"];
        deleteDashboard(id);
        cleanDashboard();
        $timeout(function () {
            setTitles($scope);
        }, 3000);
    }

    $scope.saveEditDashboard = function () {
        var modalInstance = $modal.open({
            templateUrl: '/HtmlTemplates/ModalWindow.html',
            controller: 'modalInputController',
            resolve: {
                getCurrentDashboard: function () {
                    return $scope.currentDashboardObject;
                },
                getCurrentTitle: function () {
                    return $scope.currentDashboard;
                }
            }
        });
    };

    $scope.$on("newDashboard", function () {
        $timeout(function () {
            setTitles($scope);
        }, 3000);
    }
    );
});

function setDashboard(storedDashboards, $scope) {
    var id = _.filter(storedDashboards, function (dashboard) { return (dashboard["Title"] === $scope.currentDashboard) })[0]["Id"];
    var data = JSON.parse(getDashboard(id)["DataSource"]);
    var globalConfig = JSON.parse(getDashboard(id)["Config"]);
    core.setGlobalConfig(globalConfig, document.getElementById("dashboard"), data);
}

function cleanDashboard(parameters) {
    core.stopAllWidgets();
}

function setTitles($scope) {
    var storedDashboards = getListDashboards();
    var titles = _.map(storedDashboards, function (dashboard) {
        return dashboard["Title"];
    });
    titles.push("");
    $scope.dashboardOptions = titles;
}