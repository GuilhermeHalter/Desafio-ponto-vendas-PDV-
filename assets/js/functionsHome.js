var produtos = JSON.parse(localStorage.getItem('db_produto')) ?? [];
var categorias = JSON.parse(localStorage.getItem('db_category')) ?? [];
var home = JSON.parse(localStorage.getItem("db_home")) ?? [];

var select = document.getElementById('select');
var amountValue = document.getElementById("amount");
var taxValue = document.getElementById("tax-value");
var taxCarrinho = document.getElementById("tax-carrinho");
var unitPrice = document.getElementById("unit-price");

produtos.forEach(function (produto) {
   var option = document.createElement('option');
   option.textContent = produto.product;
   option.value = produto.product;
   select.appendChild(option);
});

/////// area de teste

home.forEach(function(produto, index){ 
    var alltax = parseInt(produto.tax);
    if(alltax[index] + alltax[index]){
        taxCarrinho.value = alltax;
    }
        
    console.log(alltax) 
})
////////
    

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
});






/////////// area de teste

const setLocalStorage = (dbHome) =>
localStorage.setItem("db_home", JSON.stringify(dbHome));

const getLocalStorage = () =>
JSON.parse(localStorage.getItem("db_home")) ?? [];

const setLocalStorageCarrinho = (dbCarrinho) =>
localStorage.setItem("db_carrinho", JSON.stringify(dbCarrinho))

const getLocalStorageCarrinho = () =>
JSON.parse(localStorage.getItem("db_carrinho")) ?? [];

const createProduct = (product) => {
const dbHome = getLocalStorage();
dbHome.push(product);
setLocalStorage(dbHome);
};

const readProduct = () => getLocalStorage();



const updateProduto = (index, product) => {
const dbHome = readProduct();
dbHome[index] = product;
setLocalStorage(dbHome);
};

const deleteProduto = (index) => {
const dbHome = readProduct();
dbHome.splice(index, 1);
setLocalStorage(dbHome);
};

const deleteTable = (index, e) => {
    const dbHome = readProduct();
    dbHome.splice(index);
    setLocalStorage(dbHome);

    clearTable()
    };
    

const finishCarrinho = () =>{
        const dbHome = getLocalStorage();
        const dbCarrinho = getLocalStorageCarrinho();
        
        if(dbHome == 0){
            alert("Faça alguma compra antes de finalizar")
        }else{
            dbCarrinho.push(dbHome);
            setLocalStorageCarrinho(dbCarrinho);
        }
    
        deleteTable()
        clearTable()
}
    
const isValidFields = () => {
return document.getElementById("form").reportValidity();
};

const saveProduct = (e) => {
e.preventDefault();
if (isValidFields()) {
  const produto = {
    product: select.value,
    amount:  amountValue.value,
    unit: unitPrice.value,
    tax: taxValue.value,
    total: parseFloat(unitPrice.value * amountValue.value),
  };
  const index = parseInt(document.getElementById("select").dataset.index);
  if (isNaN(index)) {
    createProduct(produto);
  } else {
    updateProduto(index, produto);
  }

  updateTable();
  clearFields();
}
};

const createRow = (produto, index) => {
const newRow = document.createElement("tr");
newRow.innerHTML = `
  <td>${produto.product}</td>
  <td>R$${produto.unit}</td>
  <td>${produto.amount}</td>
  <td>R$${produto.total}</td>
  
  <td>
    <button type="button" class="button green" id="editar-${index}">Editar</button>
    <button type="button" class="button red" id="excluir-${index}">Excluir</button>
  </td>
  `;

document.getElementById("crudTable").querySelector("tbody").appendChild(newRow);
};



const clearFields = () => {
const fields = document.querySelectorAll(".modal-field");
fields.forEach((field) => (field.value = ""));
document.getElementById("select").dataset.index = "";
};


const clearTable = () => {
const rows = document.querySelectorAll("#crudTable tbody tr");
rows.forEach((row) => row.remove());
};

const fillFields = (produto) => {
document.getElementById("select").value = produto.product;
document.getElementById("amount").value = produto.amount;
document.getElementById("unit-price").value = produto.unit;
document.getElementById("select").dataset.index = produto.index;
};

const editProduct = (index) => {
const product = readProduct()[index];
product.index = index;
fillFields(product);
};

const updateTable = () => {
const dbHome = readProduct();
clearTable();
dbHome.forEach((produto, index) => createRow(produto, index));
};

console.log(updateTable())

const editDelete = (event) => {
if (event.target.tagName === "BUTTON") {
  const [action, index] = event.target.id.split("-");
  if (action === "editar") {
    editProduct(index);
  } else if (action === "excluir") {
    const product = readProduct()[index];
    const response = confirm(`Deseja realmente excluir o produto ${product.product}`);
    if (response) {
      deleteProduto(index);
      updateTable();
    }
  }
}
};

updateTable();

document.getElementById("salvar").addEventListener("click", saveProduct);

document.getElementById("crudTable").querySelector("tbody").addEventListener("click", editDelete);

document.getElementById("cancel").addEventListener("click", clearTable && deleteTable);
document.getElementById("finish").addEventListener("click", clearTable && finishCarrinho);

window.onload = function() {
    document.getElementById('unit-price').readOnly = true;
    document.getElementById('tax-value').readOnly = true;
  }

//////////