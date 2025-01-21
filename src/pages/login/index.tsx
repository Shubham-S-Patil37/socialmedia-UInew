import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

import apiService, { IApiData } from '../../services/apiServices';

export const LogIn = () => {
  const navigate = useNavigate();

  interface signUp {
    "name": string;
    "email": string;
    "password": string;
  }

  interface logIn {
    "email": string;
    "password": string;
  }

  const [signIn, setSignIn] = useState(true);
  const [signUpDetails, setSignUpDetails] = useState<signUp>({ "name": "", "email": "", "password": "" });
  const [logInDetails, setLogInDetails] = useState<logIn>({ "email": "", "password": "" });
  const [error, setError] = useState("");

  const onLogIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("")

    const resp: any = await apiService.logIn(logInDetails)

    if (resp.status) {
      const data = resp.data.data;
      localStorage.setItem('accessToken', data.accessToken);
      navigate("/dashboard")
    }
    else
      // setError(resp.message);
      alert(resp.message)


  }

  const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resp: any = await apiService.signUp(signUpDetails)
    if (resp.status) {
      const data = resp.data.data;

      localStorage.setItem('accessToken', data.accessToken);
      navigate("/dashboard")
    }
    else
      alert(resp.message)
    // setError(resp.message);
  }

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignUpDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLogInDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='login-parent'>
      <div className="container">
        <div className={`sign-up-container ${signIn ? '' : 'active'}`}>
          <form className="form" onSubmit={onSignUp}>
            <h1>Create Account</h1>
            <input name="name" type="text" placeholder="Name" value={signUpDetails.name} className='login-input' onChange={handleSignUpChange} />
            <input name="email" type="email" placeholder="Email" value={signUpDetails.email} className='login-input' onChange={handleSignUpChange} />
            <input name="password" type="password" placeholder="Password" value={signUpDetails.password} className='login-input' onChange={handleSignUpChange} />
            <button className='login-button'>Sign Up</button>
          </form>
        </div>

        <div className={`sign-in-container ${signIn ? 'active' : ''}`}>
          <form className="form" onSubmit={onLogIn}>
            <h1>Sign in</h1>
            <input name="email" type="email" placeholder="Email" value={logInDetails.email} className='login-input' onChange={handleLogInChange} />
            <input name="password" type="password" placeholder="Password" value={logInDetails.password} className='login-input' onChange={handleLogInChange} />
            <a href="#">Forgot your password?</a>
            <button type="submit" className='login-button'>Sign In</button>
            <label className='error-leb'> {error} </label>
          </form>
        </div>

        <div className={`overlay-container ${signIn ? 'active' : ''}`}>
          <div className="overlay">
            <div className={`left-overlay-panel ${signIn ? '' : 'active'}`}>
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="login-button ghost-button" onClick={() => { setSignIn(true); setError("") }}>
                Sign In
              </button>
            </div>
            <div className={`right-overlay-panel ${signIn ? 'active' : ''}`}>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="login-button ghost-button" onClick={() => { setSignIn(false); setError("") }}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
