"use strict";

window.onload = function() {
//    print check
    var item = document.getElementsByClassName('menu-item');
    for (var i = 0; i < item.length; i++) {
        item[i].addEventListener('click', printCheck);
        item[i].addEventListener('touchstart', printCheck); 
    }
//    slider
    var images = document.querySelectorAll('.slide'),
        len = images.length,
        i = len-1;
    if ( len > 0){
        (function slide(){
            images[i].classList.remove('active');
            i = ++i % len;
            images[i].classList.add('active');
            window.setTimeout(slide, 2000);
        })()
    }
    
//    patient call
    if (document.getElementById('patient-call')){
        var btnCall = document.getElementById('patient-call');
        var btnCallRepeat = document.getElementById('patient-call-repeat');
        var btnCallNext = document.getElementById('patient-call-next');
        
//        btnCall.addEventListener('touchstart', function() {
//            var timerId = setInterval(function(){
//                btnCall.classList.toggle('green');
//            }, 500);
//            setTimeout(function() {
//                clearInterval(timerId);
//                btnCall.style.display = "none";
//                btnCallRepeat.style.display = "block";
//            }, 5000)
//        });
//        
//        btnCallRepeat.addEventListener('touchstart', function(){
//            var timerId = setInterval(function(){
//                btnCallRepeat.classList.toggle('green');
//            }, 500);
//            setTimeout(function() {
//                clearInterval(timerId);
//                btnCallRepeat.style.display = "none";
//                btnCallNext.style.display = "block";
//            }, 5000)
//        });
//        
//        btnCallNext.addEventListener('touchstart', function(){
//            btnCallNext.style.display = "none";
//            btnCall.style.display = "block";
//        });
        btnCall.addEventListener('touchstart', function() {
            btnCall.classList.add('call-active');
            btnCall.innerHTML = "Идёт вызов";
            setTimeout(function() {
                btnCall.classList.remove('call-active');
                btnCall.innerHTML = "Вызов пациента";
                btnCallNext.style.display = "block";
            }, 5000)
            
        });
        btnCallNext.addEventListener('touchstart', function(){
            btnCallNext.style.display = "none";
            btnCall.classList.add('call-active');
            btnCall.innerHTML = "Идёт вызов";
            setTimeout(function() {
                btnCall.classList.remove('call-active');
                btnCall.innerHTML = "Вызов пациента";
                btnCallNext.style.display = "block";
            }, 5000)
            
        });

    }

//    reception
    if(document.getElementById('start-reception') && document.getElementById('end-reception')){
        var btnStart = document.getElementById('start-reception');
        var btnEnd = document.getElementById('end-reception');
        var btnReceptionTimer = document.getElementById('reception-timer');
        btnStart.addEventListener('touchstart', function(){
            btnStart.style.display = "none";
            btnEnd.style.display = "block";
            btnReceptionTimer.style.display = "block";
            pauseBreak(btnReceptionTimer);
            document.getElementById('patient').classList.add('blocker');
            document.getElementById('break').classList.add('blocker');
            document.getElementById('nav').style.backgroundColor = '#80CDFF';

        });
        btnEnd.addEventListener('touchstart', function(){
            btnStart.style.display = "block";
            btnEnd.style.display = "none";
            btnReceptionTimer.style.display = "none";
            stopBreak(btnReceptionTimer);
            document.getElementById('patient').classList.remove('blocker'); document.getElementById('break').classList.remove('blocker');
            document.getElementById('nav').style.backgroundColor = '#E6F5FF';

        });
    }
    
//    break
    if(document.getElementById('start-break')){
        var btnBreakStart = document.getElementById('start-break');
        var btnBreakTimer = document.getElementById('break-timer');
        var btnBreakEnd = document.getElementById('end-break');
        btnBreakStart.addEventListener('touchstart', function(){
            btnBreakStart.style.display = "none";
            btnBreakEnd.style.display = "block";
            btnBreakTimer.style.display = "block";
            pauseBreak(btnBreakTimer);
            document.getElementById('patient').classList.add('blocker');
            document.getElementById('reception').classList.add('blocker');
            document.getElementById('ticket').classList.add('blocker');
            document.getElementById('nav').style.backgroundColor = '#A7C6E4';
            document.getElementById('ticket-all').style.display = "block";
            
        });
        btnBreakEnd.addEventListener('touchstart', function() {
            btnBreakEnd.style.display = "none";
            btnBreakStart.style.display = "block";
            btnBreakTimer.style.display = "none";
            stopBreak(btnBreakTimer);
            document.getElementById('patient').classList.remove('blocker'); document.getElementById('reception').classList.remove('blocker');
            document.getElementById('nav').style.backgroundColor = '#E6F5FF';
            document.getElementById('ticket').classList.remove('blocker');
            document.getElementById('ticket-all').style.display = "none";
            
        });
    }    
}

