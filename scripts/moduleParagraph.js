var paragraph = function() {
    return {
        name: "paragraph",
        init: function(sb) {
            var element = sb.getElement();

            element.innerHTML = '<p></p>';
            element.innerHTML += '<button>' + "Stop listening event" + '</button';

            sb.listen(events.textChanged, function(newText) {
                element.childNodes[0].textContent = newText.target.value;
            });
            element.childNodes[1].addEventListener("click", function () {
                sb.stopListen(events.textChanged);
                element.childNodes[1].disabled = true;
            });
        },
        destroy: function(element) {
            element.innerHTML = "";
        }
    }
}();