const renderDetails = () => {
  const selectedArray = JSON.parse(localStorage.getItem("selectedArray"));
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";

  const lastItem = selectedArray.pop();

  
  selectedArray.forEach((item) => {
    const detailRow = document.createElement("tr");

    const td1 = document.createElement("td");
    td1.textContent = item.product;
  
    const td2 = document.createElement("td");
    td2.textContent = item.amount;
  
    const td3 = document.createElement("td");
    td3.textContent = item.unit;

    const td4 = document.createElement("td");
    td4.textContent = item.tax;
  
    const td5 = document.createElement("td");
    td5.textContent = item.total;
  
    detailRow.appendChild(td1);
    detailRow.appendChild(td2);
    detailRow.appendChild(td3);
    detailRow.appendChild(td4);
    detailRow.appendChild(td5);

    document.getElementById("crudTable").querySelector("tbody").appendChild(detailRow);
    tbody.appendChild(detailRow);
    document.getElementById(
      "Total"
    ).textContent = `O valor total foi de R$ ${lastItem.total};`;
    document.getElementById(
      "Tax"
    ).textContent = `O valor da taxa foi de R$ ${lastItem.tax};`;
    document.getElementById(
      "valueWithTax"
    ).textContent = `O valor da taxa foi de R$ ${
      lastItem.tax + lastItem.total
    };`;
  });



  console.log("Última linha:", lastItem);
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
      this.selectedIndex = -1;
    }
  });
});

renderDetails();
