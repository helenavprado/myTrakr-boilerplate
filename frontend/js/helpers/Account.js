import {convertTransaction} from "./Transaction.js"



class Account {
  constructor(username,transactions, id) {
    this.username = username;
    this.transactions = transactions;
    this.id = id
  }

  

  get balance() {
    let lastTransactionOnTheList = this.transactions[this.transactions.length-1]
    return this.transactions.reduce((total, transaction) => {
      if (!transaction.value) {
        return total - parseInt(lastTransactionOnTheList.amount);
      } else {
        return total + transaction.value;
      }
      
    }, 0);
  }

}

const accounts = [];


export function getAcc() {
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/accounts',
    dataType: 'json',
  }).done((data) => {
    data.forEach(account => {
    let newTransactions = account.transactions.map(transaction => {
      const convertedTransaction = convertTransaction(transaction)
      return convertedTransaction
    })
      let newAccount = new Account(account.username, newTransactions, account.id);
      
      accounts.push(newAccount);
      addAccOption(account);
      accSummary(newAccount);
    })
  });
  
}

export function findFunction (transaction) {
  const acc = getAccountById(transaction.accountId)
  acc.transactions.push(transaction)
}

function accSummary (account) {
  let newAccInput = account.username;
  let accBalance = account.balance;
  let listSummary = $("#accSummary");
  let variavel =  "<li id=" + account.username + ">" + newAccInput + ": $ <span>" + accBalance + "</span>";
  $(`#${account.username}`).remove();
  listSummary.append(variavel)
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

function filterAcc(){
  
}
console.log(accounts);

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
    const newAccountFromData = new Account(data.username,data.transactions, data.id);
    accounts.push(newAccountFromData);
    $("#newAccInput").val('')
    addAccOption(data);
    accSummary(newAccountFromData);
  });
}
export function getAccountById(id){
  const acc = accounts.find(account => {
    return account.id == id;
  })
  return acc;
}


export default {addNewAcc, findFunction, getAcc, getAccountById}


