import React from 'react';
import PageTitle from '../components/PageTitle';
import Register from '../components/Register';
import NavBar from '../components/NavBar';

const RegisterPage = props =>
{
    return(
        <div>
            <PageTitle 
                title="Register Page"
            />
            <Register loggedHandler={props.loggedHandler}/>
        </div>
    );
};

export default RegisterPage;