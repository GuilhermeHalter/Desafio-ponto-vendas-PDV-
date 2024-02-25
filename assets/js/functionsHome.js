
var produtos = JSON.parse(localStorage.getItem('db_produto')) ?? [];
var categorias = JSON.parse(localStorage.getItem('db_category')) ?? [];
var select = document.getElementById('select');
produtos.forEach(function (produto) {
    var option = document.createElement('option');
    option.textContent = produto.product;
    option.value = produto.id;
    select.appendChild(option);
});


const categoria = categorias.splice(item => item.id === produtos.categoryId);
 if(produtos.category === categoria.category){
    console.log("true")
 }else{
    console.log("false")
 }


/////////// area de teste

//////////