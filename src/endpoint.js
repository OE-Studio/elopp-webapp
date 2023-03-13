let baseURL = "https://ellp-app.herokuapp.com/"

export const endpoints = {
    checkout : baseURL + 'transaction/checkout',
    allItems: baseURL + "item",
    confirmPayment: baseURL + "transaction/verify",
    trackOrder:baseURL + "transaction/tracking",
    allTransactions:baseURL + "transaction/track-transactions"
}