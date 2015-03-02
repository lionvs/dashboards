application.controller("headerController", function ($scope, $modal, $timeout) {
    onLoad();

    $scope.changeCurrentDashboard = function () {
        setCurrentDashboardObject();
        if ($scope.currentDashboard === "") {
            createDashboard();
        } else {
            setDashboard($scope.storedDashboards, $scope);
            editDashboard();
        }
    };

    $scope.deleteDashboard = function () {
        var id = _.filter($scope.storedDashboards, function (dashboard) {
            return (dashboard["Title"] === $scope.currentDashboard);
        })[0]["Id"];
        proxy.deleteDashboard(id);
        $scope.currentDashboard = _.last($scope.storedDashboards);
        createDashboard();
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

    $scope.shareDashboard = function () {
        var modalInstance = $modal.open({
            templateUrl: '/HtmlTemplates/ShareModalWindow.html',
            controller: 'shareDashboardController',
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
        $timeout(function () {
            $scope.currentDashboard = args.changedTitle;
            setTitles($scope);
            editDashboard();
            $scope.currentDashboardObject = _.filter($scope.storedDashboards,
                function (dashboard) {
                    return (dashboard["Title"] === args.changedTitle);
                })[0];
        }, 4000);
    });

    function onLoad() {
        $scope.storedDashboards = proxy.getListDashboards();
        if (_.size($scope.storedDashboards) === 0) {
            createDashboard();
        } else {
            $scope.currentDashboard = $scope.storedDashboards[0]["Title"];
            setCurrentDashboardObject();
            editDashboard();
            $timeout(function () {
                setDashboard($scope.storedDashboards, $scope);
            },250);
        }
        setTitles($scope);
    }

    function createDashboard() {
        $scope.saveEditDashboardButton = "Save";
        $scope.showDeleteButton = false;
        $scope.currentDashboard = "";
        cleanDashboard();
    }

    function editDashboard() {
        $scope.saveEditDashboardButton = "Edit";
        $scope.showDeleteButton = true;
    }

    function setCurrentDashboardObject() {
        $scope.currentDashboardObject = _.filter($scope.storedDashboards, function (dashboard) {
            return (dashboard["Title"] === $scope.currentDashboard);
        })[0];
    }
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