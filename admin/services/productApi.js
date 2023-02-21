const URL = "https://63f32799fe3b595e2edbb83b.mockapi.io/Products";

function apiGetProducts(searchValue) {
  return axios({
    method: "GET",
    url: URL,
    params: {
      name: searchValue || undefined,
    },
  });
}

function apiCreateProduct(product) {
  return axios({
    method: "POST",
    url: URL,
    data: product,
  });
}

function apiDeteleProduct(productId) {
  return axios({
    method: "DELETE",
    url: `${URL}/${productId}`,
  });
}

function apiGetProductById(productId) {
  return axios({
    method: "GET",
    url: `${URL}/${productId}`,
  });
}

function apiUpdateProduct(productId, product) {
  return axios({
    method: "PUT",
    url: `${URL}/${productId}`,
    data: product,
  });
}
