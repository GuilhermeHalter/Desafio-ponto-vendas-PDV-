const getLocalStorageCarrinho = () =>
  JSON.parse(localStorage.getItem("db_carrinho")) ?? [];

const readProduct = () => getLocalStorageCarrinho();

var carrinho = JSON.parse(localStorage.getItem("db_carrinho")) ?? [];


const produto = {
    product: 2,
    tax: 1,
    total: 3,
};

console.log(produto)

const createRow = (produto) => {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td>${produto.tax}</td>
      <td>R$${produto.total}</td>
      
      <td>
      <button>
      <a href="view-details.html?item=${produto.product}" class="secundary-button">Detalhes
      </button>
      </td>
      `;

  document
    .getElementById("crudTable")
    .querySelector("tbody")
    .appendChild(newRow);
};
console.log(createRow());

const clearFields = () => {
  const fields = document.querySelectorAll(".modal-field");
  fields.forEach((field) => (field.value = ""));
  document.getElementById("select").dataset.index = "";
};

const clearTable = () => {
  const rows = document.querySelectorAll("#crudTable tbody tr");
  rows.forEach((row) => row.remove());
};

const updateTable = () => {
  const dbCarrinho = readProduct();
  clearTable();
  dbCarrinho.forEach((produto, index) => createRow(produto, index));
};

updateTable();
