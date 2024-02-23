const getLocalStorageProduct = () =>
    JSON.parse(localStorage.getItem("db_produto")) ?? [];

const readProduct = getLocalStorageProduct();

const product = JSON.parse(localStorage.getItem("db_produto"));
console.log(product)

const selectProduct = document.getElementById("select");

    product.forEach((item) => {
        const newOption = document.createElement("option");
        newOption.text = JSON.stringify(item.product);

        selectProduct.appendChild(newOption);
    })


////////// Area de teste

const tax = JSON.parse(localStorage.getItem("db_produto"));





/////////
   


