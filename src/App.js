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
import ReactGA from 'react-ga4'
import { AdminView } from "./views/adminDashboard";
import { AllTransactions } from "./pages/ALL_TRANSACTIONS";

const TRACKING_ID = process.env.REACT_APP_GA
ReactGA.initialize(TRACKING_ID);

const App = ()=>{
  
  useEffect(()=>{
    ReactGA.send({ hitType: "pageview", page:window.location.pathname, title: "Page visit" })
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

              <Route path="/admin" element={<AdminView/>}>
                <Route path="/admin/transactions/123" element={<AllTransactions/>}/>
              </Route>

              <Route element={<MainView/>}></Route>
              
            </Routes>
          </BrowserRouter>
    </div>
  )
}

export default App