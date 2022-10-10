import './Header.css' ;
import React,{useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/DataProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';
import LoadingAnimation from './LoadingAnimation';
import UniversAcierLogo from '../logo.png';

function Header() {
  const {auth,user}= useContext(DataContext);
  const navigate=useNavigate();

  const LogoStyle = {
    width: '183px',
    height: '47px',
    opacity: '.75',
  };

  const BtnLoginStyle = {
    display: 'flex',
    gap: '6px',
    fontSize: '16px',
    padding: '11px 20px',
    borderRadius: '2px',
    width:'fit-content'
  };

  const BtnLogoutStyle = {
    display: 'flex',
    gap: '6px',
    fontSize: '18px',
    padding: '15px',
    borderRadius: '50%',
    width: 'fit-content',
  };

  const logoutsubmit=(e)=>{
    e.preventDefault();
    
    LoadingAnimation();

    axios.post(`api/Logout`).then(res => {
      if(res.data.status === 200){
        localStorage.clear();
        document.location.reload();
      }
    });
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
         <img className="UA_img" style={LogoStyle}src={UniversAcierLogo} alt='Gestion des invités'/>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 pl-4 gap-2">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Accuiel"><FaIcons.FaHome/> Accuiel</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Dashboard/Invitations/NouvelleInvitation"><FaIcons.FaPlus/> Nouvelle Invitation</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Dashboard/Invitations/ListeInvitations"><FaIcons.FaUsers/> List Des Invitations</Link>
            </li>
          </ul>
          {auth?<div className='row gap-10 d-flex align-items-center'>
           <h5 className='UserNameText m-0 d-flex align-items-center gap-2' style={{width:'fit-content',color:"#1775ba"}}>
             <FaIcons.FaUserTie/> {user.Civilite+' '+user.Prenom+' '+user.Nom}
            </h5> 
          <button onClick={logoutsubmit} type='button' style={BtnLogoutStyle} id='LogOutBtn' className="btn btn-outline-danger"><FaIcons.FaPowerOff/></button>
          </div>:
          <Link to='/Login' style={BtnLoginStyle} id='LoginBtn' className="btn btn-outline-success"><FaIcons.FaSignInAlt/> Connexion</Link>
          }
        </div>
      </div>
    </nav>
  );
}

export default Header;
