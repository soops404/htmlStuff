var visited = parseInt(sessionStorage.getItem("visited"));
if (visited == 1) {
    $("#splash").css("display", "none");  
    $("#hideScreen").css("display", "none");             
}


$("#enterBTN").click(function () {
    $("#splash").css("display", "none");  
    $("#hideScreen").css("display", "none");  
    if (window.sessionStorage) {
        sessionStorage.setItem("visited", 1);
    }
});  