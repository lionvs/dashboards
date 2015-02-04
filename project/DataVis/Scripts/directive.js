var directive = {
    create: function (module, classTitle, htmlTemplateUrl) {
        function link(scope, element, attrs) {
            scope.widgetName = classTitle;
            scope.closeWidget = function() {
                core.stopWidget(element);
            }
        }

        module.directive(classTitle, function ($compile) {
            return {
                restrict: 'C',
                templateUrl: htmlTemplateUrl,
                scope: true,
                link: link
            }
        });
    }
}