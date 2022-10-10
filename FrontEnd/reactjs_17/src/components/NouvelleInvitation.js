import React,{useState,useContext,useEffect} from 'react';
import './register.css' ;
import './Dashboard.css' ;
import { Link,useParams} from 'react-router-dom';
import DataContext from '../context/DataProvider';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as FaIcons from 'react-icons/fa';
import LoadingAnimation from './LoadingAnimation';

function NouvelleInvitation(props) {

  const [NouvelleInvitation, setNouvelleInvitation] = useState({
    Id: '',
    Nom: '', 
    Prenom: '', 
    Email :'',
    Civilite: '', 
    Type_Invitation: '', 
    Entreprise: '', 
    Poste: '', 
    DateEntre: '', 
    HeureEntre: '', 
    Commentaire: '', 
    ToUser_Id: '', 
    Site: '', 
    error_list: [],
  });

  
  const { id } = useParams();

  //const HandleEdit = (e) => {setEdit(!Edit);}

  const {Auth,setAuth,user,setUser}= useContext(DataContext);

  const HandleInput = (e) => {
    e.persist();
    if(e.target.name=='HeureEntre' && e.target.value.length<6){
      if(e.target.value.length == 2){
        setNouvelleInvitation({...NouvelleInvitation,[e.target.name]:e.target.value+':'});
      }else{
        setNouvelleInvitation({...NouvelleInvitation,[e.target.name]:e.target.value});
      }
    }else if(e.target.name!='HeureEntre'){
     setNouvelleInvitation({...NouvelleInvitation,[e.target.name]:e.target.value});
    }
  }

  const ResetHeureEntre = (e) => {
    e.persist();
     setNouvelleInvitation({...NouvelleInvitation,HeureEntre:''});
  }

  const VerifierSubmit = (e) => {
   e.preventDefault();
   if(props.Edit){EditInvitation(e);}
   else{AjouterInvitation(e)}
  }
  
  useEffect(()=>{
    if(props.Edit){GetInvitationData();}
  },[])

  let ErrorsList = [];
  
  
  const AjouterInvitation = (e) => {

    LoadingAnimation();

    const Data = {
      Nom: NouvelleInvitation.Nom,
      Prenom: NouvelleInvitation.Prenom,
      Email : NouvelleInvitation.Email ,
      Civilite: NouvelleInvitation.Civilite,
      Type_Invitation: NouvelleInvitation.Type_Invitation,
      Entreprise: NouvelleInvitation.Entreprise,
      Poste: NouvelleInvitation.Poste,
      DateEntre: NouvelleInvitation.DateEntre+' '+NouvelleInvitation.HeureEntre+':00',
      Commentaire: NouvelleInvitation.Commentaire,
      ToUser_Id: user.id,
      Site: NouvelleInvitation.Site,
    };

    axios.get('/sanctum/csrf-cookie',{withCredentials:true}).then(response => {
      axios.post(`api/NouvelleInvitation`,Data).then(res => {
        if(res.data.status === 200){
          Swal.fire({
            icon: 'success',
            text: res.data.message,
            timer: 1500,
            showConfirmButton: false,
          });
        }else{
          setNouvelleInvitation({...NouvelleInvitation,error_list:res.data.validation_errors});
          
          ErrorsList = [
            res.data.validation_errors.Nom,
            res.data.validation_errors.Prenom,
            res.data.validation_errors.Email,
            res.data.validation_errors.Civilite,
            res.data.validation_errors.Type_Invitation,
            res.data.validation_errors.Entreprise,
            res.data.validation_errors.Poste,
            res.data.validation_errors.DateEntre,
            res.data.validation_errors.Commentaire,
            res.data.validation_errors.ToUser_Id,
            res.data.validation_errors.Site,
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
function GetInvitationData(){

  LoadingAnimation();

    axios.get('/sanctum/csrf-cookie',{withCredentials:true}).then(response => {
      axios.get(`api/GetInvitation/${id}`).then(res => {
        if(res.data.status === 200){

          let DateEntre = new Date(res.data.Invitation.DateEntre);
          let Time = DateEntre.toLocaleTimeString('en-US',{ hour12: false })
          let NewDateEntre = `${DateEntre.getFullYear()}-${(DateEntre.getMonth()+1)<10?'0'+(DateEntre.getMonth()+1):(DateEntre.getMonth()+1)}-${DateEntre.getDate()<10?'0'+(DateEntre.getDate()):(DateEntre.getDate())}`;
          let HeureEntre = (Time.split(':',1)=='24'?'00':Time.split(':',1)) +':'+Time.split(':',2)[1];

          setNouvelleInvitation({...NouvelleInvitation,
            Id: res.data.Invitation.Id,
            Nom: res.data.Invitation.Nom,
            Prenom: res.data.Invitation.Prenom,
            Email : res.data.Invitation.Email,
            Civilite: res.data.Invitation.Civilite,
            Type_Invitation: res.data.Invitation.Type_Invitation,
            Entreprise: res.data.Invitation.Entreprise,
            Poste: res.data.Invitation.Poste,
            DateEntre: NewDateEntre,
            HeureEntre: HeureEntre,
            Commentaire: res.data.Invitation.Commentaire,
            ToUser_Id: res.data.Invitation.ToUser_Id,
            Site: res.data.Invitation.Site,
          });
          document.getElementById('Civilite_Input').value = res.data.Invitation.Civilite;
          document.getElementById('SiteInput').value = res.data.Invitation.Site;
          document.getElementById('Type_InvitationInput').value = res.data.Invitation.Type_Invitation;
         Swal.close();
        }
      });
    });
  }

  const EditInvitation = (e) => {

    LoadingAnimation();

    const Data = {
      Nom: NouvelleInvitation.Nom,
      Prenom: NouvelleInvitation.Prenom,
      Email : NouvelleInvitation.Email ,
      Civilite: NouvelleInvitation.Civilite,
      Type_Invitation: NouvelleInvitation.Type_Invitation,
      Entreprise: NouvelleInvitation.Entreprise,
      Poste: NouvelleInvitation.Poste,
      DateEntre: NouvelleInvitation.DateEntre,
      Commentaire: NouvelleInvitation.Commentaire,
      ToUser_Id: NouvelleInvitation.ToUser_Id,
      Site: NouvelleInvitation.Site,
    };
    
    axios.get('/sanctum/csrf-cookie',{withCredentials:true}).then(response => {
      axios.put(`api/EditInvitation/${NouvelleInvitation.Id}`,Data).then(res => {
        if(res.data.status === 200){
          Swal.fire({
            icon: 'success',
            text: res.data.message,
            timer: 1500,
            showConfirmButton: false,
          });
        }
      });
    });
  }


  const inputstyle={
    width: '100%',
    border: '1px solid #d9d9d9',
    margin: '0',
    textAlign: 'left',
    height: '40px',
    paddingLeft: '56px',
  }

  const InputIconStyle = {
    position: 'absolute',
    height: '41px',
    borderRadius: '0',
    width: '49px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding:'0',
    background: 'none',
    border: 'none',
    color: '#1873cf',
    fontSize: '17px',
  }
  const InputIconStyle2 = {
    height: '41px',
    width: '61px',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }
  return (
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper full-page-wrapper">
      <div className="content-wrapper d-flex align-items-start auth pt-4 p-0">
        <div className="row w-100 mx-0 justify-content-center px-2">
          <div className="col-lg-10">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <h4>{props.Edit?`Modifier L'invitation N°: ${id}`:'Ajouter une nouvelle invitation'}</h4>
              <h6 className="font-weight-light">Les informations de L'invitation :</h6>
              <form className="pt-3">
                <div className='row g-3'> 
                  <div className='col-md-4'> 
                    <label htmlFor="inputNom" className="form-label"> Nom  <small style={{color:'#ff8f8f'}}>  ( * ) </small> </label>
                    <div className="form-group">
                      <span className="input-group-text" style={InputIconStyle}><FaIcons.FaUserAlt/></span>
                      <input type="text"  style={inputstyle} name='Nom' onChange={HandleInput} className="form-control form-control-lg" value={NouvelleInvitation.Nom} id="Nom_Input" placeholder="Nom"/>
                      <span style={{color:'red'}}>{NouvelleInvitation.error_list.Nom}</span>
                    </div> 
                  </div>
                  <div className='col-md-4'> 
                    <label htmlFor="inputNom" className="form-label"> Prenom  <small style={{color:'#ff8f8f'}}>  ( * ) </small> </label>
                    <div className="form-group">
                     <span className="input-group-text" style={InputIconStyle}><FaIcons.FaUserAlt/></span>
                     <input type="text" value={NouvelleInvitation.Prenom} name='Prenom' onChange={HandleInput} className="form-control form-control-lg" id="Prenom_Input" placeholder="Prenom"/>
                     <span style={{color:'red'}}>{NouvelleInvitation.error_list.Prenom}</span>
                    </div>
                  </div>
                  <div className='col-md-4'> 
                   <label htmlFor="inputNom" className="form-label"> Civilité  <small style={{color:'#ff8f8f'}}>  ( * ) </small> </label>
                   <div className="form-group">
                      <span className="input-group-text" style={InputIconStyle}><FaIcons.FaTransgender/></span>
                      <select defaultValue={NouvelleInvitation.Civilite} name='Civilite' onChange={HandleInput} className="form-control form-control-lg" id="Civilite_Input">
                        <option key='0' value='default'>Civilité</option>
                        <option key='1' value="Mr">Mr</option>
                        <option key='2' value="Mme">Mme</option>
                        <option key='3' value="Mlle">Mlle</option>
                      </select>
                      <span style={{color:'red'}}>{NouvelleInvitation.error_list.Civilite}</span>
                   </div>
                  </div>
                </div>
                <div className='row g-3'>
                  <div className='col-md-4'> 
                    <label htmlFor="inputNom" className="form-label"> Poste  <small style={{color:'#ff8f8f'}}>  ( * ) </small> </label>
                    <div className="form-group">
                     <span className="input-group-text" style={InputIconStyle}><FaIcons.FaBriefcase/></span>
                     <input type="text" value={NouvelleInvitation.Poste} name='Poste' onChange={HandleInput} className="form-control form-control-lg" id="Poste_Input" placeholder="Poste"/>
                     <span style={{color:'red'}}>{NouvelleInvitation.error_list.Poste}</span>
                    </div>
                  </div>
                  <div className='col-md-4'> 
                   <label htmlFor="inputNom" className="form-label"> Entreprise  <small style={{color:'#ff8f8f'}}>  ( * ) </small> </label>
                   <div className="form-group">
                    <span className="input-group-text" style={InputIconStyle}><FaIcons.FaBuilding/></span>
                    <input type="text" value={NouvelleInvitation.Entreprise} name='Entreprise' onChange={HandleInput} className="form-control form-control-lg" id="Entreprise_Input" placeholder="Entreprise"/>
                    <span style={{color:'red'}}>{NouvelleInvitation.error_list.Entreprise}</span>
                   </div>
                  </div>
                  <div className='col-md-4'> 
                    <label htmlFor="inputNom" className="form-label"> Email  <small style={{color:'#ff8f8f'}}>  ( * ) </small> </label>
                    <div className="form-group">
                     <span className="input-group-text" style={InputIconStyle}><FaIcons.FaEnvelope/></span>
                     <input type="email" value={NouvelleInvitation.Email } name='Email' onChange={HandleInput} className="form-control form-control-lg" id="Prenom_Input" placeholder="Email "/>
                     <span style={{color:'red'}}>{NouvelleInvitation.error_list.Email}</span>
                    </div>
                  </div>
                </div>

                <div className='row g-3'>
                  <div className='col-md-4'> 
                   <label htmlFor="inputNom" className="form-label"> Type Invitation  <small style={{color:'#ff8f8f'}}>  ( * ) </small> </label>
                   <div className="form-group">
                   <span className="input-group-text" style={InputIconStyle}><FaIcons.FaFileAlt/></span>
                   <select defaultValue={NouvelleInvitation.Type_Invitation} name='Type_Invitation' onChange={HandleInput} className="form-control form-control-lg" id="Type_InvitationInput">
                     <option key='0' value='default'>Type d'invitation</option>
                     <option key='1' value='Entretien RH'>Entretien RH</option>
                     <option key='2' value='Entretien Metier'>Entretien Metier</option>
                     <option key='3' value='Visite'>Visite</option>
                   </select>
                   <span style={{color:'red'}}>{NouvelleInvitation.error_list.Type_Invitation}</span>
                   </div>
                  </div>
                  <div className='col-md-4'> 
                   <label htmlFor="inputNom" className="form-label"> Date/Heure d'Entre  <small style={{color:'#ff8f8f'}}>  ( * ) </small> </label>
                   <div className='row'>
                    <div className="form-group w-50" style={{paddingRight: '5px'}}>
                      <span className="input-group-text" style={InputIconStyle}><FaIcons.FaCalendarDay/></span>
                      <input type="date" value={NouvelleInvitation.DateEntre} name='DateEntre' onChange={HandleInput} className="form-control form-control-lg" id="DateEntre_Input" placeholder="Date Entrer"/>
                    </div>
                    <div className="form-group w-50 d-flex" style={{paddingLeft: '5px'}}>
                      <span className="input-group-text" style={InputIconStyle}><FaIcons.FaClock/></span>
                      <input type="text" max='5' min='5'  value={NouvelleInvitation.HeureEntre} name='HeureEntre' onChange={HandleInput} className="form-control form-control-lg" id="HeureEntre_Input" placeholder="00:00"/>
                      <span className="input-group-text" onClick={ResetHeureEntre} style={InputIconStyle2}><FaIcons.FaRedoAlt/></span>
                    </div>
                   </div>
                   <span style={{color:'red'}}>{NouvelleInvitation.error_list.DateEntre}</span>
                  </div>
                  <div className='col-md-4'> 
                    <label htmlFor="inputNom" className="form-label"> Site  <small style={{color:'#ff8f8f'}}>  ( * ) </small> </label>
                    <div className="form-group">
                     <span className="input-group-text" style={InputIconStyle}><FaIcons.FaMapMarkerAlt/></span>
                     <select defaultValue={NouvelleInvitation.Site} name='Site' onChange={HandleInput} className="form-control form-control-lg" id="SiteInput">
                      <option key='0' value='default'>Site</option>
                      <option key='1' value='Tit Melil'>Tit Melil</option>
                      <option key='2' value='Sidi Hajjaj'>Sidi Hajjaj</option>
                     </select>
                     <span style={{color:'red'}}>{NouvelleInvitation.error_list.Site}</span>
                    </div>
                  </div>
                </div>

                <div className='col-md-6 p-0 mt-3'> 
                  <label htmlFor="inputNom" className="form-label"> Commentaire </label>
                  <div className="form-group">
                    <textarea style={{height:'126px',paddingLeft:'22px'}} value={NouvelleInvitation.Commentaire} name='Commentaire' onChange={HandleInput} className="form-control form-control-lg" id="Commentaire_Input" placeholder="Commentaire"></textarea>
                    <span style={{color:'red'}}>{NouvelleInvitation.error_list.Commentaire}</span>
                  </div>
                </div>

                <div className="mt-3 d-flex justify-content-center align-items-center" >
                  <a className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn py-2" id='BtnAjouter' style={{width:'fit-content'}}  onClick={VerifierSubmit}>{props.Edit?<FaIcons.FaPenAlt/>:<FaIcons.FaUserPlus/>} {props.Edit?'Modifer':'Ajouter'}</a>
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

export default NouvelleInvitation;