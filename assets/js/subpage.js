let theme = null
var payments = []
var monthly_payments = []
window.addEventListener('message', function (event) {
    if (event.data.type == 'update_theme') {
        theme = event.data.theme
        console.log(theme)
        loadTheme()
    }
    if (event.data.type == 'update_content') {
        updatePageContent()
    }
});

function deletePayment(index) {
    console.log(`Deleting payment ${index}`)
    payments.splice(index, 1)
    console.log(payments)
    savePayments()
    cancelProcesses()
}

function deleteMonthlyPayment(index) {
    console.log(`Deleting payment ${index}`)
    monthly_payments.splice(index, 1)
    console.log(monthly_payments)
    saveMonthlyPayments()
    cancelProcesses()
}

function loadTheme() {
    if (theme.dark) {
        document.querySelector("html").className = "dark_mode"
    }
    else {
        document.querySelector("html").className = ""
    }
}

function loadPayments() {
    payments = localStorage.getItem("payments") 
    if (payments) {
        payments = JSON.parse(payments)[current_account]
        return payments
    }
    else {
        payments = []
        savePayments()
        return []
    }
}

function savePayments() {
    let n = JSON.parse(localStorage.getItem("payments"))
    if (n == null) { n = {} }
    n[current_account] = payments
    localStorage.setItem("payments", JSON.stringify(n))
    setTimeout(updatePageContent, 50)
}

function saveMonthlyPayments() {
    let n = JSON.parse(localStorage.getItem("monthly_payments"))
    if (n == null) { n = {} }
    n[current_account] = monthly_payments
    localStorage.setItem("monthly_payments", JSON.stringify(n))
    setTimeout(updatePageContent, 50)
}


function add_monthly_payment(name, amount, category, timestamp) {
    let data = { name: name, amount: amount, category: category, timestamp: timestamp }
    monthly_payments.push(data)
    saveMonthlyPayments()
}



function instanciateSubpageCategories() {
    categories = getCategories()
    cat_select = document.getElementById("add_payment_budget_selector")
    cat_select.innerHTML = ""
    Object.keys(categories).forEach(category => {
        elem = document.createElement("option")
        elem.innerHTML = category
        cat_select.appendChild(elem)
    });
}

function editPayment(num, name, amount, category) {
    payments[num].name = name
    payments[num].amount = parseFloat(amount)
    payments[num].category = category
    savePayments()
}

function editMonthlyPayment(num, name, amount, category) {
    monthly_payments[num].name = name
    monthly_payments[num].amount = parseFloat(amount)
    monthly_payments[num].category = category
    saveMonthlyPayments()
}

loadMonthlyPayments()
loadPayments()