var textBox = function() {
    return {
        name: "textBox",
        init: function(sb) {
            var element = sb.getElement();
            element.innerHTML = "<input type='text'/> <br/>";
            element.addEventListener("change", function(newText) {
                sb.notify({
                    type: events.textChanged,
                    data: newText
                });
            });
        },
        destroy: function(element) {
            element.innerHTML = "";
        }
    }
}();