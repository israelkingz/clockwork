let timerObj = {
    minutes:0,
    seconds:0,
    timerId: 0 //start or pause the timer
}

function soundalarm() {
    let amount= 3; // amount is the numbers of time the alaram plays
    let audio = new Audio("Timer_Sound_Effect.mp3");  
    audio.play();

    function playsound(){
    
        for(let i =0; i<amount; i++){
            setTimeout(playsound, 1200 * i);
        }
    }
}

function updateValue(key, value) {
    if(value<0) {
        value = 0;
        console.log("Positive numbers only");
    }
    if(key=="seconds") {
        if(value < 10) {
            value = "0" + value;
        } 
        if(value >59) {
        value = 59;
        }
    }

    $("#" + key).html(value || 0);
    timerObj[key] = value;
   }
(function detectchanges(key){
    console.log("Detect Changes");
    let input = "#" + key + "-input";

    $(input).change(function(){
        updateValue(key, $(input).val());
    });

    $(input).keyup(function(){
        updateValue(key, $(input).val());
        });
        return arguments.callee;
})("minutes")("seconds");

function startimer() {
buttonmgt(["start", false], ["pause", true], ["stop", true]); 
freezeinput();

timerObj.timerId = setInterval(function(){
    timerObj.seconds--;
    if(timerObj.seconds<0){
        if(timerObj.minutes== 0) {
            soundalarm();
            return stoptimer();
        }
   timerObj.seconds =59;
   timerObj.minutes--;
    }
    updateValue("minutes", timerObj.minutes);
    updateValue("seconds", timerObj.seconds);
    
}, 1000);
}

function stoptimer() {
    clearInterval(timerObj.timerId);
    buttonmgt(["start", true], ["pause", false], ["stop", false]);
    unfreezeinput();
    //updateValue("Minutes",$("minutes-input").val());
    //updateValue("Seconds",$("seconds-input").val());
    
}


function pausetimer() {
    buttonmgt(["start", true], ["pause",false], ["stop", true]);
    clearInterval(timerObj.timerId);
    
}
//... rest operator to pass every arguments to the function
function buttonmgt(...buttonsArray) {
    for(let i=0; i<buttonsArray.length; i++) {
        let button = "#" + buttonsArray[i][0] + "-button";
    if (buttonsArray[i][1]) {
$(button).removeAttr("disabled");
    } else {
        $(button).attr("disabled", "disabled");        
    }
    }
}
buttonmgt(12,56,90,2345);


function freezeinput() {
    $("minutes-input").attr("disabled", "disabled");
    $("seconds-input").attr("disabled", "disabled");
    
}

function unfreezeinput() {
    $("minutes-input").removeAttr("disabled", "disabled");
    $("seconds-input").removeAttr("disabled", "disabled");
    
}