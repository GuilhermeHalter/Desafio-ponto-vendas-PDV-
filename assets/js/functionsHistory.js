const getHistory = () => JSON.parse(localStorage.getItem("db_carrinho")) || [];

const setHistory = (history) =>
  localStorage.setItem("db_carrinho", JSON.stringify(history));

  const renderSummary = () => {
    const history = getHistory();
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
  
    history.forEach((innerArray, index) => {
      const summaryRow = document.createElement("tr");
  
      const td1 = document.createElement("td");
      td1.textContent = index + 1;
  
      const td2 = document.createElement("td");
      td2.textContent = innerArray.length + " items";
  
      const td3 = document.createElement("td");
      const verDetalhesButton = document.createElement("button");
      verDetalhesButton.textContent = "Ver detalhes";
      verDetalhesButton.addEventListener("click", () => showDetails(index));
  
      td3.appendChild(verDetalhesButton);
  
      summaryRow.appendChild(td1);
      summaryRow.appendChild(td2);
      summaryRow.appendChild(td3);
  
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
