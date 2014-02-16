'use strict';
document.onreadystatechange = function () {
    if (document.readyState == "complete") {

        document.getElementById('timewasters').value = JSON.parse(localStorage.timewasters).join("\n");
        document.getElementById('rate').value = localStorage.rate;
        document.getElementById('currency').value = localStorage.currency;
        document.getElementById('denomination').value = localStorage.denomination;
        document.getElementById('save').addEventListener('click', function(event){
            save();
        })
        var rateElem =document.getElementById("rate");
        if(localStorage.rate){
            rateElem.value = localStorage.rate;
        } else {
            rateElem.value = '';

        }
    }


}

function save(){
    var rate, lines, currency, denomination;

    rate = document.getElementById("rate").value;
    currency = document.getElementById("currency").value;
    denomination = document.getElementById("denomination").value;
    lines = document.getElementById('timewasters').value;
    lines = lines.split(/\n/);

    localStorage.rate = rate;
    localStorage.denomination = denomination;
    localStorage.currency = currency;
    saveSitesList(lines);

}

function saveSitesList(lines) {
    var line, texts = [];
    for (var i=0; i < lines.length; i++) {
        // only push this line if it contains a non whitespace character.
        line = lines[i];
        if (/\S/.test(line)) {
            texts.push(line.trim());
        }
    }
    console.log(texts)

    localStorage.timewasters = JSON.stringify(texts);
}
