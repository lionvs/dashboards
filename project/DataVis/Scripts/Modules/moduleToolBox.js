var moduleToolBox = function () {

    var widgets = [];


    function fillHtmlTemplate(sb) {
            var angular = sb.require('angular');
            var $scope = angular.element(sb.getContainer()).scope();
            $scope.$apply(function() {
                $scope.widgets = widgets;
        });
    }

    
    function dragHandler(sb) {
        var element = sb.getContainer();
        for (var i = 0; i < element.childElementCount; i++) {
            element.children[i].ondragstart = function (event) {
                sb.notify(
                    {
                        type: events.dragStart,
                        data: event
                    });
            }
        }
    }

    function autoScrolling(sb) {
        var $ =sb.require("JQuery")
        var element = sb.getContainer();
        $(window).scroll(function () {
            $(element).stop().animate({ "marginTop": ($(window).scrollTop()) + "px", "marginLeft": ($(window).scrollLeft()) + "px" }, "slow");
        });
    }
    return {
        name: "toolBox",
        init: function (sb) {
            autoScrolling(sb);
            fillHtmlTemplate(sb);
            dragHandler(sb);
            sb.listen(events.registerWidgetRequest, function (data) {
                widgets.push({ imgUrl: data.imgUrl, name: data.name, title: data.title });
            });
        },
    }
}();