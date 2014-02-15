var PERIOD = 6;
var CENT_PER_SECOND = 0;
init();

function notify($msg){
    console.warn($msg);
    /*chrome.tabs.create({
url: 'options.html'
}, function(tab){
console.log(tab);
    //var theCode ='<script>       var notify = document.getElementById("notify"); notify.style.display = "block"; setTimeout(function(){ notify.style.display = "none"; }, 3000);</script>';
    tab.executeScript(tab.index, theCode);
    }
    );*/

}

function extractDomain(url) {
    var re = /:\/\/(www\.)?(.+?)\//;
        return url.match(re)[2];
}


function isTimewaster(url) {
    var i, timewaster = JSON.parse(localStorage.timewasters);
    for (i = 0; i < timewaster.length; i++) {
        console.log(url.match(timewaster[i]));
        if (url.match(timewaster[i])) {
            console.log('da');
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
    CENT_PER_SECOND = (localStorage.rate * 100) / 3600;
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
                        }
                    });
                }
            });
        }
    });
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

setInterval(addTimeSpent, 1000*PERIOD);

