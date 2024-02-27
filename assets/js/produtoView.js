
const renderDetails = () => {
  const selectedArray = JSON.parse(localStorage.getItem('selectedArray'));
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';

  const lastItem = selectedArray.pop();

  selectedArray.forEach((item) => {
    const detailRow = document.createElement('tr');
    detailRow.innerHTML = `
      <td>${item.product}</td>
      <td>${item.amount}</td>
      <td>R$${item.unit}</td>
      <td>${item.tax}%</td>
      <td>R$${item.total}</td>
    `;
    tbody.appendChild(detailRow);
    document.getElementById("Total").textContent = `O valor total foi de R$ ${lastItem.total};`
    document.getElementById("Tax").textContent = `O valor da taxa foi de R$ ${lastItem.tax};`
    document.getElementById("valueWithTax").textContent = `O valor da taxa foi de R$ ${lastItem.tax + lastItem.total};`
  });

  console.log('Última linha:', lastItem);
};

renderDetails();




