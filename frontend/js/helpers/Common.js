//common functions that can be used in different cases

//filter by acc
let accFiltered = $(this).val();



let accountList = []
function callBackFun (account) {
    if (accFiltered === account) {
        // return lista de transações da conta
    }
}   

let filterFunction = accountList.map(callBackFun);

$("#filterAcc").on("change", filterFunction)