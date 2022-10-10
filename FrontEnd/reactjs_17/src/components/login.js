import React,{useState,useContext,useEffect} from 'react';

import axios from 'axios';
import * as Faicons from 'react-icons/fa';
import './login.css' ;
import logo from '../logo.png';
import { useLocation ,Link,useNavigate} from 'react-router-dom';
import DataContext from '../context/DataProvider';
import Swal from 'sweetalert2';
import LoadingAnimation from './LoadingAnimation';

export default function Login() {
  const [userData,setUserData]=useState({
    identifiant:"",
    password:"",
    errorList:[]
  });
  const {auth,setAuth,user,setUser}= useContext(DataContext);

  let navigate = useNavigate();

  const HandleInput = (e) => {
    e.persist();
    setUserData({...userData,[e.target.name]:e.target.value});
  } 

  const [Loading, setLoading] = useState(true);
  const [StopLoading, setStopLoading] = useState(false);

  useEffect(() =>{
    Swal.close();
    axios.get('api/checkingAuthenticated').then(res =>{
      if(res.status === 200)
      {
        setAuth(true);
        setUser(res.data.user);
        setStopLoading(true);
        setLoading(false);
        Swal.close();
      }
      else{
        setAuth(false); 
        setStopLoading(true);
        setLoading(false);
        Swal.close();
        document.location.reload();
      }
      setLoading(false);
      Swal.close();
    });
  }, []);



  let ErrorsList = [];
  
 const HandleLogin = (e) => {
    e.preventDefault();
    
    LoadingAnimation();

    const Data={
    identifiant:userData.identifiant,
    password:userData.password,
    };

    axios.get('/sanctum/csrf-cookie',{withCredentials:true}).then(response => {
      axios.post('api/Login',Data).then(res => {
         if(res.data.status === 200){
          localStorage.setItem('auth_token',res.data.token);
          setAuth(true);
          setUser(res.data.user);
          navigate('/Accuiel');

          Swal.fire({
            icon: 'success',
            text: res.data.message,
            timer: 1500,
            showConfirmButton: false,
          });
         }else if(res.data.status === 404){
          Swal.fire({
            icon: 'error',
            text: res.data.message,
            showConfirmButton: true,
          });
         }else{
            setUserData({...userData,errorList: res.data.validation_errors});
              
            ErrorsList = [
             res.data.validation_errors.identifiant,
             res.data.validation_errors.password,
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

  const BtnLoginStyle = {
    display: 'flex',
    gap: '6px',
    fontSize: '16px',
    padding: '11px 20px',
    borderRadius: '2px',
  };


  return (
<div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-center auth  p-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo w-100 d-flex justify-content-center">
                <img src={logo} style={{width:"252px"}} alt="logo"/>
              </div>
              <h4>Bonjour ! </h4>
              <h6 className="font-weight-light">Connecter Vous pour continue.</h6>
              <form className="pt-3" >
                <div className="form-group">
                  <input type="text" name='identifiant' onChange={HandleInput}  value={userData.identifiant} className="form-control form-control-lg m-0 w-100" style={{border: '1px solid #9e9d9d61',textAlign:'start'}} id="exampleInputEmail1" placeholder="identifiant"/>
                  <span style={ValidationErrors_style}>{userData.errorList.identifiant}</span>
                </div>
                <div className="form-group">
                  <input type="password" name='password' onChange={HandleInput} value={userData.password} className="form-control form-control-lg" id="exampleInputPassword1" placeholder="mot de passe"/>
                  <span style={ValidationErrors_style}>{userData.errorList.password}</span>
                </div>
                <div className="mt-3 mb-2">
                  <a className="btn BtnStyle btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={HandleLogin} > <Faicons.FaSignInAlt/> Connexion</a>
                </div>
                <div className="mb-2">
                  <Link to="/Register" className="btn BtnStyle btn-block btn-facebook auth-form-btn">
                    <i className="ti-facebook mr-2"></i> <Faicons.FaUserPlus/> Inscrire
                  </Link>
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

