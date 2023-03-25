import './App.css';
import Home from './components/Home/Home';
import AddNote from './components/Notes/AddNote';
import NoteDetails from './components/Notes/noteDetails';
import SignIn from "./components/User/Login"
import SignUp from "./components/User/Registration"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UpdateNote from "./components/Notes/UpdateNote"
import Navbar from './components/Home/Navbar';

function App() {  
 
  return (

   <BrowserRouter>
      <div className="App">
        <Routes>
         <Route path='/' element = {<SignUp/>}/>
          <Route path='/login' element = {<SignIn/>}/>
          <Route path='/notes' element = {<Home/>}/>
          <Route path='/detail/:id' element = {<NoteDetails/>}/>
           <Route path='/addNote' element = {<AddNote/>}/>
          <Route path='/update/:id' element = {<UpdateNote/>}/> 
        </Routes>
      </div>
    </BrowserRouter>
       
  );
}

export default App;
