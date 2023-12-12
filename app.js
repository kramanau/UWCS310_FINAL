let mouseDown = false;
let currentStroke = 0;
const canvas = $('#canvas');
$("#start").toggleClass("hidden");
$("#rGroup").toggleClass("invalid");
$("#gGroup").toggleClass("invalid");
$("#bGroup").toggleClass("invalid");

const offsetX = 0;
const offsetY = 75; //height of painttools bar

canvas.attr('width', `${window.innerWidth}`);
canvas.attr('height', `${window.innerHeight - 75}`);

const userBrush = new Brush(canvas, offsetX, offsetY);

function drawLine(x1, y1){
    const stroke = $(`#stroke${currentStroke}`)
    if (stroke.length == 0){
        userBrush.createPolyline(x1, y1, currentStroke);
    } else {
        userBrush.paintPoint(x1, y1, stroke);
    }
}

function validateRGB(){
    let isValid = true;
    const R = $('#rInput').val();
    const G = $('#gInput').val();
    const B = $('#bInput').val();
    const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(!pattern.test(R)){
        isValid = false;
        if(!$("#rGroup").attr("class").includes("invalid")){
            $("#rGroup").toggleClass("invalid");
        }
    } else{
        if($("#rGroup").attr("class").includes("invalid")){
            $("#rGroup").toggleClass("invalid");
        }
    }

    if(!pattern.test(G)){
        isValid = false;
        if(!$("#gGroup").attr("class").includes("invalid")){
            $("#gGroup").toggleClass("invalid");
        }
    } else {
        if($("#gGroup").attr("class").includes("invalid")){
            $("#gGroup").toggleClass("invalid");
        }
    }

    if(!pattern.test(B)){
        isValid = false;
        if(!$("#bGroup").attr("class").includes("invalid")){
            $("#bGroup").toggleClass("invalid");
        } 
    } else {
        if($("#bGroup").attr("class").includes("invalid")){
            $("#bGroup").toggleClass("invalid");
        }
    }

    if(isValid){
        userBrush.updateColor(R,G,B);
    }
}

function startTimer(){
    $("#start").toggleClass("hidden");
    $("#timer").toggleClass("hidden");
    const interval = setInterval(()=>{
        const seconds = parseInt($("#timer").text().split(':')[1]);
        const newSeconds = seconds - 1;
        $("#timer").text(':'+String(newSeconds).padStart(2,'0'));
        if (newSeconds === 0){
            clearInterval(interval);
        }
    }, 1000);
}

$(document).ready(function(){
    $("#setcolor").on('click', validateRGB);
    $("#clear").on('click', () => canvas.empty());

    $("#start").on('click', startTimer);
    
    $('body').mousedown(function(e){
        currentStroke += 1;
        mouseDown = true;
    })

    $('body').mouseup(function(e){
        mouseDown = false;
    })

    $('body').mousemove(function(e){
        if (mouseDown){
            drawLine(e.pageX, e.pageY);
        }
    })
})