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
    total = 0,
    color,
    colors = ["#8bc34a", "#009688", "#3f51b5", "#7c4dff", "#ff9800", "#ff5252",  "#795548", "#ff4081", "#cddc39", "#ff5722", "#03a9f4", "#ffeb3b"],
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
        total += parseFloat(amt);



        arr.push([timewaster[i], parseFloat(amt), amt+localStorage.currency, color]);
    }

        if(total < 1){
            total = (total*100).toFixed(0)+' '+localStorage.denomination;
        } else {
            total = (total).toFixed(1)+' '+localStorage.currency;
        }
        document.getElementById("total").innerHTML = total;

    return arr;
}


