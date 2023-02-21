getProducts();

function getProducts(searchValue) {
  apiGetProducts(searchValue).then((response) => {
    const products = response.data.map((product) => {
      return new Product(
        product.id,
        product.name,
        product.price,
        product.image,
        product.type
      );
    });
    renderProducts(products);
  });
}

function renderProducts(products) {
  let html = products.reduce((result, product, index) => {
    return (
      result +
      `
      <tr>
        <td>${index + 1}</td>
        <td>${product.type}</td>
        <td>${product.name}</td>
        <td>
          <img src="${product.image}" with="60" height="60" />
        </td>
        <td>${product.price}$</td>
        <td>
          <button class="btn btn-primary" onclick="selectProduct('${
            product.id
          }')">Update</button>
          <button class="btn btn-danger mt-1" onclick="deleteProduct('${
            product.id
          }')">Delete</button>
        </td> 
      </tr>
    `
    );
  }, " ");

  getElement("#tableDanhSach").innerHTML = html;
}

function createProduct() {
  const product = {
    name: getElement("#name").value,
    price: getElement("#price").value,
    image: getElement("#image").value,
    type: getElement("#type").value,
  };

  let isValid = validateForm();

  if (!isValid) {
    return;
  }

  apiCreateProduct(product).then((response) => {
    getProducts();
    resetForm();
    $("#myModal").modal("hide");
  });
}

function deleteProduct(productId) {
  apiDeteleProduct(productId).then(() => {
    getProducts();
  });
}

function selectProduct(productId) {
  apiGetProductById(productId).then((response) => {
    const product = response.data;
    getElement("#name").value = product.name;
    getElement("#image").value = product.image;
    getElement("#price").value = product.price;
    getElement("#type").value = product.type;

    getElement(".modal-title").innerHTML = "Update Product";
    getElement(".modal-footer").innerHTML = `
        <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button class="btn btn-primary" onclick="updateProduct('${product.id}')">Update</button>  
      `;
    $("#myModal").modal("show");
  });
}

function updateProduct(productId) {
  const product = {
    name: getElement("#name").value,
    price: getElement("#price").value,
    image: getElement("#image").value,
    type: getElement("#type").value,
  };

  let isValid = validateForm();

  if (!isValid) {
    return;
  }

  apiUpdateProduct(productId, product).then(() => {
    getProducts();
    resetForm();
    $("#myModal").modal("hide");
  });
}

getElement("#btnThem").addEventListener("click", () => {
  getElement(".modal-title").innerHTML = "Add Product";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-secondary" data-dismiss="modal">Cancel</button>
    <button class="btn btn-primary" onclick="createProduct()">Add</button>  
  `;
});

getElement("#txtSearch").addEventListener("keydown", (e) => {
  // event là một obj chứa thông tin về sự kiện được phát sinh
  // event.target: trả ra cái element phát sinh ra sự kiện
  if (e.key !== "Enter") return;

  const searchValue = e.target.value;
  getProducts(searchValue);
});

function resetForm() {
  getElement("#name").value = "";
  getElement("#image").value = "";
  getElement("#price").value = "";
}

function validateForm() {
  let isValid = true;

  let name = getElement("#name").value;
  let price = getElement("#price").value;
  let image = getElement("#image").value;

  if (!name.trim()) {
    isValid = false;
    getElement("#tbName").style.display = "block";
    getElement("#tbName").innerHTML = "This field is required.";
  } else {
    getElement("#tbName").style.display = "none";
  }

  if (!price.trim()) {
    isValid = false;
    getElement("#tbPrice").style.display = "block";
    getElement("#tbPrice").innerHTML = "This field is required.";
  } else {
    getElement("#tbPrice").style.display = "none";
  }

  if (!image.trim()) {
    isValid = false;
    getElement("#tbImage").style.display = "block";
    getElement("#tbImage").innerHTML = "This field is required.";
  } else {
    getElement("#tbImage").style.display = "none";
  }

  return isValid;
}

function getElement(selector) {
  return document.querySelector(selector);
}
