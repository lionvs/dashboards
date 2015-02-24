var directive = function() {

        var widgetFocused = false;
        var zIndexOfElement = 0;

        function onWidgetUnFocused(element) {
            $('#overlay').fadeOut('fast', function() {
                element.zIndex(zIndexOfElement);
            });
            widgetFocused = false;
        }

        function onWidgetFocused(element) {
            zIndexOfElement = element.zIndex();
            element.zIndex(9999);
            $('#overlay').fadeIn('slow');
            widgetFocused = true;
        }

        return {
            create: function(module, classTitle, htmlTemplateUrl) {
                module.directive(classTitle, function($compile) {
                    return {
                        restrict: 'C',
                        templateUrl: htmlTemplateUrl,
                        scope: true,
                        link: function(scope, element, attrs) {
                            scope.widgetName = classTitle;
                            scope.closeWidget = function() {
                                core.stopWidget(element);
                                if (widgetFocused)
                                    onWidgetUnFocused(element);
                            }
                            scope.focusWidget = function() {
                                if (widgetFocused)
                                    onWidgetUnFocused(element);
                                else
                                    onWidgetFocused(element);
                            }
                            scope.collapseWidget = function () {
                                $(element).animate({ 'height': '30px' }, 500);
                            }
                        }
                    }
                });
            }
    }
}();