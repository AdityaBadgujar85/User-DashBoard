import './App.css';
import NavBar from './components/NavBar/NavBar';
import UserDisplay from './components/UserDisplay/UserDisplay';
import { Route, Routes } from 'react-router-dom';
import AddUser from './components/User/AddUser';
import EditUserDetails from './components/User/EditUserDetails';

function App() {
  return (
    <div className="App">
      <NavBar/>      
      <Routes>
        <Route path='/'element={<UserDisplay/>}/>
        <Route path='/AddUser'element={<AddUser/>}/>
        <Route path="/UserEdit/:id" element={<EditUserDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
