import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { LandingPage } from "./pages/LANDINGPAGE";
import { Cart } from "./pages/CART";
import { MainView } from "./views";
import { DetailsCheck } from "./pages/DETAILSCONFIRMATION";
import { Checkout } from "./pages/CHECKOUT";
import { Essay } from "./pages/ESSAY";
import { Tracker } from "./pages/TRACKER";

const App = ()=>{
  return (
    <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainView/>}>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/essay" element={<Essay/>}/>
                <Route path="/tracker" element={<Tracker/>}/>
                <Route path="/order-confirmation" element={<DetailsCheck/>}/>
              </Route>
              
            </Routes>
          </BrowserRouter>
    </div>
  )
}

export default App