var produtos = JSON.parse(localStorage.getItem('db_produto')) ?? [];
var categorias = JSON.parse(localStorage.getItem('db_category')) ?? [];
var select = document.getElementById('select');
var taxValue = document.getElementById("tax-value");
var unitPrice = document.getElementById("unit-price");

produtos.forEach(function (produto) {
   var option = document.createElement('option');
   option.textContent = produto.product;
   option.value = produto.product;
   select.appendChild(option);
});

select.addEventListener('change', function() {
    var selectedProductName = this.value; 
    var selectedProduct = produtos.find(function(produto) {
        return produto.product === selectedProductName;
    });

    if (selectedProduct) {
        var foundCategory = categorias.find(function(categoria) {
            return categoria.category === selectedProduct.category;
        });

        if (foundCategory) {
            taxValue.value = foundCategory.tax;
        } else {
            taxValue.value = "Categoria não encontrada";
        }
    } else {
        taxValue.value = "Produto não encontrado";
    }
});

select.addEventListener('change', function() {
    var selectedProductName = this.value; 
    var selectedProduct = produtos.find(function(produto) {
        return produto.product === selectedProductName;
    });

    if(selectedProduct){
        var foundPrice = produtos.find(function(produto){
            return produto.product === selectedProduct.product
        });
        
        if(foundPrice){
            unitPrice.value = foundPrice.unit
        }else{
            unitPrice.value = "Preço não encontrado"
        }
    }else{
        unitPrice.value = "Preço não encontrado"
    }
})


/////////// area de teste



//////////