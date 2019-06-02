import React, { Component } from 'react'

import AdminView from './AdminView'
import ShopView from './ShopView'
import CartView from './CartView'


class HomePage extends Component {
  //add class instance state member

  state = {
    nameOfItemOnSale: 'hello world',
    showAdminView: false,
    editSaleItem: false,
    productList: [
      {
        productName: 'Hammer',
        description: 'You know what a hammer is',
        price: 12.3
      },
      {
        productName: 'Nail',
        description: 'Nail',
        price: 0.12
      }
    ],
    cartList: []
  };


  // constructor(){
  //   super();

  //   this.state = {
  //     productList: [],
  //     nameOfItemOnSale: 'hello world'
  //   };
  // }

  toggleEditSaleItem = () => {
    const editSaleItem = !this.state.editSaleItem
    this.setState({editSaleItem})
  }
  toggleAdminView = () => {
    const showAdminView = !this.state.showAdminView
    this.setState({ showAdminView })
  };

  handleItemCurrentlyOnSaleChange = (event) => {
    const itemCurrentlyOnSale = event.target.value
    this.setState(
      {
        nameOfItemOnSale: itemCurrentlyOnSale,
      }
    )
  };

  addNewProductToProductList = (newProduct) => {
    let currentProductList = [...this.state.productList];

    //add product to product list
    //productList.push(newProduct)
    currentProductList.push(newProduct)

    //update state's product list
    this.setState({
      productList: currentProductList
    })
  };

  deleteProductFromListByIndex = (productToDelete) => {
    //get state's product list
    let currentProductList = [...this.state.productList]

    //remove product from list
    //productList.splice(productToDelete, 1)
    currentProductList.splice(productToDelete, 1)

    //update state's product list
    this.setState({
      productList: currentProductList
    })
  };
  
  addProductToCart = (index) => {
    const product = {...this.state.productList[index]}
    const cartList = [...this.state.cartList]

    cartList.push(product)

    this.setState({cartList})
  };

  removeProductFromCart = (index) => {
    const cartList =  [...this.state.cartList ]

    cartList.splice(index, 1)

    this.setState({cartList})
  };

  render() {
    const adminView = <AdminView
      productList={this.state.productList}
      addNewProductToProductList={this.addNewProductToProductList}
      deleteProductFromListByIndex={this.deleteProductFromListByIndex}
    />
    const shopView = <ShopView
      productList={this.state.productList}
      
      addProductToCart={this.addProductToCart} />

    return (
      <div>
        <div>
          <div id="home-page-nav">
            <h1>Hardware Store</h1>
            <span>Currently On Sale: {this.state.nameOfItemOnSale}!</span>

            <div>
              {
                <div>
                  <input
                    onChange={this.handleItemCurrentlyOnSaleChange}
                    type="text"
                  />
                </div>
              }
            </div>
            <div>
              <button onClick={this.toggleEditSaleItem}>
                'Edit Sale Item'
              </button>
            </div>
            <div>
              <button onClick={this.toggleAdminView}>
                'Show Admin View'
              </button>
            </div>
          </div>
        </div>

        <div id="view-container">
          {this.state.showAdminView ? adminView : shopView}
          <CartView
            productList = {this.state.cartList}
            removeProductFromCart={this.removeProductFromCart}/>
        </div>
      </div>


    )
  }
}

export default HomePage