var PERIOD = 6;
var CENT_PER_SECOND = 0;

init();
function extractDomain(url) {
    var re = /:\/\/(www\.)?(.+?)\//;
        return url.match(re)[2];
}
function isTimewaster(url) {
    var i, timewaster = JSON.parse(localStorage.timewasters);
    for (i = 0; i < timewaster.length; i++) {
        if (url.match(timewaster[i])) {
            return true;
        }
    }
    return false;
}
function init(){
    var storage = {};


    if(!localStorage.timewasters){
        localStorage.timewasters = JSON.stringify(['facebook.com', 'plus.google.com']);
    }
    if(!localStorage.rate){
        localStorage.rate = 10;
    }
    calculateCentPerSecond();
    if(!localStorage.currency){
        localStorage.currency = '$';
    }
    if(!localStorage.denomination){
        localStorage.denomination = '¢';
    }

}
function createTodayIndex() {
    var now, day, month, today;

    now   = new Date();
    day   = now.getDate();
    month = now.getMonth();
    today = day+'_'+month;

    return today;
}
function addTimeSpent(){
    var datas, today, tillNow;
    // Only count time if Chrome has focus
    chrome.windows.getLastFocused(function (window) {
        if (window === undefined) {
            return;
        }
        if (window.focused) {
            // Only count time if system has not been idle for 30 seconds
            chrome.idle.queryState(30, function (state) {
                if (state === "active") {
                    // Select single active tab from focused window
                    chrome.tabs.query({ 'lastFocusedWindow': true, 'active': true }, function (tabs) {
                        if (tabs.length === 0) {
                            return false;
                        }
                        var tab = tabs[0];
                        var website = extractDomain(tab.url);
                        chrome.pageAction.show(tab.id);
                        if (!isTimewaster(website)) {
                            return false;
                        } else {

                            today = createTodayIndex();
                            if(!localStorage[website] ){
                                datas = {};
                                datas[today] = PERIOD;
                                datas[0] = PERIOD;
                                localStorage[website] = JSON.stringify(datas);

                            } else {

                                datas = JSON.parse(localStorage[website]);
                                if(!datas[today]){
                                    datas[today] = PERIOD;
                                    tillNow = datas[0];
                                    datas[0] =  parseInt(tillNow, 0) + parseInt(PERIOD, 0);

                                } else {
                                    tillNow = datas[today];
                                    datas[today] =  parseInt(tillNow, 0) + parseInt(PERIOD, 0);
                                    tillNow = datas[0];
                                    datas[0] =  parseInt(tillNow, 0) + parseInt(PERIOD, 0);

                                }
                                localStorage[website] = JSON.stringify(datas);
                            }

                            createBadge(tab.id, website);
                        }
                    });
                }
            });
        }
    });
}
function calculateTotalTimeWastedToday(website){
    var i, amt, todayArr, total = 0;

    todayArr = getSumWastedToday();

    for (i = 0, l = todayArr.length; i < l; i ++) {
        if(todayArr[i][0] === website){
            amt = calculateWaste(todayArr[i][1]);
        }
        if(amt[1] == localStorage.denomination){
            amt[0] = amt[0]/100;
        }
        total = parseFloat(amt[0]);
    }

    return total;
}
function getSumWastedToday() {
    var today, todayArr = [], timewasterArr;
    today = createTodayIndex();
    timewasterArr = JSON.parse(localStorage.timewasters);
    for (var i = 0, l = timewasterArr.length; i < l; i ++) {
        var timew = timewasterArr[i];
        var data = {};
        if(localStorage[timew]){
            timewaster = JSON.parse(localStorage[timew]);
            data =  [timew, timewaster[today]];
            todayArr.push(data);
        }
    }

    return todayArr;

}
function calculateCentPerSecond(){
    CENT_PER_SECOND = (localStorage.rate * 100) / 3600;
}
function createCanvas(amt) {
    var canvas, context, imageData, dailyText, x = 1;

    canvas = document.createElement('canvas');
    canvas.setAttribute('id','canvas');
    canvas.style.width = '19px';
    canvas.style.height = '13px';
    canvas.style.display = 'none';

    document.body.appendChild(canvas);


    context = canvas.getContext('2d');

    /*context.strokeStyle = "#000";
      context.strokeRect(0,  0, 19, 13);*/


    context.fillStyle = "#8c9566";
    context.fillRect(0, 0, 19, 15);


    context.fillStyle = "#fff";
    context.font = "9px Helvetica";




    context.fillText(amt, 0, 10);

    imageData = context.getImageData(0, 0, 19, 13);

    return imageData;
}
function calculateWaste(seconds){
    var amt, rate, currency = localStorage.currency;
    amt = seconds * CENT_PER_SECOND;

    if(amt < 1){
        return 'NA';
    }
    if(amt < 100){
        currency = localStorage.denomination;
    } else {
        amt = amt / 100;
    }
    return [amt.toFixed(2), currency];
}

function createBadge(tabId, website){
    var icon, amt = calculateTotalTimeWastedToday(website);


    if(amt > 0.1) {
        icon = createCanvas(amt);
        console.log(icon);
        chrome.pageAction.setIcon({
            tabId: tabId,
            imageData: icon
        });
    } else {
        chrome.pageAction.setIcon({tabId: tabId, path: 'images/icon-19.png'});
    }
}
setInterval(addTimeSpent, 1000*PERIOD);

