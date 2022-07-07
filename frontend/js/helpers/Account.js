import {convertTransaction} from "./Transaction.js"


class Account {
  constructor(username,transactions) {
    this.username = username;
    this.transactions = transactions;
  }

  

  get balance() {
    return this.transactions.reduce((total, transaction) => {
      console.log(transaction)
      return total + transaction.value;
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
    let newTransactions = account.transactions.map(transaction => {
      return convertTransaction(transaction)
      })
      let newAccount = new Account(account.username, newTransactions);
      console.log(newAccount);
      accounts.push(account);
      addAccOption(account);
      accSummary(newAccount);
    })
  });
  
}
getAcc()

export function findFunction (transaction) {
  const acc = accounts.find(account => {return account.id == transaction.accountId})
  acc.transactions.push(transaction)
}

function accSummary (account) {
  let newAccInput = account.username;
  let accBalance = account.balance;
  let listSummary = $("#accSummary");
  let space = " $"
  listSummary.append($("<li>").append(newAccInput, space, accBalance))
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
  const newAccount = {username: newAccInput, transactions: []}
  $.ajax({
    method: 'post',
    data: JSON.stringify({newAccount}) ,
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
    contentType: "application/json"
  }).done((data) => {
    const newAccountFromData = new Account(data.username,data.transactions);
    console.log('new acc',newAccountFromData)
    console.log('data ajax post', data);
    accounts.push(data);
    $("#newAccInput").val('')
    addAccOption(data);
    accSummary(newAccountFromData);
  });
}

export default {addNewAcc, findFunction}


