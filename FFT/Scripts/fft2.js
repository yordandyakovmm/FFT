
var tData = [];
var fData = [];

var fFilterData = [];
var tCompresData = [];

var x, y;
var count = 0;
var max = 0;
var min = 100000;


var cTime = document.getElementById('ctime');
var cFft = document.getElementById('cfft');
cTime.width = cTime.width;
cFft.width = cFft.width;
var ctx = cTime.getContext('2d');

isDrawing = false;
ctx.strokeStyle = 0;
ctx.lineWidth = 0.5;
ctx.lineJoin = 'round';
ctx.strokeStyle = '#000000';
ctx.shadowColor = '#000000';
ctx.shadowBlur = 1;

cTime.onmousedown = onmousedown;
cTime.onmouseup = onmouseup;
cTime.onmousemove = onmousemove;


function filter(obj) {
    min = parseFloat($(obj).val());
    drawFFT(true);

}


function drawCompress() {
    $.ajax({
        type: "POST",
        url: '/fftC1',
        data: { json: fFilterData },
        success: function (data) {
            tCompresData = data;
            draw();
            return;
        }

    });
}

function draw()
{
    ctx.beginPath();
    ctx.moveTo(tCompresData[0].Re, tCompresData[0].Im);
    ctx.strokeStyle = 'red';
    ctx.shadowColor = 'red';
    for (var i = 1; i < tCompresData.length; i++)
    {
        ctx.lineTo(tCompresData[i].Re, tCompresData[i].Im);
        ctx.stroke();
    }
}

function onmousedown(e) {
    e.preventDefault();
    tData = [];
    cTime.width = cTime.width;
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
    tData.push({
        Re: x,
        Im: y
    });
    ctx.moveTo(x, y);

};

function onmousemove(e) {
    e.preventDefault();
    if (isDrawing) {
        var newX = e.offsetX;
        var newY = e.offsetY;
        tData.push({
            Re: newX,
            Im: newY
        });
        ctx.moveTo(x, y);
        ctx.lineTo(newX, newY);
        x = newX;
        y = newY;
        ctx.stroke();
    }

};

function onmouseup(e) {
    x = y = null
    isDrawing = false;
    e.stopPropagation();
    fft();
};


function drawFFT(flagFilter) {
    count = fData.length;
    filterCount = 0;
    step = 700 / count;
    cFft.width = cFft.width;
    var ctx = cFft.getContext('2d');

    if (!flagFilter) {

        max = 0;
        min = 100000;
        for (var i = 0; i < count; i++) {
            if (fData[i].Magnitude > max) {
                max = fData[i].Magnitude;
            }
            if (fData[i].Magnitude < min) {
                min = fData[i].Magnitude;
            }
        }
    }
    else {
        fFilterData = [];
    }

    for (var i = 0; i < count; i++) {
        ctx.beginPath();
        ctx.lineWidth = "1";
        if (!flagFilter) {
            ctx.strokeStyle = "red";
        }
        else {
            if (fData[i].Magnitude < (min - 0.00001) ) {
                ctx.strokeStyle = "blue";
                fFilterData.push({
                    Re: 0,
                    Im: 0
                });
            }
            else {
                filterCount++;
                ctx.strokeStyle = "red";
                fFilterData.push({
                    Re: fData[i].Re,
                    Im: fData[i].Im
                });
            }
        }

        var val = 340 / max * fData[i].Magnitude;
        ctx.rect(i * step + 2, 350 - val, step - 4, 340 / max * fData[i].Magnitude);
        ctx.stroke();
    }

    if (!flagFilter) {

        $("#rangeA").attr('min', min);
        $("#rangeA").attr('max', max / 5);
        $("#rangeA").attr('step', 0.5);
        $("#rangeA").val(min);
    }
    else {
        $('#lcom').text('compress:   ' + (filterCount / count * 100).toFixed(2));
    }
    $('#lmin').text('min:     ' + min.toFixed(2));
    $('#lmax').text('max:     ' + max.toFixed(2));

}


function fft() {
    $.ajax({
        type: "POST",
        url: '/fftC',
        data: { json: tData },
        success: function (data) {
            fData = data;
            drawFFT();
            return;
        }
    });
}


function fft1() {




}
