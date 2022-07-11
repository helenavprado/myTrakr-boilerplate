class Category {
    constructor(categoryName) {
    this.categoryName = categoryName;
    }
}

const categories = [];

//get acct

function getCategory() {
$.ajax({
    method: 'get',

    url: 'http://localhost:3000/categories',
    dataType: 'json',
}).done((data) => {
 
    data.forEach(category => {
    categories.push(category);
    addOption(category.name.categoryName);
    })
});

}
getCategory()

//validate
function validateNewCategory (name) {

if(!name) return false;
if(categories.length > 0){
    let exists = false;
    categories.forEach(item => {
    if (name === item.name.categoryName) {
        exists = true;
    }
    })
    if(exists)return false;
}
return true
}

function hideButton() {
    $("#addNewCatButton").hide();
    $("#addNewCatInput").hide();
}

function showButton() {
    $("#addNewCatButton").show();
    $("#addNewCatInput").show();
}


$(".selectCat").on("change", function() {
    let banana = $(this).val();
    if (banana === "Add-new") {
    showButton()
    } else {
    hideButton();
    }
});

function addOption(param) {
    $('.selectCat')
    .prepend($('<option>').val(param).text(param));
}

export function addNewCategory(e) {
    e.preventDefault()
    let newCatInput = $("#addNewCatInput").val();

    if(!validateNewCategory(newCatInput)){
    alert('invalid category name');
    return
    }
    const newCategory = new Category(newCatInput);
    
    $.ajax({
    method: 'post',
    data: JSON.stringify({newCategory}) ,

    url: 'http://localhost:3000/categories',
    dataType: 'json',
    contentType: "application/json"
    }).done((data) => {
 
    categories.push(data);
    $("#addNewCatInput").val('')
    hideButton()
    addOption(newCatInput);

    });
}

export default {addNewCategory}
