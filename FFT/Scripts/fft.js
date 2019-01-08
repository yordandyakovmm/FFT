
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
    ctx.moveTo(xCalck(0), yCalck(0));
    ctx.lineTo(xCalck(660), yCalck(0));
    ctx.stroke();

    for (i = 0; i <= sample; i++) {

        ctx.beginPath();
        ctx.moveTo(xCalck(660 / sample * i), yCalck(10));
        ctx.lineTo(xCalck(660 / sample * i), yCalck(-10));
        ctx.stroke();
        ctx.font = "11px Arial";
        ctx.fillText((ttime / sample * i).toFixed(2), xCalck(660 / sample * i - 10), yCalck(-25));

    }

    for (i = 0; i < sample; i++) {
        ctx.beginPath();
        ctx.arc(xCalck(660 / sample * i), yCalck(time[i].real * 20), 5, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
    }

    // fft

    var ftx = cFft.getContext('2d');
    ftx.beginPath();
    ftx.moveTo(xCalck(0), yCalck(0));
    ftx.lineTo(xCalck(660), yCalck(0));
    ftx.stroke();




    var N = window.data.length;
    var Nmax = (N - (N % 2)) / 2;
    var even = true;

    if (N % 2 == 1) {
        even = false;
    }

    $('#freq-container').find('input[type=text]').each(function (index) {
        console.log('index: ' + index);

        drawFFT(index, N, Nmax, even, ftx, data, parseInt($(this).attr('hz')));
    });


}


function drawFFT(index, N, Nmax, even, ftx, data, hz) {
    var max = 660 / window.data.length;
    var fft = data.fft;
     var color = window.data[index].color;
    var ind = window.data[index].index;
        
    var xx = max * hz;
    var ttime = parseInt($('#time').val());
    var hxText = (hz / ttime).toFixed(2);
    ftx.fillStyle = 'black';
    ftx.beginPath();
    ftx.moveTo(xCalck1(xx), yCalck(10));
    ftx.lineTo(xCalck1(xx), yCalck(-10));
    ftx.stroke();

    ftx.fillStyle = color;
    ftx.font = "11px Arial";
    ftx.fillText(hxText, xCalck1(xx - 5), yCalck(-25));
    ftx.beginPath();
    ftx.arc(xCalck1(xx), yCalck(fft[ind].real * 20), 5, 0, 2 * Math.PI, false);
    ftx.fillStyle = 'red';
    ftx.fill();

    // add simetric blue point
    if (even && index == N / 2) {
        var xx = max * -1 * index;
        ftx.fillStyle = 'black';
        ftx.beginPath();
        ftx.moveTo(xCalck1(xx), yCalck(10));
        ftx.lineTo(xCalck1(xx), yCalck(-10));
        ftx.stroke();

        ftx.fillStyle = color;
        ftx.font = "11px Arial";
        ftx.fillText(hxText, xCalck1(xx - 5), yCalck(-25));
        ftx.beginPath();
        ftx.arc(xCalck1(xx), yCalck(fft[ind].real * 20), 5, 0, 2 * Math.PI, false);
        ftx.fillStyle = 'red';
        ftx.fill();
    }

}


function fft1() {

    var data = [];
    $('#freq-container').find('input[type=text]').each(function (index) {
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
                $i.val(data.time[i].real.toFixed(3) + (Math.abs(data.time[i].imag) < 0.001 ? '' : (data.time[i].imag > 0 ? '+' + data.time[i].imag.toFixed(3) : data.fft[i].imag.toFixed(3)) + 'i'));
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

        var hz = i / time;
        var hzHole = i;

        var Fk = fbase * i;
        if (Fk > Math.PI) {
            Fk = Fk - 2 * Math.PI;
            hz = (i - sample) / time;
            hzHole = (i - sample)
        }

        Fk = Fk / (2 * Math.PI);
        FkText = Fk.toFixed(2);
        var HZ = ' 0 Hz';
        if (i == 1) {
            window.max = hz;
        }
        if (Fk == 0)
            FkText = ' 0 Hz';
        else
            FkText += '  ' + hz.toFixed(2) + ' Hz';
            HZ = hz.toFixed(2) + ' Hz';

        var freq = i;
        tempate = tempate.replace('#1#', 'f' + i)
            .replace('#3#', freq.toFixed(2) + ' hz')
            .replace('#2#', 0)
            .replace('#4#', FkText)
            .replace('#5#', classs)
            .replace('#8#', Fk)
            .replace('#9#', HZ)
            .replace('#11#', hzHole)
        $freeContainer.append(tempate);
        window.data.push({
            fk: Fk,
            hz: (Fk == 0 ? 0 : hz.toFixed(2)),
            color: classs,
            index: i
        });

    }


}


function xCalck(x) {
    return x + 20;
}

function xCalck1(x) {
    return x + 350;
}

function yCalck(y) {
    return 175 - y;
}