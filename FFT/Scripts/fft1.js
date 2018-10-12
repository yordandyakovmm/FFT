var max = 660 / window.data.length;

var globalData;

function draw(data) {

    var ttime = parseInt($('#time').val());
    var sample = parseInt($('#sample').val());

    var time = data.time;
    var fft = data.fft;
    var cTime = document.getElementById('ctime');
    var cFft = document.getElementById('cfft');
    cTime.width = cTime.width;
    cFft.width = cFft.width;

    var ctx = cTime.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(xCoard(0), y(0));
    ctx.lineTo(xCoard(660), y(0));
    ctx.stroke();

    for (i = 0; i <= sample; i++) {

        ctx.beginPath();
        ctx.moveTo(xCoard(660 / sample * i), y(10));
        ctx.lineTo(xCoard(660 / sample * i), y(-10));
        ctx.stroke();
        ctx.font = "11px Arial";
        ctx.fillText((ttime / sample * i).toFixed(2), xCoard(660 / sample * i - 10), y(-25));

    }

    for (i = 0; i < sample; i++) {
        ctx.beginPath();
        ctx.arc(xCoard(660 / sample * i), y(time[i].real * 20), 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    // fft

    var ftx = cFft.getContext('2d');
    ftx.beginPath();
    ftx.moveTo(xCoard(0), y(0));
    ftx.lineTo(xCoard(660), y(0));
    ftx.stroke();




    var N = window.data.length;
    var Nmax = (N - (N % 2)) / 2;
    var even = true;

    if (N % 2 == 1) {
        even = false;
    }

    $('#freq-container').find('input[type=text]').each(function (index) {
        drawFFT(index, N, Nmax, even, ftx, data);
    });


}


function drawFFT(index, N, Nmax, even, ftx, data) {
    var max = 660 / window.data.length;
    var fft = data.fft;
    var fk = window.data[index].fk;
    var hz = window.data[index].hz;
    var color = window.data[index].color;
    var ind = window.data[index].index;

    var xNumber = 0;
    if (index == 0) {
        xNumber = 0;
    }
    else if (index <= Nmax) {
        xNumber = Nmax - index + 1
    }
    else {
        xNumber = -(index - Nmax) - (even ? 1 : 0);
    }

    var xx = max * xNumber;

    ftx.fillStyle = 'black';
    ftx.beginPath();
    ftx.moveTo(x1(xx), y(10));
    ftx.lineTo(x1(xx), y(-10));
    ftx.stroke();

    ftx.fillStyle = color;
    ftx.font = "11px Arial";
    ftx.fillText(hz, x1(xx - 5), y(-25));
    ftx.beginPath();
    ftx.arc(x1(xx), y(fft[ind].real * 20), 5, 0, 2 * Math.PI, false);
    ftx.fillStyle = 'red';
    ftx.fill();

    // add simetric blue point
    if (even && index == N / 2) {
        var xx = max * (-1);
        ftx.fillStyle = 'black';
        ftx.beginPath();
        ftx.moveTo(x1(xx), y(10));
        ftx.lineTo(x1(xx), y(-10));
        ftx.stroke();

        ftx.fillStyle = color;
        ftx.font = "11px Arial";
        ftx.fillText(hz, x1(xx - 5), y(-25));
        ftx.beginPath();
        ftx.arc(x1(xx), y(fft[ind].real * 20), 5, 0, 2 * Math.PI, false);
        ftx.fillStyle = 'red';
        ftx.fill();
    }

}


function fft1() {

    var data = [];
    $('#freq-container').find('input').each(function (index) {
        data.push($(this).val());
    });


    $.ajax({
        type: "POST",
        url: '/fft1',
        data: { json: data },
        success: function (data) {
            globalData = data;
            for (var i = 0; i < data.fft.length; i++) {
                var $i = $('#t' + i);
                $i.data.real = data.time[i].real;
                $i.data.imag = data.time[i].imag;
                $i.val(data.time[i].real.toFixed(3) + (Math.abs(data.time[i].imag) < 0.0001 ? '' : (data.time[i].imag > 0 ? '+' + data.time[i].imag.toFixed(3) : data.fft[i].imag.toFixed(3)) + 'i'));
            }

            draw(data);
            return;
        }

    });
}


function fft() {

    var data = [];
    $('#time-container').find('input').each(function (index) {
        data.push($(this).val());
    });
    
    $.ajax({
        type: "POST",
        url: '/fft',
        data: { json: data },
        success: function (data) {
            globalData = data;
            for (var i = 0; i < data.fft.length; i++) {
                var $i = $('#f' + i);
                $i.data.real = data.fft[i].real;
                $i.data.imag = data.fft[i].imag;
                $i.val(data.fft[i].real.toFixed(3) + (Math.abs(data.fft[i].imag) < 0.0001 ? '' : (data.fft[i].imag > 0 ? '+' + data.fft[i].imag.toFixed(3) : data.fft[i].imag.toFixed(3)) + 'i'));
            }

            draw(data);
            return;
        }

    });
}

function drawGraph()
{
    var selected = [];
    $('#freq-container').find('input[type=checkbox]:checked').each(function (index) {
        var $container = $(this).parent().parent();
        var freq = $container.find("input[type=text]").attr('data');
        var index = $container.find("input[type=text]").attr('id').substring(1);
        var val = globalData.fft[index];
        selected.push({
            freq : freq,
            val: val,
            mod: Math.sqrt(val.real * val.real + val.imag * val.imag),
            arg : val.real == 0 ? 0 :  Math.atan(val.imag/val.real)
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
            y += sel.freq == 0
                ? sel.mod
                : sel.mod * Math.sin(x / sel.freq - sel.arg);
        }

        ftx.fillRect(xCoard(i), y * 20, 1, 1);

    }
    
    debugger;
}



function sampleChange() {
    var time = parseInt($('#time').val());
    var sample = parseInt($('#sample').val());
    var dt = time / sample;
    var $timeContainer = $('#time-container');
    $timeContainer.html('');
    for (i = 0; i < sample; i++) {
        var tempate = $('#template').text();
        tempate = tempate.replace('#1#', 't' + i).replace('#3#', (dt * i).toFixed(3) + ' s').replace('#2#', 0).replace('#4#', '').replace('#5#', '');
        $timeContainer.append(tempate);
    }

    window.data = [];

    var $freeContainer = $('#freq-container');
    $freeContainer.html('');
    var tempate = $('#template').text();
    tempate = tempate.replace('#1#', 'f' + i).replace('#3#', '0 hz').replace('#2#', 0);

    for (i = 0; i < sample; i++) {



        var tempate = $('#template1').text();

        var center = sample - (sample % 2);
        center = center / 2;

        var classs = 'black';

        if (i == 0) {
            classs = 'green';
        }

        if (i == center && sample % 2 == 0) {
            classs = 'blue';
        }

        if ((i == center || i == center + 1) && sample % 2 != 0) {
            classs = 'blue';
        }

        var fbase = 2 * Math.PI / sample;
        var Fk = fbase * i;
        if (Fk > Math.PI) {
            Fk = Fk - 2 * Math.PI;
        }


        Fk = Fk / (2 * Math.PI);
        
        var hz = 1 / (Fk * time);
        if (i == 1) {
            window.max = hz;
        }
        if (Fk == 0)
            FkText = ' 0 Hz';
        else
            FkText = '  ' + hz.toFixed(2) + ' Hz'

        var freq = (1 / time) * i;
        tempate = tempate.replace('#1#', 'f' + i)
            .replace('#2#', 0)
            .replace('#3#', Fk)
            .replace('#4#', FkText + ' ' + Fk.toFixed(2))
            .replace('#5#', classs);
        $freeContainer.append(tempate);
        window.data.push({
            fk: Fk,
            hz: (Fk == 0 ? 0 : hz.toFixed(2)),
            color: classs,
            index: i
        });

    }


}


function xCoard(x) {
    return x + 20;
}

function x1(x) {
    return x + 350;
}

function y(y) {
    return 175 - y;
}