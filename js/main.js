const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open("GET", url, true);
//         xhr.onreadystatechange = () => {
//             if(xhr.readyState === 4){
//                 if(xhr.status !== 200){
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     })
// };


class ProductItem {
  constructor(product, img='https://via.placeholder.com/200x150') {
    this.id_product = product.id_product;
    this.product_name = product.product_name;
    this.price = product.price;
    this.img = img;
  }

  getHTMLString() {
    return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} \u20bd</p>
                    <button class="buy-btn"
                      data-id="${this.id_product}"
                      data-name="${this.product_name}"
                      data-price="${this.price}">Купить</button>
                </div>
            </div>`;
  }
}

class ProductList {
  constructor(container = '.products', url = "/catalogData.json") {
    this.container = container; //ссылка на контейнер(products или то , что мы передадим в класс
    // - то, куда мы будем скидывать свой продуктЛист )
    this.url = url; //где мы возьмем данные
    this.goods = [];  //храним результаты ответа сервера
    this.basket = basket;
    this.allProducts = []; //для экземпляров класса
    this.productObjects = []; //храним экземпляры классов
    this.getProducts()
        .then(data => this.handleData(data))

    this._init(); // инициализация класса

  }

  getProducts() {  //получаем продукты
    return fetch(`${API}/catalogData.json`)
        .then(response => response.json())
        .catch(err => console.log(err));
  }

  /**
   * обработка полученных данных
   * @param data
   */
  handleData(data) { //получаем данные, сохраняем в наш массив
    this.goods = data;
    this.render();
  }

  calcTotal() {
    let total = 0
    for (let i = 0; i < this.goods.length; i += 1) {
      total = total + this.goods[i].price
    }
    return total

  }

  render() { // отрисовываем массив, создаем экз. класса, складываем в productObjects
    for (const good of this.goods) {
      const productObject = new ProductItem(good);
      console.log(productObject);
      this.productObjects.push(productObject);

      document.getElementById('123').insertAdjacentHTML('beforeend', productObject.getHTMLString());

    }
    // document.getElementById('123').insertAdjacentHTML('beforeend', (`Итого ${this.calcTotal()}`));

  }

  _init() {
    document.getElementById('123').addEventListener('click', e => { //клики для добавления товаров в корзину
      if (e.target.classList.contains('buy-btn')) {  //если у элемента, по котороу кликаем в списке классов есть buy-btn,
        // обращаемся к корзине this.cart и добавляем элемент
        // ловим все клики по классу в html 'buy-btn' в общем блоке products
        this.basket.addProduct(e.target);
      }
    });
    //   //поиск
    //   document.querySelector('.search-form').addEventListener('submit', e => {
    //     e.preventDefault(); // отмена действий по умолчанию, чтобы страница не перезагружалась, форма никуда не отправоялась
    //     this.filter(document.querySelector('.search-field').value)
    //   })
    // }


  }
}

class BasketItem {
  constructor(product, img = 'https://via.placeholder.com/50x100') {
    this.id_product = product.id_product;
    this.product_name = product.product_name;
    this.price = product.price;
    this.quantity = product.quantity
    this.img = img;
  }
  render(){
    return `<div class="cart-item" data-id="${this.id_product}">
              <div class="product-bio">
                <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                  <p class="product-title">${this.product_name}</p>
                  <p class="product-quantity">Количество: ${this.quantity}</p>
                  <p class="product-single-price">${this.price} за ед.</p>
                </div>
              </div>
              <div class="right-block">
                <p class="product-price">${this.quantity*this.price} ₽</p>
                <button class="del-btn" data-id="${this.id_product}">&times;</button>
              </div>
          </div>`
  }
}

class BasketList{
  constructor(container = '.cart-block', url = "/getBasket.json") {
    // this.cart = cart; //ссылка на корзину
    this.container = container; //ссылка на контейнер, куда скидывам данные
    this.url = url;
    this.goods = []; //для ответов от сервера
    this.allProducts = [];
    this.getJson() //делаем запрос, получаем данные, передаем в наш handleData, который записывает их в goods
      .then(data => {
        this.handleData(data.contents);
      });
    this._init();
  }

   /**
   * получение данных с сервера
   * @param url
   * @returns {Promise<any | never>}
   */
  getJson(url){ //можно без url
    return fetch(url ? url : `${API + this.url}`) // fetch позволяет делать сетевые запросы и получать информацию с сервера
        // скачивается содержимое по адресу URL
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      })
  }

   /**
   * обработка полученных данных
   * @param data
   */
  handleData(data){ //получаем данные, сохраняем в наш массив
    this.goods = data;
    this.render();
  }

  render(){
    const block = document.querySelector(this.container);
    for (let product of this.goods){
      console.log(this.constructor.name);
      // this.constructor.name вернет нам название текущего класса и с помощью new создаст экземпляр нужного класса
      // if (this.constructor.name in this.list){
      //   const productObj = new this.list[this.constructor.name](product);
      //   console.log(productObj);
      //   this.allProducts.push(productObj);
      //   block.insertAdjacentHTML('beforeend', productObj.render());
      // } else {
      //   console.log('Такого класса не существует в list')
      // }
      // альтернативаня реализация без словаря listContext
      let productObj = null;
      if (this.constructor.name === 'ProductList') productObj = new ProductItem(product);
      if (this.constructor.name === 'BasketList') productObj = new BasketItem(product);
      if (!productObj) return;

      console.log(productObj);
      this.allProducts.push(productObj);
      block.insertAdjacentHTML('beforeend', productObj.render());
      }
    }

      _init(){
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector(this.container).classList.toggle('invisible');
    });
    document.querySelector(this.container).addEventListener('click', e => {
      if(e.target.classList.contains('del-btn')){
        this.removeProduct(e.target);
      }
    })
  }

    /**
   * добавление товара
   * @param element
   */
  addProduct(element){
    this.getJson(`${API}/addToBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if(find){
            find.quantity++;
            this._updateCart(find);
          } else {
            let product = {
              id_product: productId,
              price: +element.dataset['price'],
              product_name: element.dataset['name'],
              quantity: 1
            };
            // goods - это своего рода "опорный" массив, отражающий список товаров, которые нужно отрендерить.
            // При добавлении нового товара, нас интересует только он один.
            this.goods = [product];
            // далее вызывая метод render, мы добавим в allProducts только его, тем самым избегая лишнего перерендера.
            this.render();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * удаление товара
   * @param element
   */
  removeProduct(element){
    this.getJson(`${API}/deleteFromBasket.json`)
      .then(data => {
        if(data.result === 1){
          let productId = +element.dataset['id'];
          let find = this.allProducts.find(product => product.id_product === productId);
          if(find.quantity > 1){ // если товара > 1, то уменьшаем количество на 1
            find.quantity--;
            this._updateCart(find);
          } else { // удаляем
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
          }
        } else {
          alert('Error');
        }
      })
  }

  /**
   * обновляем данные корзины
   * @param product
   * @private
   */
  _updateCart(product){
    let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
    block.querySelector('.product-quantity').textContent = `Количество: ${product.quantity}`;
    block.querySelector('.product-price').textContent = `${product.quantity * product.price} ₽`;
  }

  };

let basket = new BasketList();
let products = new ProductList(basket)

// new ProductList()