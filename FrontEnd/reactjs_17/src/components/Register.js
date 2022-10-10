import React,{useState,useNavigate,useContext} from 'react';
import './register.css' ;
import logo from '../logo.png';
import axios from 'axios';
import { useLocation ,Link} from 'react-router-dom';
import DataContext from '../context/DataProvider';
import Swal from 'sweetalert2';
import * as FaIcons from 'react-icons/fa';
import LoadingAnimation from './LoadingAnimation';

export default function Register() {

  const [userData,setUserData]=useState({
    nom:"",
    prenom:"",
    identifiant:"",
    email:"",
    Civilite:"",
    password:"",
    Confirm_password:"",
    errorList:[]
  });
  const {setAuth,user,setUser}= useContext(DataContext);

  const HandleInput = (e) => {
    e.persist();
    setUserData({...userData,[e.target.name]:e.target.value});
  } 

  var ErrorsList = [];
  
 const HandleRegister = (e) => {
    e.preventDefault();

    LoadingAnimation();
    const Data={
      nom:userData.nom,
      prenom:userData.prenom,
      identifiant:userData.identifiant,
      email:userData.email,
      Civilite:userData.Civilite,
      password:userData.password,
      Confirm_password:userData.Confirm_password,
    };

    axios.get('/sanctum/csrf-cookie',{withCredentials:true}).then(response => {
      axios.post('api/Register',Data).then(res => {
        if(res.data.status === 200){
         Swal.fire({
           icon: 'success',
           text: res.data.message,
           timer: 1500,
           showConfirmButton: false,
         });
        }else{
          setUserData({...userData,errorList: res.data.validation_errors});
            
          ErrorsList = [
           res.data.validation_errors.nom,
           res.data.validation_errors.prenom,
           res.data.validation_errors.identifiant,
           res.data.validation_errors.email,
           res.data.validation_errors.Civilite,
           res.data.validation_errors.password,
           res.data.validation_errors.Confirm_password
         ];

         let i = 1;

         Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erreur',
          text: 'Les Champs (*) et Obligatoir',
          html: "<ul style='list-style: none; color:#fff;  text-align: start; margin:0;'>"+
                   ErrorsList.map((item) =>{
                     if(item == undefined)
                     {return ("");}else{
                       return (
                         "<li style='color:red;'>"+ i++ + " - " +  item[0] +"</li>"
                         ); 
                     }
                   })
                 +"</ul>",
          showConfirmButton: true,
          allowOutsideClick:false,
          showCloseButton:true,
          cancelButtonColor: 'gray',
          confirmButtonColor: '#1873cf',
        });

        }
      });
    });
  } 

  const ValidationErrors_style={
    color:"red",
    fontSize:'17px'
  }



    const inputstyle={
      width: '100%',
      border: '1px solid #d9d9d9',
      margin: '0',
      textAlign: 'left',
    }

    const BtnLoginStyle = {
      display: 'flex',
      gap: '6px',
      fontSize: '16px',
      padding: '11px 20px',
      borderRadius: '2px',
      justifyContent: 'center',
      alignItems: 'center',
    };

  return (
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo w-100 d-flex justify-content-center">
              <img src={logo} style={{width:"252px"}} alt="logo"/>
              </div>
              <h4>Inscription</h4>
              <h6 className="font-weight-light">Inscrie Vous ici pour Continue </h6>
              <form className="pt-3" onSubmit={HandleRegister}>
                <div className='row'> 
                  <div className='col-md-6' style={{paddingRight:'2px'}}> 
                    <div className="form-group">
                      <input type="text"  style={inputstyle} name='nom' onChange={HandleInput} className="form-control form-control-lg" value={userData.nom} id="Nom_Input" placeholder="Nom"/>
                      <span style={ValidationErrors_style}>{userData.errorList.nom}</span>
                    </div> 
                  </div>
                  <div className='col-md-6' style={{paddingLeft:'2px'}}> 
                    <div className="form-group">
                     <input type="text" value={userData.prenom} name='prenom' onChange={HandleInput} className="form-control form-control-lg m-0 w-100" style={{border: '1px solid #9e9d9d61',textAlign:'start'}} id="Prenom_Input" placeholder="Prenom"/>
                     <span style={ValidationErrors_style}>{userData.errorList.prenom}</span>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                   <select defaultValue={userData.Civilite} name='Civilite' onChange={HandleInput} className="form-control form-control-lg" id="Civilite_Input">
                     <option key='0' value='Default'>Civilité</option>
                     <option key='Mr' value='Mr'>Mr</option>
                     <option key='Mme' value='Mme'>Mme</option>
                     <option key='Mlle' value='Mlle'>Mlle</option>
                   </select>
                   <span style={{color:'red'}}>{userData.errorList.Civilite}</span>
                </div>
                <div className="form-group">
                  <input type="email" name='email' onChange={HandleInput}  value={userData.email} className="form-control form-control-lg " id="exampleInputEmail1" placeholder="Adresse e-mail"/>
                  <span style={ValidationErrors_style}>{userData.errorList.email}</span>
                </div>
                <div className="form-group">
                  <input type="text" name='identifiant' onChange={HandleInput}  value={userData.identifiant} className="form-control form-control-lg m-0 w-100" style={{border: '1px solid #9e9d9d61',textAlign:'start'}} id="exampleInputEmail1" placeholder="identifiant"/>
                  <span style={ValidationErrors_style}>{userData.errorList.identifiant}</span>
                </div>
                <div className="form-group">
                  <input type="password" name='password' onChange={HandleInput} value={userData.password} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="mot de passe"/>
                  <span style={ValidationErrors_style}>{userData.errorList.password}</span>
                </div>
                <div className="form-group">
                  <input type="password" name='Confirm_password' onChange={HandleInput} value={userData.Confirm_password} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Confirmer mot de passe"/>
                  <span style={ValidationErrors_style}>{userData.errorList.Confirm_password}</span>
                </div>
                <div className="mt-3">
                  <button className="btn BtnStyle btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type='submit'><FaIcons.FaUserPlus/> Valider</button>
                </div>
                <div className="text-center mt-2 font-weight-light">
                   <Link to="/Login" style={BtnLoginStyle} className="btn BtnStyle btn-block btn-primary btn-lg font-weight-medium auth-form-btn"><FaIcons.FaSignInAlt/> Connexion</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    
  </div>
  );
}