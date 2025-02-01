let isDarkMode = false
let btn_reset_timeout = null
function resetButtonText() {
    let btn = document.getElementById("add_payment_confirm")
    btn.textContent = "Add"
}


function switchPage(where) {
    let a = document.location.href.split("#")[0]
    document.location.href = a + "#" + where
    iframe_href = "subpages/" + where + ".html"
    updateIFrame()
}

function updateIFrame() {
    document.getElementById("content").src = iframe_href
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

function toggleDarkMode() {
    isDarkMode = !isDarkMode
    if (isDarkMode) {
        localStorage.setItem("dark_mode", "1")
    }
    else {
        localStorage.setItem("dark_mode", "0")
    }
    updateTheme()
}

function create_new_account(){
    accounts.push(document.getElementById("new_account_name").value)
    saveAccounts()
}

function updateTheme() {
    if (isDarkMode) {
        document.querySelector("html").className = "dark_mode"
    }
    else {
        document.querySelector("html").className = ""
    }
    if (document.getElementById("content")) {
        document.getElementById("content").contentWindow.postMessage({ type: "update_theme", theme: { dark: isDarkMode } }, "*")
    }
}

updateTheme()

function init() {
    accounts.forEach(account => {
        let opt = document.createElement("option")
        opt.text=account
        document.getElementById("account_selector").appendChild(opt)
    });
    document.getElementById("account_selector").value = current_account

    instanciateCategories()
    loadPayments()
    loadMonthlyPayments()
}


setTimeout(init, 100)
let tmp = setInterval(check_load, 1)
function check_load() {
    if (document.getElementById("content")) {
        updateIFrame()
        console.log("Page loaded");
        var iframe = document.getElementById("content");
        iframe.onload = function () {
            console.log("Content loaded");
            updateTheme();
        };
        clearInterval(tmp)
    }
}

function quickTransfer() {
    let from = document.getElementById("quicktransfer_from").value
    let to = document.getElementById("quicktransfer_to").value
    let amount = document.getElementById("quicktransfer_amount").value
    console.log(from, to, amount)
    let p_data = {}
    p_data.name = `QuickTransfer: ${amount} ${from} -> ${to}`
    p_data.amount = -amount
    p_data.category = from
    payments.push(p_data)
    p_data = {}
    p_data.name = `QuickTransfer: ${amount} ${from} -> ${to}`
    p_data.amount = amount
    p_data.category = to
    payments.push(p_data)
    savePayments()
}



page = document.location.href.split("#")[1]
let iframe_href = "subpages/overview.html"
let allowed_pages = [
    "overview",
    "budgets",
    "payment_list",
    "import"
]
if (allowed_pages.includes(page)) {
    iframe_href = "subpages/" + page + ".html"
}
else {
    console.log("unknown page, redirecting to overview")
    document.location.href = document.location.href.split("#")[0] + "#overview"
}


