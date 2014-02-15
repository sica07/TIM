'use strict';
var bg = chrome.extension.getBackgroundPage();
document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        showTodayStatistics();
    }
}
function showTodayStatistics(){
    var row, todayArr, html, amt, total = 0;

    todayArr = bg.getSumWastedToday();
    if(todayArr.length > 0){
    html = ' <tr class="border-bottom"> <th>website</th> <th>wasted</th> </tr>';
    for (var i = 0, l = todayArr.length; i < l; i ++) {

        amt = calculateWaste(todayArr[i][1]);
        row = '<tr>';
        row += '<td>'+todayArr[i][0]+'</td>';
        row += '<td>'+amt[0]+' '+amt[1]+'</td>';
        row += '</tr>';
        if(amt[1] == localStorage.denomination){
            amt[0] = amt[0]/100;
        }

        total += parseFloat(amt[0]);
        if(i == l-1) {
            if(total < 1){
                console.log(total);
                total = total*100 +' <b>'+localStorage.denomination+'</b>';
                console.log(total);
            } else {
                console.log(total);
                total = total+' <b>'+localStorage.currency+'</b>';
                console.log(total);
            }
            row += '<tr class="border-top">';
            row += '<td><b>TOTAL </b></td>';
            row += '<td>'+total+'</td>';
            row += '</tr>';

        }
        html += row;
    }
    } else {
        html ='<tr><th>no data</th> <th>yet</th></tr>';

    }
    document.getElementById('today_table').innerHTML = html;
}
function calculateWaste(seconds){
    var amt, rate, currency = localStorage.currency;
    amt = seconds * bg.CENT_PER_SECOND;
    console.log(amt)

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

