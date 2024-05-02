import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {TabletsContextProvider} from "./context/TabletsContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <TabletsContextProvider>
          <App />
      </TabletsContextProvider>
  </React.StrictMode>
)
