let accounts = JSON.parse(localStorage.getItem("accounts"));


if (localStorage.getItem("accounts") == null) {
    accounts = ["My account"]
    localStorage.setItem("accounts", JSON.stringify(accounts))
}
let current_account = localStorage.getItem("last_used_account")
if (!accounts.includes(current_account)) {
    current_account = accounts[0]
}

if (localStorage.getItem("dark_mode") == "1") {
    isDarkMode = true
}
else {
    localStorage.setItem("dark_mode", "0")
}

if (localStorage.getItem("dark_mode") == "1") {
    isDarkMode = true
}
else {
    localStorage.setItem("dark_mode", "0")
}

function loadPayments() {
    payments = localStorage.getItem("payments")
    if (payments) {
        payments = JSON.parse(payments)
        if (payments[current_account] == null) {
            payments = []
            savePayments()
            return []
        }
        else {
            return payments[current_account]
        }

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
    setTimeout(updateContent, 50)
}

function saveMonthlyPayments() {
    let n = JSON.parse(localStorage.getItem("monthly_payments"))
    if (n == null) { n = {} }
    n[current_account] = monthly_payments
    localStorage.setItem("monthly_payments", JSON.stringify(n))
    setTimeout(updateContent, 50)
}

function updateContent() {
    if (document.getElementById("content")) {
        document.getElementById("content").contentWindow.postMessage({ type: "update_content" }, "*")
    }
}

function instanciateCategories() {
    categories = getCategories()
    let cat_select = document.getElementById("add_payment_budget_selector");
    let cat_select2 = document.getElementById("quicktransfer_from");
    let cat_select3 = document.getElementById("quicktransfer_to");
    cat_select.innerHTML = "";
    cat_select2.innerHTML = "";
    cat_select3.innerHTML = "";
    Object.keys(categories).forEach(category => {
        const elem = document.createElement("option");
        elem.textContent = category;
        cat_select.appendChild(elem);
        const elem2 = document.createElement("option");
        elem2.textContent = category;
        cat_select2.appendChild(elem2);
        const elem3 = document.createElement("option");
        elem3.textContent = category;
        cat_select3.appendChild(elem3);
    });
}

function getCategories() {
    let categories = localStorage.getItem("categories");
    if (!categories) {
        let n = {}
        n[current_account] = {}
        localStorage.setItem("categories", JSON.stringify(n));
        categories = {}
    }
    else {
        categories = JSON.parse(categories)
        if (categories[current_account] == null) {
            return {}
        }
        else {
            return categories[current_account]
        }
    }
    return categories;
}

function save_categories(categories) {
    let n = localStorage.getItem("categories")
    if (n != null) {
        n = JSON.parse(n)
        n[current_account] = categories
        localStorage.setItem("categories", JSON.stringify(n))
    }
}


function add_category(name, max) {
    console.log("Adding category")
    let categories = getCategories()
    categories[name] = { "max": max }
    console.log(categories)
    save_categories(categories)
}

function addPayment() {
    payments = loadPayments()
    clearTimeout(btn_reset_timeout)
    let btn = document.getElementById("add_payment_confirm")
    let amount = parseFloat(document.getElementById("add_payment_amount").value)
    let category = document.getElementById("add_payment_budget_selector").value
    let name = document.getElementById("add_payment_name").value
    if (!category || !amount || !name) {
        console.log("no category selected")
        btn.textContent = "Invalid entries"
    }
    else {
        document.getElementById("add_payment_amount").value = ""
        document.getElementById("add_payment_name").value = ""

        let p_data = {}
        p_data.name = name
        p_data.amount = amount
        p_data.category = category
        payments.push(p_data)

        savePayments()

        btn.textContent = "Added!"
    }
    btn_reset_timeout = setTimeout(resetButtonText, 2000)
}


function loadMonthlyPayments() {
    monthly_payments = localStorage.getItem("monthly_payments")
    if (monthly_payments) {
        monthly_payments = JSON.parse(monthly_payments)
        if (monthly_payments[current_account] == null) {
            monthly_payments = []
            saveMonthlyPayments()
            return []
        }
        else {
            return monthly_payments[current_account]
        }
    }
    else {
        monthly_payments = []
        saveMonthlyPayments()
        return []
    }
}

function calculate_balance() {
    let tmpbalance = 0
    payments = loadPayments()
    payments.forEach(payment => {
        tmpbalance += parseFloat(payment.amount)
    });
    monthly_payments = loadMonthlyPayments()
    evaluated_payments = evaluateMonthlyPayments()
    evaluated_payments.forEach(payment => {
        tmpbalance += payment.amount
    });

    balance = tmpbalance
    return (balance)
}

function calculate_balance_for_category(category) {
    let tmpbalance = 0
    let payments = loadPayments()
    console.log("Payments:", payments)
    payments.forEach(payment => {
        if (payment.category == category) {
            tmpbalance += parseFloat(payment.amount)
        }
    });
    monthly_payments = loadMonthlyPayments()
    evaluated_payments = evaluateMonthlyPayments()
    evaluated_payments.forEach(payment => {
        if (payment.category == category) {
            tmpbalance += payment.amount
        }
    });

    balance = tmpbalance
    return (balance)
}

function evaluateMonthlyPayments() {
    monthly_payments = loadMonthlyPayments()
    let m_payments = []
    monthly_payments.forEach(payment => {
        let now = new Date()
        let start = new Date(payment.timestamp)
        const yearsDifference = now.getFullYear() - start.getFullYear();
        const monthsDifference = now.getMonth() - start.getMonth();
        let months = yearsDifference * 12 + monthsDifference;
        months++;
        if (now.getDate() < start.getDate()) {
            months--;
        }
        console.log("Total months: ", months)
        totalAmount = months * payment.amount
        m_payments.push({ name: payment.name, amount: totalAmount, category: payment.category })
    });
    return m_payments
}

function add_monthly_payment(name, amount, category) {
    let data = { name: name, amount: amount, category: category, timestamp: Date.now() }
    monthly_payments=loadMonthlyPayments()
    console.log(monthly_payments)
    monthly_payments.push(data)
    saveMonthlyPayments()
}

function switch_account() {
    current_account = document.getElementById("account_selector").value;
    localStorage.setItem("last_used_account", current_account)
    updateContent()
    window.location.reload()
}

function saveAccounts() {
    localStorage.setItem("accounts", JSON.stringify(accounts));
    window.location.reload()
}

function delete_account() {
    if (confirm("Are you sure that you want to delete the account " + document.getElementById("account_selector").value + "?\nThis can't be undone!!")) {
        accounts.splice(accounts.indexOf(document.getElementById("account_selector").value), 1)
        saveAccounts()
        window.location.reload()
    }
}