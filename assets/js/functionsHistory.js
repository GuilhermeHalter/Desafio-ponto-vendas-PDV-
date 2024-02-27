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
      this.selectedIndex = -1; /
    }
  });
});



renderSummary();
