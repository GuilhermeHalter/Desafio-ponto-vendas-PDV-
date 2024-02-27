const getHistory = () => JSON.parse(localStorage.getItem('db_category')) ?? [];
const setHistory = (history) => localStorage.setItem('db_category', JSON.stringify(history));

const renderHistory = () => {
  const history = getHistory();
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  history.forEach((item) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${item.index}</td>
    <td>${item.tax}</td>
    <td>${item.total}</td>
    <td>
    <button>
    <a href="view-details.html?item=${item.id}" class="secundary-button">Detalhes
    </button>
    </td>
    `;
    tbody.appendChild(newRow);
  });
};

renderHistory();