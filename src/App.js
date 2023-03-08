import React, {useEffect} from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { LandingPage } from "./pages/LANDINGPAGE";
import { Cart } from "./pages/CART";
import { MainView } from "./views";
import { DetailsCheck } from "./pages/DETAILSCONFIRMATION";
import { Checkout } from "./pages/CHECKOUT";
import { Essay } from "./pages/ESSAY";
import { Tracker } from "./pages/TRACKER";
import { SuccessPage } from "./pages/SUCCESS";
import ReactGA from 'react-ga'

const TRACKING_ID = process.env.REACT_APP_PUBLIC_GA_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const App = ()=>{
  useEffect(()=>{
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])
  return (
    <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainView/>}>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/article" element={<Essay/>}/>
                <Route path="/tracker" element={<Tracker/>}/>
                <Route path="/success" element={<SuccessPage/>}/>
                <Route path="/order-confirmation" element={<DetailsCheck/>}/>
              </Route>

              <Route element={<LandingPage/>}></Route>
              
            </Routes>
          </BrowserRouter>
    </div>
  )
}

export default App