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
    document.getElementById("save_message").style.visibility = "visible";
    setTimeout(function(){
        document.getElementById("save_message").style.visibility = "hidden";
    }, 3000);

}

function saveSitesList(lines) {
    var url, line, datas, texts = [];
    for (var i=0; i < lines.length; i++) {
        // only push this line if it contains a non whitespace character.
        line = lines[i];
        if (/\S/.test(line)) {
            url = line.trim();
            texts.push(url);
            if(!localStorage.hasOwnProperty(url)){
                datas = {};
                datas[0] = 0;
                localStorage[url] = JSON.stringify(datas);
            }
        }
    }

    localStorage.timewasters = JSON.stringify(texts);
}
