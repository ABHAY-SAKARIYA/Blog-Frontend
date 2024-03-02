import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Components/pages/Home';
import Post from './Components/Post';
import Add from './Components/Add';
// import Customerror from './Components/Customerror';



function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path="/post/:id" element={<Post />} />
          <Route exact path="/add" element={<Add />} />
          {/* <Route exact path="/error" element={<Customerror errMsg="Route Not Found" />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  );  
}

export default App;
