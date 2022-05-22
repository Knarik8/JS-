// Добавьте пустые классы для Корзины товаров и Элемента корзины товаров. Продумайте,
// какие методы понадобятся для работы с этими сущностями.


class BasketList {
    constructor(container = '.products') {
        this.container = document.querySelector(container); //ссылка на контейнер(products или то , что мы передадим в класс)
        this.basket = [];
        this.productObjects = [];
        this.basketCost = 0;

        this.fetchGoods()
        this.render()
    }

    fetchGoods() {
    this.basket = [
      {id: 1, title: 'Notebook', quantity: 3, price: 20000},
      {id: 2, title: 'Mouse', quantity: 2, price: 1500},
      {id: 3, title: 'Keyboard', quantity: 5, price: 5000},
      {id: 4, title: 'Gamepad', quantity: 1, price: 4500},
    ];
  }
  getTotal() {
    return `<div class="desc">
                    <p>Итого - ${this.basketCost()} \u20bd</p>
            </div>`;
  }


  render() {
    for (const good of this.basket) {
      const productObject = new BasketItem(good); //создаем экз класса для каждого товара
      const itemCost = productObject.calcCost() //считаем стоимость каждого товала(кол-во * цену)
      console.log(productObject);
      this.productObjects.push(productObject); //храним каждый экземпляр в productObjects

      const basketCost = this.basketCost + itemCost
        this.basketCost = basketCost

        // console.log(basketCost)

      this.container.insertAdjacentHTML('beforeend', productObject.getHTMLString());
    }
          this.container.insertAdjacentHTML('afterend', (`Итого ${this.basketCost}`));


    console.log(this.basketCost)
    }

}

// элемент корзины
class BasketItem {
    constructor(product) {
        this.id = product.id
        this.title = product.title
        this.quantity = product.quantity
        this.price = product.price
    }
    calcCost() {
        return this.quantity * this.price
    }

    getHTMLString() {
    return `<div class="product-item" data-id="${this.id}">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <h3>Количество - ${this.quantity}</h3>
                    <p>Цена за шт. - ${this.price} \u20bd</p>
                    <p>Итого - ${this.calcCost()} \u20bd</p>
                </div>
            </div>`;
  }

}

new BasketList();