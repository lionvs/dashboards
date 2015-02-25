application.controller("headerController", function ($scope, $modal, $timeout) {
    $scope.saveEditDashboardButton = "Save";
    $scope.currentDashboard = "";
    $scope.storedDashboards = proxy.getListDashboards();
    setTitles($scope);

    $scope.changeCurrentDashboard = function () {
        $scope.currentDashboardObject = _.filter($scope.storedDashboards, function (dashboard) {
            return (dashboard["Title"] === $scope.currentDashboard);
        })[0];
        if ($scope.currentDashboard === "") {
            $scope.saveEditDashboardButton = "Save";
            $scope.showDeleteButton = false;
            cleanDashboard();
        } else {
            $scope.saveEditDashboardButton = "Edit";
            $scope.showDeleteButton = true;
            setDashboard($scope.storedDashboards, $scope);
        }
    };

    $scope.deleteDashboard = function () {
        var id = _.filter($scope.storedDashboards, function (dashboard) {
            return (dashboard["Title"] === $scope.currentDashboard);
        })[0]["Id"];
        proxy.deleteDashboard(id);
        cleanDashboard();
        $timeout(function () {
            $scope.currentDashboard === "";
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

    $scope.$on("newDashboard", function (event, args) {
        $scope.currentDashboard = args.changedTitle;
        $scope.saveEditDashboardButton = "Edit";
        $scope.showDeleteButton = true;

        $timeout(function () {
            setTitles($scope);
            $scope.currentDashboardObject = _.filter($scope.storedDashboards,
                function (dashboard) {
                return (dashboard["Title"] === args.changedTitle);
            })[0];
        }, 3000);
    }
    );
});

function setDashboard(storedDashboards, $scope) {
    var id = _.filter(storedDashboards, function (dashboard) {
        return (dashboard["Title"] === $scope.currentDashboard)
    })[0]["Id"];
    var dashboard = proxy.getDashboard(id);
    var data = JSON.parse(dashboard["DataSource"]);
    var globalConfig = JSON.parse(dashboard["Config"]);
    core.setGlobalConfig(globalConfig, document.getElementById("dashboard"), data);
}

function cleanDashboard(parameters) {
    core.stopAllWidgets();
}

function setTitles($scope) {
    $scope.storedDashboards = proxy.getListDashboards();
    var titles = _.map($scope.storedDashboards, function (dashboard) {
        return dashboard["Title"];
    });
    titles.push("");
    $scope.dashboardOptions = titles;
}