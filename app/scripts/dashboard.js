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
        isStacked: true,
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
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
        data, website, key, day, days, date, dateStr;


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


