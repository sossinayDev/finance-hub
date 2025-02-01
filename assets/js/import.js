function startTextImport(){
    let descriptions = document.getElementById("textImportDescriptions").value.split("\n")
    let amounts = document.getElementById("textImportAmounts").value.split("\n")
    let local_categories = document.getElementById("textImportCategories").value.split("\n")
    let categories = getCategories()
    console.log(descriptions, amounts, categories)

    let i = 0
    descriptions.forEach(t => {
        let element = {}
        element.name = descriptions[i]
        element.amount = amounts[i]
        element.category = local_categories[i]
        payments = loadPayments()
        payments.push(element)
        savePayments()
        i++;
    });
}

function updatePageContent(){
    document.getElementById("textImportDescriptions").value = ""
    document.getElementById("textImportAmounts").value = ""
    document.getElementById("textImportCategories").value = ""
}