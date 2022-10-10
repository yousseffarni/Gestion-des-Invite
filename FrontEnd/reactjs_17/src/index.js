import React from 'react';
import ReactDOM from 'react-dom'; 
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './components/login';
import Register from './components/Register';
import {DataProvider} from './context/DataProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
     <DataProvider>
      <Routes>
       <Route path='/Login' element={<Login/>}/>
       <Route path='/Register' element={<Register/>}/>
       <Route path='/*' element={<App/>}/>
      </Routes>
     </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
