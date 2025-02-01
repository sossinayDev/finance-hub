let balance = 0

function updateBalance() {
    let balance = calculate_balance()
    balance = parseFloat(balance).toFixed(2)
    console.log(balance);
    
    if (!balance.includes(".")) {
        balance += ".--";
    }
    document.getElementById("balance-indicator").textContent = balance;
}

function updatePageContent(){
    console.log("update overview")
    updateBalance()
}


window.onload = updatePageContent