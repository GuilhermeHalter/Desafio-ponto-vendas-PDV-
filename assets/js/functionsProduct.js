const tempProduct = {
    product: "1",
    amount: "2",
    unit: "3",
    category: "5",
  };
  
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
        category: document.getElementById("category").value,
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
    newRow.innerHTML = `
      <td>${produto.product}</td>
      <td>${produto.amount}</td>
      <td>${produto.unit}</td>
      <td>${produto.category}</td>
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
    document.getElementById("category").value = product.category;
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
  
  