$( document ).ready(function() {
    let pageExecute = {

        ls:"Null",
        tns:"Null",
        symbols: "Null",

        init: function () {
            $.ajax({
                url: "l2.txt",
                async: false,
                success: function (data){
                    pageExecute.ls = data;
                }
            });
            $.ajax({
                url: "tns.txt",
                async: false,
                success: function (data){
                    pageExecute.tns = data;
                }
            });
            $.ajax({
                url: "symbols.txt",
                async: false,
                success: function (data){
                    pageExecute.symbols = data;
                }
            });
        }
    };

    pageExecute.init();



    // l2.txt parsing


    let l2 = pageExecute.ls
        .replace(/\n/ig, '')
        .split('\r');

    let space = String.fromCharCode(9);

    for (let i = 0 ; i<l2.length ; i++){
        if(l2[i].includes(space)){
            l2[i] = l2[i].split(space);
        }
    }

    let asks = l2.slice(l2.indexOf("Asks:")+1, l2.indexOf(""));
    let bids = l2.slice(l2.indexOf("Bids:")+1, l2.length);

    for (let i = 0 ; i < asks.length ; i++){
        $('div#asks .table').append(
           ` <div class="row">
                <span class="cell">${asks[i][0]}</span>
                <span class="cell">${asks[i][1]}</span>
            </div>`
        );
    }

    for (let i = 0 ; i < bids.length ; i++){
        $('div#bids .table').append(
            ` <div class="row">
                <span class="cell">${bids[i][0]}</span>
                <span class="cell">${bids[i][1]}</span>
            </div>`
        );
    }

    //  tns.txt parsing

    let tns = pageExecute.tns
        .replace(/\n/ig, '')
        .split('\r');

    for (let i = 0 ; i<tns.length ; i++){
        if(tns[i].includes(space)){
            tns[i] = tns[i].split(space);
        }
    }

    for (let i = 0 ; i<tns.length ; i++){
        if(typeof tns[i] === 'string'){
            $('div#tns .table').append(
            ` <div class="row">
                <span class="cell">${tns[i]}</span>
            </div>`
            );
        } else {
            $('div#tns .table').append(
                ` <div class="row">
                <span class="cell">${tns[i][0]}</span>
                <span class="cell">${tns[i][1]}</span>
                <span class="cell">${tns[i][2]}</span>
            </div>`);
        }
    }

    $('div#last .table').html(
        ` <div class="row">
                <span class="cell">Последняя сделка:</span>
                <span class="cell">${tns[length][0]}</span>
                <span class="cell">${tns[length][1]}</span>
                <span class="cell">${tns[length][2]}</span>
            </div>`)


    //  symbols.txt parsing

    let symbols = pageExecute.symbols
        .split(';');

    for (let i = 0 ; i < symbols.length ; i++){
        $('div#top-panel .switch .checkbox select').append(
            ` <option value="${symbols[i]}">${symbols[i]}</option>`
        );
    }



    console.log(symbols)
});
