angularHelper = {
    createElement: function (container, classTitle) {
        var element = angular.element(container);
        element.append("<div class='" + classTitle + "'></div>");
        var $injector = element.injector();
        var addedDiv = angular.element(container.lastChild);
        var $scope = addedDiv.scope();
        var $compile = $injector.get('$compile');
        $compile(addedDiv)($scope);
        return container.lastChild;
    },

    getTimeout: function(element) {
        var myElement = angular.element(element);
        var $injector = myElement.injector();
        return $injector.get('$timeout');
    }
}