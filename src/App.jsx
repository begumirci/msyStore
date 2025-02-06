import Home from './pages/Home';
import Header from './Headers';
import { Outlet } from 'react-router-dom';
import Headers from './Headers';

function App() {
  return (
    <div>
      <Headers />
      <div className='homme'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
