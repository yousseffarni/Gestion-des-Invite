import React,{useState,useContext,useEffect} from 'react';
import './Accuiel.css' ;
import { Link} from 'react-router-dom';
import DataContext from '../context/DataProvider';
import Header from './Header';
import Carousel from './Carousel';
import Footer from './Footer/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Faicons from 'react-icons/fa';
import LoadingAnimation from './LoadingAnimation';


function Accuiel() {


  const {Auth,setAuth,user,setUser}= useContext(DataContext);

  const [Loading, setLoading] = useState(true);
  const [StopLoading, setStopLoading] = useState(false);

  useEffect(() =>{
      axios.get('api/checkingAuthenticated').then(res =>{
        if(res.status === 200)
        {
          setAuth(true);
          console.log(Auth);
          setUser(res.data.user);
          setStopLoading(true);
          setLoading(false);
        }
        else{
          setAuth(false); 
          setStopLoading(true);
          setLoading(false);
        }
        setLoading(false);
      });
  
  }, []);


  console.log(Auth);
  
if(Loading)
{
  LoadingAnimation();
  return <h5 className="Loading_Screen"></h5>;
}else{
  if(StopLoading){
    Swal.close();
   setStopLoading(false);
  }
}

  return (
    <div className='Accuiel'>
      <Header/>
      <Carousel/>
      <Footer/>
    </div>
  );
}

export default Accuiel;