import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const NavBar = props => {
  const navigate = useNavigate();
  
  const nav = event => {
    const {name} = event.target;
    if(name === 'logout')
    {
      localStorage.removeItem("user_data")
      props.loggedHandler(null);
      navigate('/login');
    }
    else
    {
      navigate('/'+name);
    }
  }
  return (
    <ul>
      <li>
        <a 
          className=""
          onClick={nav}
          name='home'
        >Home</a></li>
      {!props.loggedUser && 
      (<li>
        <a 
          className=""
          onClick={nav}
          name='login'
        >Login</a>
      </li>)
      }
      {!props.loggedUser && (<li>
        <a 
          className=""
          onClick={nav}
          name='register'
        >Register</a>
      </li>)
      }
      {props.loggedUser &&
      (<li>
        <a 
          className=""
          onClick={nav}
          name='logout'
        >Logout</a>
      </li>)
      }  
      {props.loggedUser &&
      (<li>
        <a 
          className=""
          onClick={nav}
          name='user-home'
        >User Home</a>
      </li>)
      }
        
    </ul>
  )
}

export default NavBar;
