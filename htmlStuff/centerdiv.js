

$(".row img").on("click", function() {
    var image = $(this).attr("src");
    $(".overDraw img").attr("src", image);
    $(".overDraw").css("display", "block");
});

$(".overDraw").on("click", function() {
    $(this).css("display", "none");
})