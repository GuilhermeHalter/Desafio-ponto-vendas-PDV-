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
  newRow.innerHTML = `
      <td id="categoryName" onchange="verifyCategory()">${categoria.category}</td>
      <td id="TaxNameValue" onchange="verifyTax()">${categoria.tax}</td>
      <td>
        <button type="button" class="button green" id="editar-${index}">Editar</button>
        <button type="button" class="button red" id="excluir-${index}">Excluir</button>
      </td>
      `;
    

  document
    .getElementById("crudTable")
    .querySelector("tbody")
    .appendChild(newRow);  
    
    function verifyCategory(cell) {
      return new Promise((resolve, reject) => {
        const content = cell.innerHTML.trim();
        if (/[^a-zA-ZÀ-ÿ\s]/g.test(content)) {
          reject("Categoria inválida: apenas letras e espaços são permitidos.");
          cell.innerHTML = "Categoria inválida";
          alert("Categoria Invalida")
          deleteCategory(index, -1)
          updateTable()
          
        } else {
          resolve("Categoria válida.");
        }
      });
    }
    
    function verifyTax(cell) {
      return new Promise((resolve, reject) => {
        const content = cell.innerHTML.trim();
        if (!/^\d+(\.\d+)?$/.test(content)) {
          reject("Taxa inválida: apenas números são permitidos.");
          cell.innerHTML = "Taxa inválida";
          alert("Taxa Invalida")
          deleteCategory(index, -1)
          updateTable()
        } else {
          resolve("Taxa válida.");
        }
      });
    }

    
    
    const rows = document.querySelectorAll("#crudTable tbody tr");
    
    rows.forEach((row) => {
      const categoryCell = row.querySelector('td#categoryName');
      const taxCell = row.querySelector('td#TaxNameValue');
    
      if (categoryCell) {
        verifyCategory(categoryCell)
          .then((data) => {
          })
          .catch((error) => {
          });
      }
    
      if (taxCell) {
        verifyTax(taxCell)
          .then((data) => {
          })
          .catch((error) => {
          });
      }
    });
    
    
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

