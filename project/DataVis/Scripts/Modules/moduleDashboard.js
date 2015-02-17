var moduleDashBoard = function () {


    function dragHandler(sandbox) {
        var element = sandbox.getContainer();
        element.ondragover = function (event) {
            sandbox.notify(
                {
                    type: events.dragOver,
                    data: event
                });
        }
        element.ondragleave = function (event) {
            sandbox.notify(
                {
                    type: events.dragLeave,
                    data: event
                });
        }
        element.ondragenter = function (event) {
            sandbox.notify(
                {
                    type: events.dragEnter,
                    data: event
                });
        }
        element.ondrop = function (event) {
            sandbox.notify(
                {
                    type: events.drop,
                    data: event
                });
        }
    }
    return {
        name: "dashBoard",
        init: function(sandbox) {
            dragHandler(sandbox);
        }
    }
}();