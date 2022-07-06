import {addNewAcc} from "./helpers/Account.js"
import {addNewCategory} from "./helpers/Category.js"
import {addNewTransaction} from "./helpers/Transaction.js"
$(() => { 
  //Start coding here!

  //$("#id").on("click", funcao)
//                    .val é uma funcao que retorna o conteudo do elemento
//nomedaconta = $.(#id).val()

$("#addNewAccButton").on("click",(e) => addNewAcc(e))
$("#addNewCatButton").on("click",(e) => addNewCategory(e))
$("#addNewTransactionButton").on("click",(e) => addNewTransaction(e))
});














