const URL = "https://63f32799fe3b595e2edbb83b.mockapi.io/Products";

function apiGetProducts(searchValue) {
  return axios({
    method: "GET",
    url: URL,
    params: {
      type: searchValue || undefined,
    },
  });
}
