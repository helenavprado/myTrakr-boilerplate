class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
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

  if ($("#fromButton").val() === $("#toButton").val()) {
    return false;
  }
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




class Transfer extends Transaction {
  constructor(amount, account, accountIdFrom, accountIdTo) {
    super(amount, account);
    this.accountIdFrom = accountIdFrom;
    this.accountIdTo = accountIdTo;
  }
}

// export function addNewTransaction(e) {
//   e.preventDefault()
   
// }