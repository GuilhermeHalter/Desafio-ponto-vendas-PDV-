const tempProduct = {
  product: "1",
  amount: "2",
  unit: "3",
  category: "5",
};

const getLocalStorageCategory = () =>
  JSON.parse(localStorage.getItem("db_category")) ?? [];

const readCategory = getLocalStorageCategory();

const categoria = JSON.parse(localStorage.getItem("db_category"));
console.log(categoria);

const selectCategorias = document.getElementById("select");

categoria.forEach((item) => {
  const newOption = document.createElement("option");
  newOption.text = item.category;

  selectCategorias.appendChild(newOption);
});

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_produto")) ?? [];

const setLocalStorage = (dbProduto) =>
  localStorage.setItem("db_produto", JSON.stringify(dbProduto));

const createProduct = (product) => {
  const dbProduto = getLocalStorage();
  dbProduto.push(product);
  setLocalStorage(dbProduto);
};

const readProduct = () => getLocalStorage();

const updateProduto = (index, product) => {
  const dbProduto = readProduct();
  dbProduto[index] = product;
  setLocalStorage(dbProduto);
};

const deleteProduto = (index) => {
  const dbProduto = readProduct();
  dbProduto.splice(index, 1);
  setLocalStorage(dbProduto);
};

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

const saveProduct = (e) => {
  e.preventDefault();
  if (isValidFields()) {
    const produto = {
      product: document.getElementById("product").value,
      amount: document.getElementById("amount").value,
      unit: document.getElementById("unit-price").value,
      category: document.getElementById("select").value,
    };
    const index = parseInt(document.getElementById("product").dataset.index);
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

  const td1 = document.createElement("td");
  td1.textContent = produto.product;

  const td2 = document.createElement("td");
  td2.textContent = produto.amount;

  const td3 = document.createElement("td");
  td3.textContent = produto.unit;

  const td4 = document.createElement("td");
  td4.textContent = produto.category;

  const td5 = document.createElement("td");
  const editarButton = document.createElement("button");
  editarButton.type = "button";
  editarButton.className = "button green";
  editarButton.id = `editar-${index}`;
  editarButton.textContent = "Editar";

  const excluirButton = document.createElement("button");
  excluirButton.type = "button";
  excluirButton.className = "button red";
  excluirButton.id = `excluir-${index}`;
  excluirButton.textContent = "Excluir";

  td5.appendChild(editarButton);
  td5.appendChild(excluirButton);

  newRow.appendChild(td1);
  newRow.appendChild(td2);
  newRow.appendChild(td3);
  newRow.appendChild(td4);
  newRow.appendChild(td5);

  document.getElementById("crudTable").querySelector("tbody").appendChild(newRow);

  if (/[0-9]/g.test(td1.textContent)){
    alert("Categoria invalida (Numero inserido, apenas letras são permitidas)")
    deleteProduto(index);
    updateTable();
  }

  if(td2.textContent <= -1){
    alert("Quantidade invalida (valor negativo não permitido)")
    deleteProduto(index);
    updateTable();
  }

  if (/[a-zA-ZÀ-ÿ\s]/g.test(td2.textContent)){
    alert("Quantidade invalida (Letra inserida, apenas numeros são permitidos)")
    deleteProduto(index);
    updateTable();
  }

  if(td3.textContent <= -1){
      alert("Valor unitario invalido (valor negativo não permitido)")
      deleteProduto(index);
      updateTable();
  }

  if (/[a-zA-ZÀ-ÿ\s]/g.test(td3.textContent)){
    alert("Valor unitario invalido (Letra inserida, apenas numeros são permitidos)")
    deleteProduto(index);
    updateTable();
  }

  
};


    function verifyCategory(cell) {
      return new Promise((resolve, reject) => {
        const content = cell.innerHTML.trim();
        if (/[^a-zA-ZÀ-ÿ\s]/g.test(content)) {
          reject("Produto: apenas letras e espaços são permitidos.");
          cell.innerHTML = "Produto inválido";
          alert("Produto Invalido")
          deleteProduto(index, -1)
          updateTable()
          
        } else {
          resolve("Categoria válida.");
        }
      });
    }
    
    function verifyAmount(cell) {
      return new Promise((resolve, reject) => {
        const content = cell.innerHTML.trim();
        if (!/^\d+(\.\d+)?$/.test(content)) {
          reject("Amount inválida: apenas números são permitidos.");
          cell.innerHTML = "Amount inválido";
          alert("Amount Invalido (apenas números são permitidos)")
          deleteProduto(index, -1)
          updateTable()
        } else {
          resolve("Amount válido.");
        }
      });
    }

    function verifyUnit(cell) {
      return new Promise((resolve, reject) => {
        const content = cell.innerHTML.trim();
        if (!/^\d+(\.\d+)?$/.test(content)) {
          reject("Unit price inválida: apenas números são permitidos.");
          cell.innerHTML = "Unit price inválido";
          alert("Unit price Invalido (apenas números são permitidos)")
          deleteProduto(index, -1)
          updateTable()
        } else {
          resolve("Unit price válido.");
        }
      });
    }


    
    
    const rows = document.querySelectorAll("#crudTable tbody tr");
    
    rows.forEach((row) => {
      const categoryCell = row.querySelector('td#categoryName');
      const AmountCell = row.querySelector('td#AmountNameValue');
      const UnitCell = row.querySelector('td#UnitNameValue');
    
      if (categoryCell) {
        verifyCategory(categoryCell)
          .then((data) => {
          })
          .catch((error) => {
          });
      }
    
      if (AmountCell) {
        verifyAmount(AmountCell)
          .then((data) => {
          })
          .catch((error) => {
          });
      }

      if (UnitCell) {
        verifyUnit(UnitCell)
          .then((data) => {
          })
          .catch((error) => {
          });
      }
    });


const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
  document.getElementById("product").dataset.index = "";
};

const clearTable = () => {
  const rows = document.querySelectorAll("#crudTable tbody tr");
  rows.forEach((row) => row.remove());
};

const fillFields = (product) => {
  document.getElementById("product").value = product.product;
  document.getElementById("amount").value = product.amount;
  document.getElementById("unit-price").value = product.unit;
  document.getElementById("select").value = product.category;
  document.getElementById("product").dataset.index = product.index;
};

const editProduct = (index) => {
  const product = readProduct()[index];
  product.index = index;
  fillFields(product);
};

const updateTable = () => {
  const dbProduto = readProduct();
  clearTable();
  dbProduto.forEach((produto, index) => createRow(produto, index));
};

const editDelete = (event) => {
  if (event.target.tagName === "BUTTON") {
    const [action, index] = event.target.id.split("-");
    if (action === "editar") {
      editProduct(index);
    } else if (action === "excluir") {
      const product = readProduct()[index];
      const response = confirm(
        `Deseja realmente excluir o produto ${product.product}`
      );
      if (response) {
        deleteProduto(index);
        updateTable();
      }
    }
  }
};

document.querySelectorAll('input[type="number"]').forEach(function(input) {
  input.addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9.]/g, ''); 
  });
});

document.querySelectorAll('input[type="text"]').forEach(function(input) {
  input.addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''); 
    if (this.value.length > 25) {
      this.value = this.value.substring(0, 25); 
    }
  });
});

document.querySelectorAll('select').forEach(function(select) {
  select.addEventListener("change", function() {
    if (!this.value) {
      this.selectedIndex = -1; 
    }
  });
});

updateTable();

document.getElementById("salvar").addEventListener("click", saveProduct);

document
  .getElementById("crudTable")
  .querySelector("tbody")
  .addEventListener("click", editDelete);
