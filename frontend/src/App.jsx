import {Demo }from "./components/Demo.jsx"
import Chat from "./Pages/Chat.jsx";
import Home from "./Pages/Home.jsx";
import { Routes,Route } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>

    <Route path ="/"  element = {<Home/>}/>
    <Route path ="/chats"   element = {<Chat/>} />

    </Routes>
    

    
    </>
  );
}

export default App;
