function updatePageContent() {
    console.log("update payments")
    updateList()
    load_categories()
}

function cancelProcesses() {
    document.getElementById("rename_payment").style.display = "none"
    document.getElementById("change_payment_amount").style.display = "none"
    document.getElementById("change_payment_category").style.display = "none"
    document.getElementById("change_payment_button").style.display = "none"
    document.getElementById("rename_m_payment").style.display = "none"
    document.getElementById("change_m_payment_amount").style.display = "none"
    document.getElementById("change_m_payment_category").style.display = "none"
    document.getElementById("change_m_payment_button").style.display = "none"
}

function load_categories() {
    categories = getCategories()
    if (!categories) {
        categories = []
        localStorage.setItem("categories", "[]")
    }
    let cat_select1 = document.getElementById("change_payment_category")
    let cat_select2 = document.getElementById("change_m_payment_category")
    let cat_select3 = document.getElementById("m_payment_category")
    cat_select1.innerHTML = ""
    cat_select2.innerHTML = ""
    cat_select3.innerHTML = ""
    Object.keys(categories).forEach(category => {
        elem = document.createElement("option")
        elem.innerHTML = category
        cat_select1.appendChild(elem)
        elem = document.createElement("option")
        elem.innerHTML = category
        cat_select2.appendChild(elem)
        elem = document.createElement("option")
        elem.innerHTML = category
        cat_select3.appendChild(elem)
    });
}

let current_editing = null
function startEditingPayment(index) {
    let tmp = loadPayments()
    document.getElementById("rename_payment").style.display = "inline"
    document.getElementById("change_payment_amount").style.display = "inline"
    document.getElementById("change_payment_category").style.display = "inline"
    document.getElementById("change_payment_button").style.display = "inline"
    document.getElementById("rename_payment").value = tmp[index].name
    document.getElementById("change_payment_amount").value = tmp[index].amount
    document.getElementById("change_payment_category").value = tmp[index].category
    current_editing = index
}

function saveModificationsOnPayment() {
    let tmp = loadPayments()
    let name = tmp[current_editing].name
    let amount = tmp[current_editing].amount
    let category = tmp[current_editing].category
    if (document.getElementById("rename_payment").value) {
        name = document.getElementById("rename_payment").value
    }
    if (document.getElementById("change_payment_amount").value) {
        amount = parseFloat(document.getElementById("change_payment_amount").value)
    }
    if (document.getElementById("change_payment_category").value) {
        category = document.getElementById("change_payment_category").value
    }
    editPayment(current_editing, name, amount, category)
    document.getElementById("rename_payment").style.display = "none"
    document.getElementById("change_payment_amount").style.display = "none"
    document.getElementById("change_payment_category").style.display = "none"
    document.getElementById("change_payment_button").style.display = "none"
}

let m_current_editing = null
function startEditingMonthlyPayment(index) {
    let tmp = loadMonthlyPayments()
    document.getElementById("rename_m_payment").style.display = "inline"
    document.getElementById("change_m_payment_amount").style.display = "inline"
    document.getElementById("change_m_payment_category").style.display = "inline"
    document.getElementById("change_m_payment_button").style.display = "inline"
    document.getElementById("rename_m_payment").value = tmp[index].name
    document.getElementById("change_m_payment_amount").value = tmp[index].amount
    document.getElementById("change_m_payment_category").value = tmp[index].category
    m_current_editing = index
}

function saveModificationsOnMonthlyPayment() {
    let tmp = loadMonthlyPayments()
    let name = tmp[m_current_editing].name
    let amount = tmp[m_current_editing].amount
    let category = tmp[m_current_editing].category
    if (document.getElementById("rename_m_payment").value) {
        name = document.getElementById("rename_m_payment").value
    }
    if (document.getElementById("change_m_payment_amount").value) {
        amount = parseFloat(document.getElementById("change_m_payment_amount").value)
    }
    if (document.getElementById("change_m_payment_category").value) {
        category = document.getElementById("change_m_payment_category").value
    }
    editMonthlyPayment(m_current_editing, name, amount, category)
    document.getElementById("rename_m_payment").style.display = "none"
    document.getElementById("change_m_payment_amount").style.display = "none"
    document.getElementById("change_m_payment_category").style.display = "none"
    document.getElementById("change_m_payment_button").style.display = "none"
}

function updateList() {
    let list_element = document.getElementById("payment_list")
    list_element.innerHTML = " "
    let lpayments = loadPayments()
    i = 0
    lpayments.slice().reverse().forEach(payment => {
        let div_object = document.createElement("div")
        div_object.className = "payment_list_item"
        let textobject = document.createElement("h3")
        let p = parseFloat(payment.amount)
        console.log(p)
        let price_text = p.toFixed(2).toString()
        if (!price_text.includes(".")) {
            price_text += ".--";
        }

        textobject.innerHTML = `<strong>${price_text}</strong> | ${payment.category} | ${payment.name}`
        let img1 = document.createElement("img")
        img1.className = "payment_list_item_image"
        img1.src="../assets/img/edit_icon.png"
        img1.setAttribute("onclick", "startEditingPayment("+(lpayments.length-i-1).toString()+")")
        let img2 = document.createElement("img")
        img2.className = "payment_list_item_image"
        img2.src="../assets/img/delete_icon.png"
        img2.setAttribute("onclick", "deletePayment("+(lpayments.length-i-1).toString()+")")

        div_object.appendChild(textobject)
        div_object.appendChild(img1)
        div_object.appendChild(img2)

        list_element.appendChild(div_object)

        i++;
    });

    //Monthly payments
    list_element = document.getElementById("monthly_payment_list")
    list_element.innerHTML = " "
    lpayments = loadMonthlyPayments()
    i = 0
    lpayments.slice().reverse().forEach(payment => {
        div_object = document.createElement("div")
        div_object.className = "payment_list_item"
        textobject = document.createElement("h3")
        p = parseFloat(payment.amount)
        console.log(p)
        price_text = p.toFixed(2).toString()
        if (!price_text.includes(".")) {
            price_text += ".--";
        }

        textobject.innerHTML = `<strong>${price_text}</strong> | ${payment.category} | ${payment.name}`
        img1 = document.createElement("img")
        img1.className = "payment_list_item_image"
        img1.src="../assets/img/edit_icon.png"
        img1.setAttribute("onclick", "startEditingMonthlyPayment("+(lpayments.length-i-1).toString()+")")
        img2 = document.createElement("img")
        img2.className = "payment_list_item_image"
        img2.src="../assets/img/delete_icon.png"
        img2.setAttribute("onclick", "deleteMonthlyPayment("+(lpayments.length-i-1).toString()+")")

        div_object.appendChild(textobject)
        div_object.appendChild(img1)
        div_object.appendChild(img2)

        list_element.appendChild(div_object)

        i++;
    });
}

function setupMonthlyPayment() {
    let name = document.getElementById("name_m_payment").value
    let amount = document.getElementById("m_payment_amount").value
    let category = document.getElementById("m_payment_category").value
    let timestamp = new Date(document.getElementById("m_payment_startdate").value).getTime();
    add_monthly_payment(name, amount, category, timestamp)
}


window.onload = updatePageContent