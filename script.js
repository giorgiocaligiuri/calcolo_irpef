
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

const resetTable = function () {
    const table = document.getElementById("table");
    table.innerHTML = "";
    const header = table.createTHead();
    const row = header.insertRow();
    row.insertCell().innerHTML = "scaglione €";
    row.insertCell().innerHTML = "aliquota %";
    row.insertCell().innerHTML = "imponibile scaglione €";
    row.insertCell().innerHTML = "tassa scaglione €";
}

const insertTableRow = function (scaglione, aliquota, imponibile_scaglione, tassa_scaglione) {
    const table = document.getElementById("table");
    const row = table.insertRow();
    row.insertCell().innerHTML = scaglione;
    row.insertCell().innerHTML = aliquota;
    row.insertCell().innerHTML = imponibile_scaglione;
    row.insertCell().innerHTML = tassa_scaglione;
}

const calcolaNettoDaImponibile = function (imponibile) {
    const scaglioni = [ 15000, 28000, 50000];
    const aliquote = [ 23, 25, 35, 43];
    
    resetTable();

    let totaleTasse = 0;
    let imponibile_rimanente = imponibile;
    for (let i = 0; i < scaglioni.length && imponibile_rimanente > 0; i++) {
        const scaglione = scaglioni[i];
        const aliquota = aliquote[i];
        const imponibile_scaglione = Math.min(imponibile_rimanente, scaglione);
        const tassa_scaglione = imponibile_scaglione * aliquota / 100;
        totaleTasse += tassa_scaglione;
        imponibile_rimanente -= imponibile_scaglione;
        //add values to table
        insertTableRow(`${i > 0 ? scaglioni[i-1] : "0"} - ${scaglione}`, `${aliquota}`, imponibile_scaglione, tassa_scaglione);
    }
    // apply last aliquota
    if (imponibile_rimanente > 0) {
        const aliquota = aliquote[aliquote.length - 1];
        const tassa_scaglione = imponibile_rimanente * aliquota / 100;
        totaleTasse += tassa_scaglione;
        //add values to table
        insertTableRow(`${scaglioni[scaglioni.length - 1]} - `, `${aliquota}`, imponibile_rimanente, tassa_scaglione);
    }


    return imponibile - totaleTasse;
}

const txt_imponebile_textChanged_eventHandeler = function () {
    //get value from input with id "txt_imponibile"
    const input_text = document.getElementById("txt_imponibile").value;

    if (input_text === "") {
      //empty input
      //hide error message
      document.getElementById("error").classList.remove("visible");
      document.getElementById("error").classList.add("hidden");
      //hide table
      document.getElementById("table").classList.remove("visible");
      document.getElementById("table").classList.add("hidden");
      // hide p_stipendio_netto_no_tred
      document.getElementById("p_stipendio_netto_no_tred").classList.remove("visible");
      document.getElementById("p_stipendio_netto_no_tred").classList.add("hidden");
      // hide p_stipendio_netto_tred
      document.getElementById("p_stipendio_netto_tred").classList.remove("visible");
      document.getElementById("p_stipendio_netto_tred").classList.add("hidden");
      return;
    }
    // text not empty
    //show table
    document.getElementById("table").classList.remove("hidden");
    document.getElementById("table").classList.add("visible");
    // show p_stipendio_netto_no_tred
    document.getElementById("p_stipendio_netto_no_tred").classList.remove("hidden");
    document.getElementById("p_stipendio_netto_no_tred").classList.add("visible");
    // show p_stipendio_netto_tred
    document.getElementById("p_stipendio_netto_tred").classList.remove("hidden");
    document.getElementById("p_stipendio_netto_tred").classList.add("visible");


    //validate input
    if (!validateNumber(input_text)) {
      //invalid input
      document.getElementById("txt_imponibile").classList.remove("valid");
      document.getElementById("txt_imponibile").classList.add("is-invalid");  
      document.getElementById("error").classList.remove("hidden");
      document.getElementById("error").classList.add("visible");
      return;
    }
    //valid input
    document.getElementById("txt_imponibile").classList.remove("is-invalid");
    document.getElementById("txt_imponibile").classList.add("valid");  
    document.getElementById("error").classList.remove("visible");
    document.getElementById("error").classList.add("hidden");

    //convert input to number
    const imponibile = Number(input_text);

    //calculate tax
    const netto = calcolaNettoDaImponibile(imponibile);

    const stipendio_netto_no_tred = Math.round(netto / 12 * 100) / 100;
    const stipendio_netto_tred = Math.round(netto / 13 * 100) / 100;
    

    //show result
    document.getElementById("p_stipendio_netto_no_tred").innerHTML = `• stipendio netto (no tredicesima) : ${stipendio_netto_no_tred} € al mese`
    document.getElementById("p_stipendio_netto_tred").innerHTML = `• stipendio netto (con tredicesima) : ${stipendio_netto_tred} € al mese`

};

// add text changed event listener to input with id "txt_imponibile"
document.getElementById("txt_imponibile").addEventListener("input", txt_imponebile_textChanged_eventHandeler);

