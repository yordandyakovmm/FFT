var globalData;

function drawGraph()
{
    var selected = [];
    $('#freq-container').find('input[type=checkbox]:checked').each(function (index) {
        var $container = $(this).parent().parent();
        var freq = $container.find("input[type=text]").attr('data');
        var index = $container.find("input[type=text]").attr('id').substring(1);
        var val = globalData.fft[index];
        var arg = 0;
        if (val.real == 0 && val.imag > 0)
        {
            arg = Math.PI / 2;
        }
        else if (val.real == 0 && val.imag < 0) {
            arg = - Math.PI / 2;
        }
        else if (val.real > 0 && val.imag > 0) {
            arg = Math.atan(Math.abs(val.imag) / Math.abs(val.real))
        }
        else if (val.real > 0 && val.imag < 0) {
            arg = - Math.atan(Math.abs(val.imag) / Math.abs(val.real))
        }
        else if (val.real < 0 && val.imag > 0) {
            arg = Math.PI - Math.atan(Math.abs(val.imag) / Math.abs(val.real));
        }
        else if (val.real < 0 && val.imag < 0) {
            arg = -(Math.PI - Math.atan(Math.abs(val.imag) / Math.abs(val.real)));
        }

        selected.push({
            freq : freq,
            val: val,
            mod: Math.sqrt(val.real * val.real + val.imag * val.imag),
            arg : arg
        })
    });
    
    // ***************************
    var x1 = null, y1 = null, x2 = null, y2 = null;
    var cFft = document.getElementById('ctime');
    var ftx = cFft.getContext('2d');
        
    var time = parseInt($('#time').val());
    var sample = parseInt($('#sample').val());
    var countSimpeTime = time / sample;
    
    var dimX = 660 / sample;
    var dimY = 20;
    for (var i = 0; i < 660; i++)
    {
        x = i / dimX;
        y = 0;
        for (var j = 0; j < selected.length; j++) {
            var sel = selected[j];
            console.log("arg: ", sel.arg);
                       
            y += sel.freq == 0
                ? sel.mod
                : sel.mod * 2 * Math.cos(x * 2 * Math.PI * sel.freq + sel.arg);
        }

        ftx.fillRect(xCoard(i), yCord(y * dimY ), 1, 1);

    }
    
}


function xCoard(x) {
    return x + 20;
}

function yCord(y) {
    return 175 - y;
}

