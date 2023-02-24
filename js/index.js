// getProducts();

// function getProducts() {
//     axios({
//         method: "GET",
//         url: "https://63f716f9e8a73b486af07468.mockapi.io/api/CartProduct",
//     }).then((response) => {
//         console.log(response.data);
//         renderProducts(response.data);
//     }).catch((error) => {
//         alert("API Error");
//     });
// }

// function renderProducts(products) {
//     let html = products.reduce((result, product,index) => {
//         return (result + `
//         <tr class="test">
//             <td>${index + 1}</td>
//             <td>${product.name}</td>
//             <td>${product.screen}</td>
//             <td>${product.backCamera}</td>
//             <td>${product.frontCamera}</td>
//         </tr>
//         `
//         );
//     },"");
//     document.getElementById("overlaySP").innerHTML = html;
// }
