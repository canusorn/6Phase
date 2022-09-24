// $(function () {

var ft = 0.9343;
var maintenance_cost111 = 8.19;
var maintenance_cost112 = 38.22;

function progressiveRate111(E) {
    let price = 0;

    // energy cal
    if (E <= 15) { price += E * 2.3488; }
    else if (E <= 25) { price += 15 * 2.3488 + (E - 15) * 2.9882; }
    else if (E <= 35) { price += 15 * 2.3488 + 10 * 2.9882 + (E - 25) * 3.2405; }
    else if (E <= 100) { price += 15 * 2.3488 + 10 * 2.9882 + 10 * 3.2405 + (E - 35) * 3.6237; }
    else if (E <= 150) { price += 15 * 2.3488 + 10 * 2.9882 + 10 * 3.2405 + 65 * 3.6237 + (E - 100) * 3.7171; }
    else if (E <= 400) { price += 15 * 2.3488 + 10 * 2.9882 + 10 * 3.2405 + 65 * 3.6237 + 50 * 3.7171 + (E - 150) * 4.2218; }
    else { price += 15 * 2.3488 + 10 * 2.9882 + 10 * 3.2405 + 65 * 3.6237 + 50 * 3.7171 + 250 * 4.2218 + (E - 400) * 4.4217; }

    return price;
}

function progressiveRate112(E) {
    let price = 0;

    // energy cal
    if (E <= 150) { price += E * 3.2484; }
    else if (E <= 400) { price += 150 * 3.2484 + (E - 150) * 4.2218; }
    else { price += 150 * 3.2484 + 250 * 4.2218; + (E - 400) * 4.4217; }

    return price;
}

function calc111Day(E) {
    let price = maintenance_cost111 / 30;

    // energy cal
    price += progressiveRate111(E);

    // ft
    price += ft * E;

    // vat
    price += 0.07 * price;

    return price;
}

function calc112Day(E) {
    let price = maintenance_cost112 / 30;

    // energy cal
    price += progressiveRate112(E);

    // ft
    price += ft * E;

    // vat
    price += 0.07 * price;

    return price;
}

function calc111Month(E) {
    // services
    let price = maintenance_cost111;

    // energy cal
    price += progressiveRate111(E);

    // ft
    price += ft * E;

    // vat
    price += 0.07 * price;

    return price;
}

function calc112Month(E) {
    // services
    let price = maintenance_cost112;

    // energy cal
    price += progressiveRate112(E);

    // ft
    price += ft * E;

    // vat
    price += 0.07 * price;

    return price;
}



    // console.log(calc111(189));
    // console.log(calc112(189));

// });