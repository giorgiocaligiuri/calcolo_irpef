
const validateNumber = function (number) {
    //check if null or empty
    if (number === "" || number === null) {
        return false;
    }

    //check if number
    if (isNaN(number)) {
        return false;
    }

    return true;
}

const calcolaNettoDaImponibile = function (imponibile) {
    const scaglioni = [ 15000, 28000, 50000];
    const aliquote = [ 23, 25, 35, 43];
    
    let totaleTasse = 0;
    let imponibile_rimanente = imponibile;
    let i = 0;
    while (imponibile_rimanente > 0) {
        const scaglione = scaglioni[i];
        const aliquota = aliquote[i];
        const imponibile_scaglione = Math.min(imponibile_rimanente, scaglione);
        const tassa_scaglione = imponibile_scaglione * aliquota / 100;
        totaleTasse += tassa_scaglione;
        imponibile_rimanente -= imponibile_scaglione;
        i++;
    }

    return imponibile - totaleTasse;
}

const btn_calcola_click_eventHandeler = function () {
    //get value from input with id "txt_imponibile"
    const input_text = document.getElementById("txt_imponibile").value;

    //validate input
    if (!validateNumber(input_text)) {
        alert("Inserisci un numero");
        return;
    }

    //convert input to number
    const imponibile = Number(input_text);

    //calculate tax
    const netto = calcolaNettoDaImponibile(imponibile);

    //show result
    document.getElementById("stipendio_netto_no_tred").innerHTML = `stipendio netto (no tredicesiama) :${netto / 12} € al meese`
    document.getElementById("stipendio_netto_tred").innerHTML = `stipendio netto (con tredicesima) :$ {netto / 13} € al meese`

};


//add listener to button click, button with id "btn_calcola"
document.getElementById("btn_calcola").addEventListener("click", btn_calcola_click_eventHandeler);

