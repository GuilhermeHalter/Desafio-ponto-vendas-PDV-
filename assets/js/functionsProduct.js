var selectedRow = null

function onFormSubmit(e) {
        e.preventDefault();
        var formData = readFormData();
        if (selectedRow == null){
            insertNewRecord(formData);
		}
        else{
            updateRecord(formData);
		}
        resetForm();    
}

//Retrieve the data
function readFormData() {
    var formData = {};
    formData["product"] = document.getElementById("product").value;
    formData["amount"] = document.getElementById("amount").value;
    formData["unit"] = document.getElementById("unit-price").value;
    formData["category"] = document.getElementById("category").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("crudTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.product;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.amount;
    cell3 = newRow.insertCell(2);
		cell3.innerHTML = data.unit;
    cell4 = newRow.insertCell(3);
		cell4.innerHTML = data.category;
    cell4 = newRow.insertCell(4);
        cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("product").value = selectedRow.cells[0].innerHTML;
    document.getElementById("amount").value = selectedRow.cells[1].innerHTML;
    document.getElementById("unit-price").value = selectedRow.cells[2].innerHTML;
    document.getElementById("category").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.product;
    selectedRow.cells[1].innerHTML = formData.amount;
    selectedRow.cells[2].innerHTML = formData.unit;
    selectedRow.cells[3].innerHTML = formData.category;
}

//Delete the data
function onDelete(td) {
    if (confirm('Do you want to delete this record?')) {
        row = td.parentElement.parentElement;
        document.getElementById('crudTable').deleteRow(row.rowIndex);
        resetForm();
    }
}

//Reset the data
function resetForm() {
    document.getElementById("product").value = '';
    document.getElementById("amount").value = '';
    document.getElementById("unit-price").value = '';
    document.getElementById("category").value = '';
    selectedRow = null;
}