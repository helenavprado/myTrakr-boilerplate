import {addNewAcc, getAcc} from "./helpers/Account.js"
import {addNewCategory} from "./helpers/Category.js"
import {addNewTransaction, getAllTransactions} from "./helpers/Transaction.js"
$(() => { 
  //Start coding here!

  //$("#id").on("click", funcao)
//                    .val é uma funcao que retorna o conteudo do elemento
//nomedaconta = $.(#id).val()

getAcc();
getAllTransactions();

$("#addNewAccButton").on("click",(e) => addNewAcc(e))
$("#addNewCatButton").on("click",(e) => addNewCategory(e))
$("#addNewTransactionButton").on("click",(e) => addNewTransaction(e))
});
















