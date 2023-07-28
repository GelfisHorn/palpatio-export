const PRICE = {
    "weight": { // Each 10 units, 10 price
        "each": 10,
        "price": 10
    },
    "length": {
        "each": 10,
        "price": 1
    },
    "width": {
        "each": 10,
        "price": 1
    },
    "height": {
        "each": 10,
        "price": 1
    }
}
const UNITS_MAX = { // Max units on inputs
    "vehicle_weight": 4000,
    "weight": 1000,
    "length": 1000,
    "width": 1000,
    "height": 1000
}
const MAX_AMOUNT = 10; // Max amount per item
const VEHICLES = { // (Select on vehicle item)
    "truck": "Camión",
    "car": "Automovil",
    "engine": "Motor",
    "bike": "Bicicleta"
}
const COUNTRIES = { // Country select
    fr: {
        "CH": "Suisse",
        "FR": "France",
        "AT": "L'Autriche",
        "BE": "Belgique",
        "NL": "Hollande",
        "LU": "Luxembourg",
        "DE": "Allemagne"
    },
    de: {
        "CH": "Schweizerisch",
        "FR": "Frankreich",
        "AT": "Österreich",
        "BE": "Belgien",
        "NL": "Holland",
        "LU": "Luxemburg",
        "DE": "Deutschland"
    },
    en: {
        "CH": "Swiss",
        "FR": "France",
        "AT": "Austria",
        "BE": "Belgium",
        "NL": "Holland",
        "LU": "Luxembourg",
        "DE": "Germany"
    },
    es: {
        "CH": "Suiza",
        "FR": "Francia",
        "AT": "Austria",
        "BE": "Belgica",
        "NL": "Holanda",
        "LU": "Luxemburgo",
        "DE": "Alemania"
    }
}
const DISCOUNT = 20; // Discount on "moving" category
// Price Settings
const PRICE_DEFAULT = {
    "truck": 1000,
    "car": 500,
    "engine": 200,
    "bike": 75,
    "vehicle": 0,
    "furniture": 50,
    "package": 40,
    "pallet": 30,
    "tank": 50,
    "other": 20
}
const VEHICLE_PRICE = { // Vehicle item prices
    "weight": {
        "each": 250,
        "price": 25
    },
    "length": {
        "each": 50,
        "price": 10
    },
    "width": {
        "each": 50,
        "price": 10
    },
    "height": {
        "each": 50,
        "price": 10
    }
}

export {
    PRICE,
    UNITS_MAX,
    MAX_AMOUNT,
    VEHICLES,
    COUNTRIES,
    DISCOUNT,
    PRICE_DEFAULT,
    VEHICLE_PRICE
};