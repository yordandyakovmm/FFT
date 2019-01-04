$('body').keyup(function (e) {


    if (!e.ctrlKey) {
        return;
    }

    // -->
    if (e.which == 39) {
       window.location = frward;
    }
    // <--
    if (e.which == 37) {
        window.location = backward;
    }
       

});