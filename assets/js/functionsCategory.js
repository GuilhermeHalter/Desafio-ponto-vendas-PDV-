var selectedRow = null

function onFormSubmit(e) {
        event.preventDefault();
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
    formData["category"] = document.getElementById("category").value;
    formData["tax"] = document.getElementById("tax").value;
    return formData;
}

//Insert the data
function insertNewRecord(data) {
    var table = document.getElementById("crudTable").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
		cell1.innerHTML = data.category;
    cell2 = newRow.insertCell(1);
		cell2.innerHTML = data.tax;
    cell4 = newRow.insertCell(2);
        cell4.innerHTML = `<button onClick="onEdit(this)">Edit</button> <button onClick="onDelete(this)">Delete</button>`;
}

//Edit the data
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("category").value = selectedRow.cells[0].innerHTML;
    document.getElementById("tax").value = selectedRow.cells[1].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.category;
    selectedRow.cells[1].innerHTML = formData.tax;
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
    document.getElementById("category").value = '';
    document.getElementById("tax").value = '';
    selectedRow = null;
}