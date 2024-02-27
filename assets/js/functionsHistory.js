const getHistory = () => JSON.parse(localStorage.getItem("db_carrinho")) || [];

const setHistory = (history) =>
  localStorage.setItem("db_carrinho", JSON.stringify(history));

const renderSummary = () => {
  const history = getHistory();
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  history.forEach((innerArray, index) => {
    const summaryRow = document.createElement("tr");
    summaryRow.innerHTML = `
      <td>${index + 1}</td>
      <td>${innerArray.length} items</td>
      <td>
        <button onclick="showDetails(${index})">Ver detalhes</button>
      </td>
    `;
    tbody.appendChild(summaryRow);
  });
};

const showDetails = (index) => {
  const history = getHistory();
  const selectedArray = history[index];
  localStorage.setItem("selectedArray", JSON.stringify(selectedArray));
  window.location.href = "produtoView.html";
};

renderSummary();
