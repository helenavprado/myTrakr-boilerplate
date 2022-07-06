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

  console.log($("#fromButton").val());
  console.log($("#toButton").val());
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

$("input[type='radio']").on("change", hideShowSelectButton)


let catInput = $("#selectCat").val();
let transactionType = $("input[type='radio']:checked").val();



class Transfer extends Transaction {
  constructor(amount, account, accountIdFrom, accountIdTo) {
    super(amount, account);
    this.accountIdFrom = accountIdFrom;
    this.accountIdTo = accountIdTo;
  }
}

export function addNewTransaction(e) {
  e.preventDefault()
  if(!validateTransaction()) {
    alert("please review your transaction inputs");
    return 
  }

  let account = $("#selectAccID").val();
  let amountInput = $("#amountInput").val();
  const newTransaction = new Transaction(amountInput, account);

  console.log(newTransaction);
  $.ajax({
    method: 'post',
    data: JSON.stringify({newTransaction}) ,
    url: 'http://localhost:3000/transaction',
    dataType: 'json',
    contentType: "application/json"
    }).done((data) => {
    console.log('data ajax post', data);
    });

  }