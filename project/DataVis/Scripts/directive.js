var directive = {
    create: function (module, classTitle, htmlTemplateUrl) {
        module.directive(classTitle, function ($compile) {
            return {
                restrict: 'C',
                templateUrl: htmlTemplateUrl,
                scope: true
            }
        });
    }
}