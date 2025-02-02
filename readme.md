# Finance Hub
Part of the "Hub" program

## Table of Contents
- [What is this](#what-is-this)
- [Features](#features)
  - [Budgets/Categories](#budgetscategories)
  - [Payment List](#payment-list)
  - [QuickTransfer](#quicktransfer)
  - [Data Import](#data-import)
  - [Multiple Accounts](#multiple-accounts)
- [What's to come?](#whats-to-come)
- [Bugs](#bugs)

## What is this
Finance Hub is a basic tool to manage your budgets and keep track of multiple accounts simultaneously.  
You can create multiple accounts, budgets, and payments.  
There are also monthly payments, but they don't work well (**They don't!**).

## Features
- [Budgets/Categories](#budgetscategories)
- [Payment List](#payment-list)
- [QuickTransfer](#quicktransfer)
- [Data Import](#data-import)
- [Multiple Accounts](#multiple-accounts)
- Light/Dark mode

### Budgets/Categories
You can create budgets/categories on the "Budgets" tab. After creating one, reload the page so it can be loaded correctly (This will be automated soon).  
Once created, you can select the budget/category in multiple locations, including the payment adder or [QuickTransfer](#quicktransfer).  
On the budget page, you will see the budget and the sum of all payments in the corresponding category. The total turns red when the balance is below 0.

### Payment List
This feature shows all your payments, except for monthly payments, which are listed at the bottom of the page.  
It displays the amount, category, and description of the payment. You can also edit or remove payments using the buttons on the right.

### QuickTransfer
If you have spare money in one category, you can transfer it to another category easily with the QuickTransfer feature.  
To use it, head to the left sidebar and look for the "QuickTransfer" box.

![QuickTransfer Box](https://i.imgur.com/94xJUne.png)

Now, select the desired amount and the categories to exchange the money.  
To add the transfer, click "Transfer!" and the payment will be automatically generated and added to the payment list. It will look something like this:

![QuickTransfer Example](https://i.imgur.com/B9WpvRi.png)

### Data Import
You can import payments from your online banking or other sources into Finance Hub.  
To do this, go to the import page and paste your descriptions, categories, and amounts into the corresponding text boxes.  
After that, simply click "Import" and the payments will be imported.

### Multiple Accounts
On the left sidebar, you'll find this box:

![Account Switcher](https://i.imgur.com/lmL38EH.png)

Here, you can switch between your accounts. To add a new account, enter a name in the text box below the selector and click the plus button (+).  
To switch accounts, select one and press the arrow button (>). The page will reload, and the selected account should be loaded.

To delete an account, select it and click the [X] button.  
**Important! Deleting an account cannot be undone! All your configurations, payments, and categories will be permanently deleted.**

## What's to come?
- Widgets for "The Hub" new tab site
- Improved monthly payments feature
- Currency support (e.g., displaying "$0.00" or "0.00€" instead of "0.00")
## Bugs
- [ ] QuickTransfers without inputs
- [ ] Page doesn't update after editing categories
- [ ] Monthly payments don't work