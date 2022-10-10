import React,{useState,useContext,useEffect} from 'react';
import './Dashboard.css' ;
import { Link ,Outlet,Navigate} from 'react-router-dom';
import DataContext from '../context/DataProvider';
import Header from './Header';
import Footer from './Footer/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Faicons from 'react-icons/fa';


function Dashboard() {


  const {auth,setAuth,user,setUser}= useContext(DataContext);

  return (
    <div className='dahsboard'>
     <Header/>
     <div className="UnderHeaderFixer"></div>
     <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-start auth pt-4 p-0">
          <div className="row w-100 mx-0 justify-content-center px-2">
           <Outlet/>
          </div>
        </div>
      </div>
     </div>
     <Footer/>
    </div>
  );
}

export default Dashboard;