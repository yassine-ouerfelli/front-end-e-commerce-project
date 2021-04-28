import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from './Components/Cart/Cart'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams, 
  useHistory
} from "react-router-dom";
import styled from 'styled-components'

import Header from './Header/Header';
import PhonesHome from './Components/Products/PhonesProducts/PhonesHome';
import {commerce} from './lib/commerce'
import HomePage from './Components/Home/Home';
import Carousel from 'react-elastic-carousel'

function App() {
  const [cart,setCart]= useState({})
  // fetch the cart item

  const fetchCart=async()=>{
    const cart= await commerce.cart.retrieve()
    setCart(cart)
  }
  // add to cart
  const AddToCart= async(productId,quantity)=>{
    const item= await commerce.cart.add(productId,quantity)
    setCart(item.cart)
  }
  useEffect(()=>{
    fetchCart()

  },[])
  console.log(cart)
  const handleUpdateCartQuantity=async(productId,quantity)=>{
    const response = await commerce.cart.update(productId,{quantity});
    setCart(response.cart)
  }
  const handleRemoveFromCart=async(productId)=>{
    const response = await commerce.cart.remove(productId)
    setCart(response.cart)

  }
  const handleEmptyCart=async()=>{
    const response = await commerce.cart.empty()
    setCart(response.cart)
  }
  const items= [
    {id: 1, title: "https://www.annfone.com/img/cms/mobiles-phones-banner.png"},
    {id: 2, title: 'https://nextshop.pk/wp-content/uploads/2018/08/New-Refurbished-Banner.jpg'},
    {id: 3, title: 'data:image/jpeg;base64,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'},
    
  ]
  const Item= styled.img`
      
      height: 500px;
      width: 100%;
      
      
    `;

  
  

  return (
    <div className="App">
     
      <Router>
        <Header totalItems={cart.total_items}/>
         <Switch>
            <Route path='/phones' ><PhonesHome AddToCart={AddToCart} /></Route>
            <Route path='/cart'><Cart cart={cart} 
            handleUpdateCartQuantity={handleUpdateCartQuantity} 
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
            /></Route>
            
            <Route exact path='/'>
            <Carousel itemsToShow={1}>
                {items.map((item) => (
                <Item src ={item.title }key={item.id}/>
              ))}
              </Carousel>
              
              <HomePage />
            </Route>
            <Route exact path='/acess' component={()=><h2>This part is no more available</h2>}/>

            
         </Switch>

      </Router>
      
      
      
    </div>
  );
}

export default App;
