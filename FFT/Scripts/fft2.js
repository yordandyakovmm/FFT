
var tData = [];
var fData = [];

var fFilterData = [];

var tCompresData = [];

var x, y;
var count = 0;
var max = 0;

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


function drawFFT()
{
    count = fData.length;

    step = 700 / count;
    cFft.width = cFft.width;
    var ctx = cFft.getContext('2d');
    max = 0; 
    for (var i = 0; i < count; i++) {
        if (fData[i].Magnitude > max)
        {
            max = fData[i].Magnitude;
        }
    }

    for (var i = 0; i < count; i++)
    {
        ctx.beginPath();
        ctx.lineWidth = "1";
        ctx.strokeStyle = "red";
        var val = 340 / max * fData[i].Magnitude;
        ctx.rect(i * step + 2 , 350 - val , step - 4, 340  / max  * fData[i].Magnitude);
        ctx.stroke();
    }

}


function fft() {
    $.ajax({
        type: "POST",
        url: '/fftC',
        data: { json: tData },
        success: function (data) {
            tCompresData = data;
            drawCompres();
            return;
        }
    });
}


function fft1() {


    
    $.ajax({
        type: "POST",
        url: '/fftC1',
        data: { json: fFilterData },
        success: function (data) {
            globalData = data;
            

            draw(data);
            return;
        }

    });
}
