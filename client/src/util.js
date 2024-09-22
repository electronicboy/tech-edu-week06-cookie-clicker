/**
 *
 * @param {number} currency
 * @return {string} the formatted string
 */
export function formatCurrency(currency) {
    let currencyVal = currency;
    let currencyFormat = "";
    [{div: 1000, format: "K"}].forEach((sect) => {
        if (currencyVal >= sect.div) {
            currencyVal = currencyVal / sect.div
            currencyFormat = sect.format
        }
    })
    // https://stackoverflow.com/questions/3612744/remove-insignificant-trailing-zeros-from-a-number
    return Number(currencyVal.toFixed(2)) + currencyFormat
}

/**
 *
 * @template T
 * @param {Array<T>} array
 * @returns {T}
 */
export function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
