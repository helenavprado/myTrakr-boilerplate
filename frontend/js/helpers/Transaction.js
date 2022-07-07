import { findFunction } from "./Account.js";
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
if (transaction.transactionType == "deposit"){
  return new Deposit(Number(transaction.amount, transaction.account))
} else if (transaction.transactionType == "withdrawal"){
  return new Withdrawal(Number(transaction.amount, transaction.account))
} else if (transaction.transactionType == "transfer") {
  return new Transfer (Number(transaction.amount, transaction.account, transaction.accountIdFrom, transaction.accountIdTo))
}
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
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

function addToTable (param) {
  let table = $("#transactionTable");
  table.append($("<tr>")
  .append($("<td>").append(param.accountId))
  .append($("<td>").append($("#selectAccID")))
  .append($("<td>").append(param.transactionType))
  .append($("<td>").append(param.catInput))
  .append($("<td>").append(param.description))
  .append($("<td>").append(param.amountInput))
  .append($("<td>").append($("#fromButton")))
  .append($("<td>").append($("#toButton")))
  )
}


export function getAllTransactions() {
$.ajax({
method: 'get',
url: 'http://localhost:3000/transactions',
dataType: 'json',
}).done((data) => {
const newTransacao = new Transaction(data.amount, data.account, data.accountIdFrom, data.accountIdTo);
console.log('data ajax trans get', data);
    data.forEach(accountTransaction => {
      accountTransaction.forEach(transaction => {
        findFunction(transaction);
        addToTable(transaction);
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
  if(!validateTransaction()) {
    alert("please review your transaction inputs");
    return 
  }

  let accountId = $("#selectAccID").val();
  let amountInput = $("#amountInput").val();
  let catInput = $(".selectCat").val();
  let transactionType = $("input[type='radio']:checked").val();
  let description = $("#description").val();
  let accountIdFrom = $("#fromButton").val();
  let accountIdTo = $("#toButton").val();

    
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
      findFunction(transaction);
    })
    addToTable();
    });
  }

export default {getAllTransactions}