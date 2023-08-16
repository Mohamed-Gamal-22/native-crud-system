let nameInput = document.querySelector("#myName");
let priceInput = document.querySelector("#myPrice");
let categoryInput = document.querySelector("#myCategory");
let descriptionInput = document.querySelector("#myDescription");
let searchInput = document.querySelector("#searchInput");
let tableBody = document.querySelector("#tableBody");
let addBtn = document.querySelector("#myButton");
let updateBtn = document.querySelector("#update");
let validNameAlert = document.querySelector("#validNameAlert");
let validPriceAlert = document.querySelector("#validPriceAlert");

let allProducts;

configureStore();

// add product to screen and localstorage
function addProduct() {
  if (validName() && validPrice()) {
    let product = {
      name: nameInput.value,
      price: priceInput.value,
      category: categoryInput.value,
      desc: descriptionInput.value,
    };

    allProducts.push(product);
    localStorage.setItem("products", JSON.stringify(allProducts));
    display();
    clear();
  }
}

// display all data on screen based on localstorage
function display() {
  cartona = "";

  allProducts.forEach((product, index) => {
    cartona += `<tr>
        <th>${product.name}</th>
        <th>${product.price}</th>
        <th>${product.category}</th>
        <th>${product.desc}</th>
        <th><div class="btn btn-warning" onclick="configurUpdate(${index})">update</div></th>
        <th><div class="btn btn-danger" onclick="deleteProduct(${index})">delete</div></th>
      </tr>`;
  });

  tableBody.innerHTML = cartona;
}

// delete product based on it's index
function deleteProduct(index) {
  allProducts.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(allProducts));
  display();
}

// index of product i want to update values;
let indexOfeditableProduct;

/* 
   hide add btn and show update btn
   configure data i want to edit inside inputs
   determind the index of the product i want to edit
*/
function configurUpdate(index) {
  addBtn.classList.replace("d-flex", "d-none");
  updateBtn.classList.replace("d-none", "d-flex");

  nameInput.value = allProducts[index].name;
  priceInput.value = allProducts[index].price;
  categoryInput.value = allProducts[index].category;
  descriptionInput.value = allProducts[index].desc;

  indexOfeditableProduct = index;
}

// when i click update after edit
// create new object with new data
// remove the previous obj depend on indexOfeditableProduct variable i determind before
// add new obj insted of the previous one
// set data to save in localstorage then display
function updateProduct() {
  if (validName() && validPrice()) {
    let product = {
      name: nameInput.value,
      price: priceInput.value,
      category: categoryInput.value,
      desc: descriptionInput.value,
    };
    allProducts.splice(indexOfeditableProduct, 1, product);
    localStorage.setItem("products", JSON.stringify(allProducts));
    display();
    clear();

    addBtn.classList.replace("d-none", "d-flex");
    updateBtn.classList.replace("d-flex", "d-none");
  }
}

// search for product by name or category
// if name or category includes search input value add the obj to tr inside cartona
// then display the new data includes search values
searchInput.addEventListener("keyup", function () {
  let cartona = "";
  allProducts.forEach((product, index) => {
    if (
      product.name.toLowerCase().includes(this.value.toLowerCase()) ||
      product.category.toLowerCase().includes(this.value.toLowerCase())
    ) {
      cartona += `<tr>
            <th>${product.name.replace(
              this.value,
              `<span class="text-danger">${this.value}</span>`
            )}</th>
            <th>${product.price}</th>
            <th>${product.category.replace(
              this.value,
              `<span class="text-danger">${this.value}</span>`
            )}</th>
            <th>${product.desc}</th>
            <th><div class="btn btn-warning">update</div></th>
            <th><div class="btn btn-danger" onclick="deleteProduct(${index})">delete</div></th>
          </tr>`;
    }
  });

  tableBody.innerHTML = cartona;
});

// this function work after i run code to set allProduct to the data inside
// localstorage or set it to []
function configureStore() {
  if (localStorage.getItem("products")) {
    allProducts = JSON.parse(localStorage.getItem("products"));
    display();
  } else {
    allProducts = [];
  }
}

// clear all inpush
function clear() {
  nameInput.value = "";
  priceInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";
}

// validation name
nameInput.addEventListener("blur", validName);
function validName() {
  var regexName = /^[a-zA-Z]{3,}$/;
  if (regexName.test(nameInput.value) == true) {
    nameInput.classList.add("is-valid");
    nameInput.classList.remove("is-invalid");
    validNameAlert.classList.replace("d-flex", "d-none");
    return true;
  } else {
    nameInput.classList.remove("is-valid");
    nameInput.classList.add("is-invalid");
    validNameAlert.classList.replace("d-none", "d-flex");
    return false;
  }
}

// validation price
priceInput.addEventListener("blur", validPrice);
function validPrice() {
  var regexprice = /^(?:[1-9]\d{0,4}|99999)$/;
  if (regexprice.test(priceInput.value) == true) {
    priceInput.classList.add("is-valid");
    priceInput.classList.remove("is-invalid");
    validPriceAlert.classList.replace("d-flex", "d-none");
    return true;
  } else {
    priceInput.classList.remove("is-valid");
    priceInput.classList.add("is-invalid");
    validPriceAlert.classList.replace("d-none", "d-flex");
    return false;
  }
}
