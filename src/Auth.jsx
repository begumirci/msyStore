import { useState, useContext } from 'react';
import { supabase } from './helper/supabase';
import { Contextim } from './helper/Provider';
import { useNavigate } from 'react-router-dom';
import './auth.css';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, user } = useContext(Contextim);

  const navigate = useNavigate();

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (data) {
      console.log(data.user);
      if (data.user !== null) {
        console.log('varr');
        setUser(data.user);
        navigate('/urunduzenle');
      } else {
        alert('Kullanıcı adı veya şifre yanlış');
      }
    } else {
      console.log(error.message);
      alert('Kullanıcı adı veya şifre yanlış');
    }
  }

  console.log(user);

  function handleSubmit(e) {
    e.preventDefault();
    signIn();
  }
  return (
    <div>
      <div className='auth-form'>
        <form className='form' onSubmit={handleSubmit}>
          <p className='form-title'>Sign in to your account</p>
          <div className='input-container'>
            <input
              type='email'
              placeholder='Enter email'
              name='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='input-container'>
            <input
              type='password'
              placeholder='Enter password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='submit'>
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
