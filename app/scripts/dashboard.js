google.load("visualization", "1.0", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
var timewasters = JSON.parse(localStorage.timewasters);
    var data, legend= [],
    arr = [];
    arr = prepareGraphArray(timewasters);
    data = google.visualization.arrayToDataTable(arr);

    var options = {
        width: 600,
        height: 400,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        colors : ["#b5cc5e", "#c45a73", "#6b4890", "#6f851f", "#8c995b", "#7bba56",  "#d5cd62", "#96458a", "#6f851f", "#d7e6a1", "#96458a", "#d2e689"],
        isStacked: true,
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
var formatter = new google.visualization.ColorFormat();
formatter.addRange(0, 500, "#b5cc5e", "#6f851f");
    chart.draw(data, options);
}
function calculateTimeWasted(timewasters) {
        var website, websites, date, amt, v, key, days = [];
    for (var i = 0, l = timewasters.length; i < l; i ++) {
        websites = timewasters[i];
        website = JSON.parse(localStorage[websites]);
        days[websites] = [];
        for (key in website) {
            if(key != 0){
                v = website[key];
                amt = v * (localStorage.rate) / 3600;
                amt = parseFloat(amt).toFixed(2);
                days[websites][key] = amt;
            }
        }
    }
    return days;
}
function prepareGraphArray(timewasters){
    var dates = [],
        arr = [],
        legend = [],
        colorArr = [],
        color, data, website, key, day, days, date, dateStr;


    arr[0] = legend.concat('Website', timewasters, { role: 'annotation' });
    data = calculateTimeWasted(timewasters);
    days = JSON.parse(localStorage.days);

    for(date in days){
        dateStr = prepareDate(days[date]);
        dates[dateStr] = [];
        for (var i = 0, l = timewasters.length; i < l; i ++) {
            if(data[timewasters[i]]){
                website = data[timewasters[i]];
                    if(!website[days[date]]){
                        website[days[date]] = 0;
                    }

                    dates[dateStr].push(parseFloat(website[days[date]]));
            }
        }
            var temp1 = [], temp2 =[];
            temp2 = temp1.concat(dateStr, dates[dateStr], localStorage.currency);
            arr.push(temp2);
    }

    return arr;
}
function prepareDate(date){
        var dateStr, month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        dateStr = date.split('_');
        dateStr = dateStr[0] + ' ' + month[dateStr[1]];

        return dateStr;
}


