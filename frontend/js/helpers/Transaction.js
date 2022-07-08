import { findFunction, getAccountById } from "./Account.js";
class Transaction {
  constructor(amount, accountId) {
    this.amount = amount;
    this.accountId = accountId;
  }
  commit() {
    if (this.value < 0 && this.amount > this.account.balance) return;
    this.account.transactions.push(this.value);
    // this.account.balance += this.value;
  }
}

export function convertTransaction (transaction){
  console.log(transaction);
if (transaction.transactionType == "deposit"){
  return new Deposit(transaction.amountInput, transaction.account)
} else if (transaction.transactionType == "withdrawal"){
  return new Withdrawal(transaction.amountInput, transaction.account)
} else if (transaction.transactionType == "transfer") {
  return new Transfer (transaction.amountInput, transaction.account, transaction.accountIdFrom, transaction.accountIdTo)
}
}

class Withdrawal extends Transaction {
  get value() {
    return -Number(this.amount);
  }
}

class Deposit extends Transaction {
  get value() {
    return Number(this.amount);
  }


}

class Transfer extends Transaction {
  constructor(amount, account, accountIdFrom, accountIdTo) {
    super(amount, account);
    this.accountIdFrom = accountIdFrom;
    this.accountIdTo = accountIdTo;
  }

  transferMoney(amount) {
    this.amount = amount;
    if (this.amount < this.account.balance) {
      return false;
    }
  }
  
}



function addToTable (transaction) {
  // console.log(transaction);
  let table = $("#transactionTable");

  
  table.append($("<tr>")
  .append($("<td>").append(transaction.id))
  .append($("<td>").append(getAccountById(transaction.accountId).username))
  .append($("<td>").append(transaction.transactionType))
  .append($("<td>").append(transaction.catInput))
  .append($("<td>").append(transaction.description))
  .append($("<td>").append(transaction.amountInput))
  .append($("<td>").append(getAccountById(transaction.accountIdFrom).username))
  .append($("<td>").append(getAccountById(transaction.accountIdTo).username)))
  
}


export function getAllTransactions() {
$.ajax({
method: 'get',
url: 'http://localhost:3000/transactions',
dataType: 'json',
}).done((data) => {
console.log('data ajax trans get', data);
    data.forEach(accountTransaction => {
      accountTransaction.forEach(transaction => {
        addToTable(transaction)
        // findFunction(transaction);
      })
    })
    
  })
};
  


function showSelectButton () {
  $(".hideFromToForms").show();
  $(".AccForm").hide()
}

function hideSelectButton () {
  $(".hideFromToForms").hide();
  $(".AccForm").show()
}

function validateTransaction() {
  if ($("#amountInput").val() <= 0) {
    return false;
  } 

  if ($("#selectCat").val() === "Add-new") {
    return false;
  } 

  if ($("input[type='radio']:checked").val() === "transfer") {
    if ($("#fromButton").val() === $("#toButton").val()) {
      return false;
    }
  }
  return true;
}


function hideShowSelectButton () {
  let radioValue = $("input[type='radio']:checked").val();
  if (radioValue === "deposit" || radioValue === "withdrawal") {
    hideSelectButton();
  } else {
    showSelectButton();
  }
} 

$("input[type='radio']").on("change", hideShowSelectButton);


export function addNewTransaction(e) {
  e.preventDefault()
  let accountId = $("#selectAccID").val();
  let amountInput = $("#amountInput").val();
  let catInput = $(".selectCat").val();
  let transactionType = $("input[type='radio']:checked").val();
  let description = $("#description").val();
  let accountIdFrom = $("#fromButton").val();
  let accountIdTo = $("#toButton").val();
  
  if(!validateTransaction()) {
    alert("please review your transaction inputs");
    return 
  }

    
  const newTransaction = {
    accountId,
    amountInput,
    catInput,
    transactionType,
    description,
    accountIdFrom,
    accountIdTo,
  };

  $.ajax({
    method: 'post',
    data: JSON.stringify({newTransaction}) ,
    url: 'http://localhost:3000/transaction',
    dataType: 'json',
    contentType: "application/json"
    }).done((data) => {
    console.log('data ajax post', data);
    data.forEach(transaction => { 
      let newTransaction = convertTransaction(transaction);
      findFunction(transaction);
      addToTable(transaction);
      let account = getAccountById(transaction.accountId);
      const balanceElement = $(`#${account.username} span`);
      balanceElement.text(Number(balanceElement.text()) + newTransaction.value)
      console.log(account);
    })
  
    2
    });
  }

export default {getAllTransactions}