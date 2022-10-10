import React,{useState,useContext,useEffect} from 'react';
import './register.css' ;
import './Dashboard.css' ;
import { Link ,useNavigate} from 'react-router-dom';
import DataContext from '../context/DataProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Faicons from 'react-icons/fa';
import LoadingAnimation from './LoadingAnimation';

function ListeInvitations() {

  const [AllInvitations,setAllInvitations]=useState([]);

  //const HandleEdit = (e) => {setEdit(!Edit);}

  const {Auth,setAuth,user,setUser}= useContext(DataContext);

  const navigate = useNavigate();

  useEffect(()=>{
    axios.get(`api/AllInvitations`).then(res => {
      if(res.data.status === 200){
        setAllInvitations(res.data.Invitations);
      }
    });
  },[])
  

  const DeleteSubmit = (e,Id) => {
    e.preventDefault();
    LoadingAnimation();

      axios.delete(`api/DeleteInvitation/${Id}`).then(res => {
        if(res.data.status === 200){
          Swal.fire({
            icon: 'success',
            text: res.data.message,
            timer: 1500,
            showConfirmButton: false,
          });
          setAllInvitations(res.data.Invitations);
        }else{
          Swal.fire({
            icon: 'error',
            text: res.data.message,
            showConfirmButton: true,
          });
        }
      });
  }


  const EditSubmit = (e,id) => {
    e.preventDefault();
    LoadingAnimation();

    navigate(`/Dashboard/Invitations/ModifierInvitation/${id}`);
  }



  const btnstyle={
    padding: '7px 18px',
    width: 'fit-content',
  }

  const TitleStyle = {
    padding: '15px',
    color: '#19a2d0',
    fontSize: '25px',
    letterSpacing: '1px',
    borderBottom: '4px solid',
    width: 'fit-content',
    marginBottom: '18px',
  }


  return (
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-start auth pt-4 p-0">
        <div className="row w-100 mx-0 justify-content-center px-2">
          <div className="col w-90">
            <div className="auth-form-light text-left py-4 px-3">
              <h4 style={TitleStyle}>Liste des invitations :</h4>
              <div className='TableContainer'>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">L'invité</th>
                    <th scope="col">Email</th>
                    <th scope="col">Type Invitation</th>
                    <th scope="col">Entreprise</th>
                    <th scope="col">Poste</th>
                    <th scope="col">DateEntre</th>
                    <th scope="col">Site</th> 
                    <th scope="col">Récipteur</th>
                    <th scope="col">Commentaire</th>
                    <th scope="col">Actions</th> 
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {AllInvitations?(
                   AllInvitations.map((item) =>(
                    <tr key={item.Id}>
                    <th scope="row">{item.Id}</th>
                    <td>{item.Civilite+' '+item.Prenom+' '+item.Nom}</td>
                    <td>{item.Email}</td>
                    <td>{item.Type_Invitation}</td>
                    <td>{item.Entreprise}</td>
                    <td>{item.Poste}</td>
                    <td>{item.DateEntre}</td>
                    <td>{item.Site}</td>
                    <td>{item.user.Civilite+' '+item.user.Prenom+' '+item.user.Nom}</td>
                    <td>{item.Commentaire}</td>
                    <td>
                      <div className='row gap-2 justify-content-center flex-row flex-nowrap'>
                        <button type="button" style={btnstyle} onClick={(e)=>DeleteSubmit(e,item.Id)}  id='BtnDelete' className="btn btn-danger"><Faicons.FaTrashAlt/></button>
                        <button type="button" style={btnstyle} onClick={(e)=>EditSubmit(e,item.Id)} id='BtnEdit' className="btn btn-primary"><Faicons.FaPenAlt/></button>
                      </div>
                    </td> 
                  </tr>
                  ))
                  ):''
                  }
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ListeInvitations;