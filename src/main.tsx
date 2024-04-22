import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import RoutesApp from './Router/RoutesApp.tsx'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux'
import store from './Config/redux/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store} >
      <ToastContainer />
      <RoutesApp />
    </Provider>
  </React.StrictMode>,
)
