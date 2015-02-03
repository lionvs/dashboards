var moduleDashBoard = function () {


    function dragHandler(sb) {
        var element = sb.getContainer();
        element.ondragover = function (event) {
            sb.notify(
                {
                    type: events.dragOver,
                    data: event
                });
        }
        element.ondragleave = function (event) {
            sb.notify(
                {
                    type: events.dragLeave,
                    data: event
                });
        }
        element.ondragenter = function (event) {
            sb.notify(
                {
                    type: events.dragEnter,
                    data: event
                });
        }
        element.ondrop = function (event) {
            sb.notify(
                {
                    type: events.drop,
                    data: event
                });
        }
    }
    return {
        name: "dashBoard",
        init: function(sb) {
            dragHandler(sb);
        }
    }
}();