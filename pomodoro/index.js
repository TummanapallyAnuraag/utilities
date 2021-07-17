var intervalHandler = setInterval(one_sec_timer, 1000);
var audio = new Audio('3sclaps.mp3');
var seconds = 0;

function start_pomodoro(){
    clearInterval(intervalHandler);

    var time = jQuery("#time").val();
    console.log(time + " minutes");
    seconds = time*60;

    display_time(seconds);

    intervalHandler = setInterval(one_sec_timer, 1000);

    setTimeout(function(){
        clearInterval(intervalHandler);
    }, time*60*1000);
}

function stop_pomodoro(){
    clearInterval(intervalHandler);
    seconds = 0;
    display_time(seconds);
}

function one_sec_timer(){
    if(seconds > 0){
        seconds--; 
        display_time(seconds);
        if(seconds == 0){
            audio.play();
        }else if(seconds <= 60){
            jQuery("#pomodoro").addClass("critical");
        }else{
            jQuery("#pomodoro").removeClass("critical");
        }
    }else{
        seconds = 0;
    }
}

function display_time(val){
    var temp_h, temp_m, temp_s;
    temp_h = ("0" + parseInt(val/60/60)).slice(-2);
    temp_m = ("0" + parseInt(val/60 - temp_h*60)).slice(-2);
    temp_s = ("0" + parseInt(val - temp_h*60*60 -temp_m*60)).slice(-2);

    jQuery(".pomodoro-h").html(temp_h);
    jQuery(".pomodoro-m").html(temp_m);
    jQuery(".pomodoro-s").html(temp_s);

    console.log(temp_h + ":" + temp_m + ":" + temp_s);
}

function add_ten_min(){
    seconds += 60*10;
}