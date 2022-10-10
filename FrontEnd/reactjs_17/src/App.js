import './App.css';
import react,{useState,useEffect,useContext} from 'react';
import './css/vertical-layout-light/style.css'
import {Outlet,Navigate,Routes,Route,useNavigate} from 'react-router-dom';
import axios from 'axios';
import DataContext from './context/DataProvider';
import swal from 'sweetalert2';
import Dashboard from './components/Dashboard';
import Accuiel from './components/Accuiel';
import NouvelleInvitation from './components/NouvelleInvitation';
import ListeInvitations from './components/ListeInvitations';
import RequireAuth from './components/RequireAuth';
import LoadingAnimation from './components/LoadingAnimation';

axios.defaults.baseURL='http://localhost:8000/';
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.headers.post['Authorization']='application/json';

axios.defaults.withCredentials= true;

axios.interceptors.request.use(function (config){
const token = localStorage.getItem('auth_token');
config.headers.Authorization = token ? `Bearer ${token}` : `Bearer`;
return config;
});

function App() {

  const {auth,setAuth,setUser} = useContext(DataContext);

  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [StopLoading, setStopLoading] = useState(false);

  useEffect(() =>{
      axios.get('api/checkingAuthenticated').then(res =>{
        if(res.status === 200)
        {
          setAuth(true);
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

  axios.interceptors.response.use(undefined,function axiosRetryInterceptor(err){
    if(err.response.status === 401)
    {
      navigate("/Login");
      setLoading(false);
      setStopLoading(true);      
    }
    return Promise.reject(err);
  });
  
  
  axios.interceptors.response.use(function (response){
      return response;
  }, function(error) {
    if(error.response.status === 403) // Access Denied
    {
      navigate("/403");
      setLoading(false);
      setStopLoading(true);
    }
    else if(error.response.status === 404) // Page Not Found
    {
      navigate("/404");
      setLoading(false);
      setStopLoading(true);
    }
    return Promise.reject(error); 
  });

  if(Loading)
  {
    LoadingAnimation();
    return <h5 className="Loading_Screen"></h5>;
  }else{
    if(StopLoading){
     swal.close();
     setStopLoading(false);
    }
  }

  return (
    <div className="App">
      <Routes>
        
        <Route  element={<RequireAuth/>}>
          <Route exact path="/Accuiel" element={<Accuiel/>}/>  
        </Route>

        <Route path="*" element={<Navigate to={auth? "/Accuiel":"/Login"} from="/" replace />}/>
        <Route path="*" element={<Navigate to={auth? "/":"/Login"} from="/Accuiel" replace />}/>
        <Route  element={<RequireAuth/>}>
          <Route path="/Dashboard" element={<Dashboard/>}>
            <Route path="/Dashboard/Invitations/NouvelleInvitation"    element={<NouvelleInvitation />}/>
            <Route path="/Dashboard/Invitations/ModifierInvitation/:id"    element={<NouvelleInvitation Edit={true}/>}/>
            <Route path="/Dashboard/Invitations/ListeInvitations"    element={<ListeInvitations />}/>
          </Route>
        </Route> 
      </Routes>
    </div>
  );
}

export default App;
