﻿var moduleToolBox = function () {

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

    return {
        name: "toolBox",
        init: function (sb) {
            fillHtmlTemplate(sb);
            dragHandler(sb);

        },
        addWidget:function(imgUrl, name) {
            widgets.push({ imgUrl: imgUrl, name: name });
        }
    }
}();