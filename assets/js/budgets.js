function updatePageContent(){
    loadBudgets()
    console.log("updated budgets")
}

function create_new_budget() {
    let budget_name = document.getElementById("new_budget_name").value
    add_category(budget_name,1)
    window.location.reload()
}

function remove_selected_budget() {
    let budget_name = document.getElementById("remove_budget_selector").value
    budgets = getCategories()
    console.log(budgets)
    delete budgets[budget_name]
    save_categories(budgets)
    updatePageContent()
}

function loadBudgets(){
    budgets = getCategories()
    console.log(budgets)
    let parent1 = document.getElementById("budget_list")
    parent1.innerHTML=""
    document.getElementById("remove_budget_selector").innerHTML=""
    Object.keys(budgets).slice().reverse().forEach(budget_key => {
        let data = budgets[budget_key]
        let name = budget_key
        let max = data.max
        let amount = parseFloat(calculate_balance_for_category(name)).toFixed(2)
        console.log(name, max)
        let additional_style = "strong_colorful"

        if (amount < 0) {
            additional_style = "strong_warning"
        }

        let div_object = document.createElement("div")
        div_object.className = "budget_overview_container"
        div_object.innerHTML = `<h2>${name}</h2>       <h3><strong class="strong_big ${additional_style}">${amount}</strong> left</h3><br>`

        parent1.appendChild(div_object)

        let option_obj = document.createElement("option")
        option_obj.text=name
        document.getElementById("remove_budget_selector").appendChild(option_obj)
    });
}

window.onload = updatePageContent