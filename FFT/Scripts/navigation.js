$('body').keyup(function (e) {

    if (!e.ctrlKey) {
        return;
    }

    // -->
    if (e.which == 39) {
        $('body').hide(1000);
        setTimeout(function () {
            window.location = frward;
        }, 1000);
    }
    // <--
    if (e.which == 37) {
        $('body').hide(1000);
        setTimeout(function () {
            window.location = backward;
        }, 1000);
    }

    if (e.which == 81 || e.which == 113) {
        $('body').hide(1000);
        setTimeout(function () {
            window.location ='/';
        }, 1000);
    }

    if (e.which == 87 || e.which == 119) {
        $('body').hide(1000);
        setTimeout(function () {
            window.location = '/dft';
        }, 1000);
    }

    if (e.which == 69 || e.which == 101) {
        $('body').hide(1000);
        setTimeout(function () {
            window.location = '/dft1';
        }, 1000);
    }


});