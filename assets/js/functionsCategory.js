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
      if(tax.value < 0){
        alert("Por favor insira um valor positivo")
        deleteCategory(index);
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
      <td>${categoria.category}</td>
      <td>${categoria.tax}%</td>
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
        const response = confirm(`Deseja realmente excluir a categoria ${category.category}`);
        if (response) {
          deleteCategory(index);
          updateTable();
        }
      }
    }
  };
  
  updateTable();
  
  document.getElementById("salvar").addEventListener("click", saveCategory);
  
  document.getElementById("crudTable").querySelector("tbody").addEventListener("click", editDelete);
  
  