const products = [
    {id: 1, title: 'Notebook', price: 1000},
    {id: 2, title: 'Mouse', price: 100},
    {id: 3, title: 'Keyboard', price: 250},
    {id: 4, title: 'Gamepad', price: 150},
];

const getProductHTMLString = (title, price) => {
    return `<div class="product-item">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="by-btn">Добавить</button>
            </div>`;
};

// const renderProducts = (productList) => {
//   const list = productList.map((good) => getProductHTMLString(good.title, good.price));
//
//   document.querySelector('.products').innerHTML = list.join('');
//     console.log(list);
// }
//
// renderProducts(products);

const renderProducts = (productList = products) => {
  const list = productList.map((good) => getProductHTMLString(good.title, good.price));

  document.querySelector('.products').innerHTML = list.join('');
    console.log(list);
}

renderProducts();
