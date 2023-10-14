import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000}/>
          <Home/>
    </div>
  );
}

export default App;
