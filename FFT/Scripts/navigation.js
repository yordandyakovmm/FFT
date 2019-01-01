$('body').keyup(function (e) {
    debugger;
    if (!e.altKey) {
        return;
    }

    // -->
    if (e.which == 39) {
        $('body');
            window.location = frward;
    }
    // <--
    if (e.which == 37) {
        $('body');
            window.location = backward;
    }

    if (e.which == 81 || e.which == 113) {
        $('body');
            window.location ='/';
    }

    if (e.which == 87 || e.which == 119) {
        $('body');
            window.location = '/dft';
    }

    if (e.which == 69 || e.which == 101) {
        $('body');
         window.location = '/dft1';
       
    }


});