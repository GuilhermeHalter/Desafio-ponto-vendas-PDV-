const tempCategory = {
  category: "1",
  tax: "2",
};

const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_category")) ?? [];

const setLocalStorage = (dbCategory) =>
  localStorage.setItem("db_category", JSON.stringify(dbCategory));

const createCategory = (category) => {
  const dbCategory = getLocalStorage();
  dbCategory.push(category);
  setLocalStorage(dbCategory);
};

const readCategory = () => getLocalStorage();

const updateCategory = (index, category) => {
  const dbCategory = readCategory();
  dbCategory[index] = category;
  setLocalStorage(dbCategory);
};

const deleteCategory = (index) => {
  const dbCategory = readCategory();
  dbCategory.splice(index, 1);
  setLocalStorage(dbCategory);
};

const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};

const saveCategory = (e) => {
  e.preventDefault();
  if (isValidFields()) {
    const categoria = {
      category: document.getElementById("category").value,
      tax: document.getElementById("tax").value,
    };
    if (tax.value < 0) {
      alert("Por favor insira um valor positivo");
      deleteCategory(index, -1);
    }
    const index = parseInt(document.getElementById("category").dataset.index);
    if (isNaN(index)) {
      createCategory(categoria);
    } else {
      updateCategory(index, categoria);
    }


    updateTable();
    clearFields();
  }
};


const createRow = (categoria, index) => {
  const newRow = document.createElement("tr");

  const td1 = document.createElement("td");
  td1.textContent = categoria.category;

  const td2 = document.createElement("td");
  td2.textContent = categoria.tax;
  td2.id = "categoryName"

  const td3 = document.createElement("td");
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

  td3.appendChild(editarButton);
  td3.appendChild(excluirButton);

  newRow.appendChild(td1);
  newRow.appendChild(td2);
  newRow.appendChild(td3);

  document.getElementById("crudTable").querySelector("tbody").appendChild(newRow);

  if (/[0-9]/g.test(td1.textContent)){
    alert("Categoria invalida (Numero inserido, apenas letras são permitidas)")
    deleteCategory(index);
    updateTable();
  }
  if (/[a-zA-ZÀ-ÿ\s]/g.test(td2.textContent)){
    alert("Taxa invalida (Letra inserida, apenas numeros são permitidos)")
    deleteCategory(index);
    updateTable();
  }

};



const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
  document.getElementById("category").dataset.index = "";
};

const clearTable = () => {
  const rows = document.querySelectorAll("#crudTable tbody tr");
  rows.forEach((row) => row.remove());
};

const fillFields = (category) => {
  document.getElementById("category").value = category.category;
  document.getElementById("tax").value = category.tax;
  document.getElementById("category").dataset.index = category.index;
};

const editCategory = (index) => {
  const category = readCategory()[index];
  category.index = index;
  fillFields(category);
};

const updateTable = () => {
  const dbCategory = readCategory();
  clearTable();
  dbCategory.forEach((categoria, index) => createRow(categoria, index));
};

const editDelete = (event) => {
  if (event.target.tagName === "BUTTON") {
    const [action, index] = event.target.id.split("-");
    if (action === "editar") {
      editCategory(index);
    } else if (action === "excluir") {
      const category = readCategory()[index];
      const response = confirm(
        `Deseja realmente excluir a categoria ${category.category}`
      );
      if (response) {
        deleteCategory(index);
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
    if (this.value.length > 20) {
      this.value = this.value.substring(0, 20); 
    }
  });
});

document.querySelectorAll('td').forEach,
  

document.querySelectorAll('select').forEach(function(select) {
  select.addEventListener("change", function() {
    if (!this.value) {
      this.selectedIndex = -1; 
    }
  });
});



var cells = document.querySelectorAll('td');

cells.forEach(function(cell) {
    var content = cell.textContent;
    if (/[^a-zA-Z0-9]/.test(content)) {
        cell.textContent = '';
    }
});



updateTable();


document.getElementById("salvar").addEventListener("click", saveCategory);

document
  .getElementById("crudTable")
  .querySelector("tbody")
  .addEventListener("click", editDelete);

