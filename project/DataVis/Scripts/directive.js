var directive = {
    create: function (module, classTitle, htmlTemplate) {
        module.directive(classTitle, function ($compile) {
            return {
                restrict: 'C',
                template: htmlTemplate,
            }
        });
    }
}