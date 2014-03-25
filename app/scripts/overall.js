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
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('overall_div'));
    chart.draw(data, options);
}

function prepareGraphArray(){
    var arr = [ ['Website', 'Total', {role: 'style'}] ],
    website,
    timewaster = JSON.parse(localStorage.timewasters);

    for (i = 0; i < timewaster.length; i++) {
        website = JSON.parse(localStorage[timewaster[i]])
        arr.push([timewaster[i], website[0], 'color: #b5cc5e']);
    }

    return arr;
}


