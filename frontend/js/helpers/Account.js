class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      return total + transaction;
    }, 0);
  }

}

const accounts = [];

//get acct

function getAcc() {
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
  }).done((data) => {
    console.log('data ajax get', data);
    data.forEach(account => {
      accounts.push(account);
      addAccOption(account);
    })
  });
  
}
getAcc()



//WORKING HERE


export function findFunction (transaction) {
  const acc = accounts.find(account => {return account.id == transaction.accountId})
  acc.transactions.push(transaction)
}


// validate
function validateNewAcc (name) {
  if(!name) return false;
  if(accounts.length > 0){
    let exists = false;
    accounts.forEach(item => {
      if (name === item.username) {
        exists = true;
      }
    })
    if(exists)return false;
  }
  return true
}

function addAccOption(param) {
  $('.selectAcc')
  .prepend($('<option>').val(param.id).text(param.username));
}

export function addNewAcc(e) {
  e.preventDefault()
  let newAccInput = $("#newAccInput").val();
  if(!validateNewAcc(newAccInput)){
    alert('invalid account name');
    return
  }
  const newAccount = new Account(newAccInput);
    console.log('new acc',newAccount)
  $.ajax({
    method: 'post',
    data: JSON.stringify({newAccount}) ,
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
    contentType: "application/json"
  }).done((data) => {
    console.log('data ajax post', data);
    accounts.push(data);
    $("#newAccInput").val('')
    addAccOption(data);
  });
}

export default {addNewAcc, findFunction}


