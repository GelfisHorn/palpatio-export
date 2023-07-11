export function formatMoney(amount) {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'EUR'
    })
}