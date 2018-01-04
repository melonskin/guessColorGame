$("ul").on("click", ".todoContent", function() {
    $(this).toggleClass("crossed");
});

$("ul").on("click", ".delete", function() {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
});

var liPrefix = '<li><span class="delete">X</span><span class="todoContent">';
var liEnd = '</span></li>';
$("#newTodo").keypress(function(event) {
    if (event.which == 13) {
        var val = $(this).val();
        if (!val) {
            return;
        }
        // create new li
        $("ul").append(liPrefix + val + liEnd);
        $(this).val("");
    }
});