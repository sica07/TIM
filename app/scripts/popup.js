'use strict';
var bg = chrome.extension.getBackgroundPage();
document.onreadystatechange = function () {
    bg.calculateCentPerSecond();
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

            amt = bg.calculateWaste(todayArr[i][1]);
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
                    total = (total*100).toFixed(2)+' <b>'+localStorage.denomination+'</b>';
                } else {
                    total = (total).toFixed(2)+' <b>'+localStorage.currency+'</b>';
                }
                row += '<tr class="border-top">';
                row += '<td><b>TOTAL </b></td>';
                row += '<td>'+total+'</td>';
                row += '</tr>';

            }
            html += row;
        }
    } else {
        html ='<tr class="border-bottom"><th>Congrats!</th> <th>No money wasted till now!</th></tr>';

    }
    document.getElementById('today_table').innerHTML = html;
}


