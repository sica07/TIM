google.load("visualization", "1.0", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
    var data, legend= [],
    arr = [];
    arr = prepareGraphArray();
    data = google.visualization.arrayToDataTable(arr);

    var options = {
        width: 600,
        height: 400,
        bar: { groupWidth: '75%' },
        legend: { position: 'none'},
        isStacked: true,
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('overall_div'));
    chart.draw(data, options);
}

function prepareGraphArray(){
    var arr = [ ['Website', 'Total', {role: 'annotation'},{role: 'style'}] ],
    website,
    amt,
    color,
    colors = ["#b5cc5e", "#c45a73", "#6b4890", "#6f851f", "#8c995b", "#7bba56",  "#d5cd62", "#96458a", "#6f851f", "#d7e6a1", "#96458a", "#d2e689"],
    timewaster = JSON.parse(localStorage.timewasters);

    for (i = 0; i < timewaster.length; i++) {
        website = JSON.parse(localStorage[timewaster[i]])
        if(colors[i]){
            color = 'color: '+colors[i];
        } else {
            color = 'color: #ccc';
        }

        amt = website[0] * (localStorage.rate) / 3600;
        amt = amt.toFixed(2);

        arr.push([timewaster[i], parseFloat(amt), amt+localStorage.currency, color]);
    }

    return arr;
}


