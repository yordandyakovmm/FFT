$(document).ready(function () {

    

    var el;
    var conv;
    var ctx;
    var isDrawing;
    var couunt = 0;
    var type = 0;
    var x = 0;
    var y = 0;

    initSigniture();

});


    function initSigniture() {

        el = document.getElementById('signiture-div');
        if (!el)
        {
            return;
        }

        conv = document.getElementById('signiture');
        ctx = conv.getContext('2d');
        ctx.strokeStyle = 0;
        ctx.lineWidth = 3;
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#000000';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 0.6;
        isDrawing = false;;
        couunt = 0;

        el.onmousedown = function (e) {
            isDrawing = true;
            x = e.offsetX;
            y = e.offsetY;
            ctx.moveTo(e.offsetX, e.offsetX);
        };
    
        el.onmousemove = function (e) {
            if (isDrawing) {
                couunt++;
                //setContext(ctx, distance, x, y)
                ctx.lineTo(e.offsetX, e.offsetY);
                x = e.offsetX;
                y = e.offsetY;
                ctx.stroke();
            }
            if (couunt > 80) {
                $('.form-box-signiture').removeClass('error').addClass('success');
                //saveSigiture();
            }
        };
        el.mouseout = function (e) {
            isDrawing = false;
        
        };

        el.mousein = function (e) {
            debugger;
            //console.log('in');
        };

        el.onmouseup = function () {
            isDrawing = false;
            //console.log('up');
            saveSigiture();
        };
    }