//    FUNCTIONS

//    clock
function startTime() {
    var tm = new Date();
    var h = tm.getHours();
    var m = tm.getMinutes();
    var s = tm.getSeconds();
    var date = tm.getDate();
    var month=new Array(12);
        month[0]="января";
        month[1]="февраля";
        month[2]="марта";
        month[3]="Апреля";
        month[4]="мая";
        month[5]="июня";
        month[6]="июля";
        month[7]="августа";
        month[8]="сентября";
        month[9]="октября";
        month[10]="ноября";
        month[11]="декабря";
    var m = checkTime(m);
    var s = checkTime(s);
    document.getElementById('clock').innerHTML = h+":"+m+":"+s;
    var t = setTimeout('startTime()', 500);
    document.getElementById('date').innerHTML = date + " " + month[tm.getMonth()];
}
function checkTime(i) {
    if (i<10)
    {
    i="0" + i;
    }
    return i;
}
function printCheck(){
    document.getElementById('print').style.display = "block";       
    setTimeout(function(){
                document.getElementById('print').style.display = "none";
    },3000)
}

//break timer
var base = 60; 
var clocktimer,dateObj,dh,dm,ds,ms; 
var readout=''; 
var h=1, m=1, tm=1,s=0,ts=0,ms=0,show=true, init=0, ii=0; 

function stopBreak(indicator) { 
	clearTimeout(clocktimer); 
	h=1;m=1;tm=1;s=0;ts=0;ms=0; 
	init=0;show=true; 
	readout='00:00:00'; 
	indicator.innerHTML = readout;
	ii = 0; 
}
function pauseBreak(indicator) { 
	if (init == 0) { 
        dateObj = new Date(); 
        startBreak(indicator); 
        init = 1; 
	} else {
        if(show == true) { 
            show = false;
	   } else { 
            show = true; 
        } 
    } 
} 

function startBreak(indicator) { 
	var cdateObj = new Date(); 
	var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000); 
	if (t>999) { s++; } 
	if (s>=(m*base)) { 
		ts=0; 
		m++; 
	} else { 
		ts=parseInt((ms/100)+s); 
		if(ts>=base) { ts=ts-((m-1)*base); } 
	} 
    
	if (m>(h*base)) { 
		tm=1; 
		h++; 
	} else { 
		tm=parseInt((ms/100)+m); 
		if(tm>=base) { tm=tm-((h-1)*base); } 
	} 
    
	if (ts>0) {
        ds = ts;
        if (ts<10) {
            ds = '0'+ts; 
        }
    } else { 
        ds = '00'; 
    } 
	dm = tm - 1; 
    
	if (dm > 0) {
        if (dm < 10) {
            dm = '0'+ dm; 
        }
    } else { 
        dm = '00'; 
    } 
	dh = h - 1; 
    
	if (dh>0) { 
        if (dh<10) { 
            dh = '0'+dh; 
        }
    } else { 
        dh = '00'; 
    } 
	readout = dh + ':' + dm + ':' + ds;
    indicator.innerHTML = readout;
	clocktimer = setTimeout(function() {
        startBreak(indicator);
    },1000); 
} 
        
