﻿var moduleDragDrop = function (elementDashboard){

    function handleDragStart(eventData) {
        var a = eventData;
        moduleDragDrop.dragWidgetName = eventData.target.firstElementChild.id;
    }
    function handleDragEnd(event) {
    }
    function  handleDragEnter(event) {
        //
    }
    function handleDragLeave(e) {
    }
    function handleDragOver(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }

        event.dataTransfer.dropEffect = 'move';

        return false;
    }
    function handleDrop(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        var posx = 0;
        var posy = 0;
        if (!event) var event = window.event;
        if (event.pageX || event.pageY) {
            posx = event.pageX;
            posy = event.pageY;
        }
        else if (event.clientX || event.clientY) {
            posx = event.clientX + document.body.scrollLeft
                + document.documentElement.scrollLeft;
            posy = event.clientY + document.body.scrollTop
                + document.documentElement.scrollTop;
        }
        var position = {
            top: posy,
            left:posx
        }
        core.startWidget(moduleDragDrop.dragWidgetName, angularHelper.createElement(elementDashboard, moduleDragDrop.dragWidgetName), position);
    }
    return {
        name: "dragDrop",
        init: function(sandbox) {
            sandbox.listen(events.dragStart, function (event) {
                handleDragStart(event);
            });
            sandbox.listen(events.drop, function (event) {
                handleDrop(event);
            });
            sandbox.listen(events.dragOver, function (event) {
                handleDragOver(event);
            });
        }
    }
};
