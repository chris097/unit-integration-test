import { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});

  
  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/users/1');
      setUser(data)
    } catch {
      setError(true)
    }
    setLoading(false)
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-10">
      <span className='text-center'>{user.name}</span>
      <div className='w-1/3'>
        <input
          className='border w-full h-10'
          type="text"
          placeholder='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <div className='w-full mt-4'>
          <input
            className='border w-full h-10'
          type="text"
          placeholder='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        </div>
        <div data-testid="error" style={{ visibility: error ? 'block' : 'hidden', color: 'red'}}>Error message!</div>
        <button className='bg-blue-600 text-white p-2 w-full' disabled={!username || !password} onClick={handleClick}>
          {loading ? 'loading' : 'Login'}  
        </button>
      </div>
    </div>
  );
}

export default App;
