﻿var moduleToolBox = function () {

    var widgets = [];


    function fillHtmlTemplate(sandbox) {
            var angular = sandbox.require('angular');
            var $scope = angular.element(sandbox.getContainer()).scope();
            $scope.$apply(function() {
                $scope.widgets = widgets;
        });
    }

    function dragHandler(sandbox) {
        var element = sandbox.getContainer();
        for (var i = 0; i < element.childElementCount; i++) {
            element.children[i].ondragstart = function (event) {
                sandbox.notify(
                    {
                        type: events.dragStart,
                        data: event
                    });
            }
        }
    }

    function autoScrolling(sandbox) {
        var $ = sandbox.require("JQuery");
        var element = sandbox.getContainer();
        $(window).scroll(function () {
            $(element).stop().animate({ "marginTop": ($(window).scrollTop()) + "px", "marginLeft": ($(window).scrollLeft()) + "px" }, "slow");
        });
    }
    return {
        name: "toolBox",
        init: function (sandbox) {
            autoScrolling(sandbox);
            fillHtmlTemplate(sandbox);
            dragHandler(sandbox);
            sandbox.listen(events.registerWidgetRequest, function (data) {
                widgets.push({ imgUrl: data.imgUrl, name: data.name, title: data.title, displayedName: data.displayedName });
            });
        },
    }
}();