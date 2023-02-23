// import logo from './logo.svg';
// import './App.css';
import Todo from "./Todo"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoList from "./TodoList";
import Retrieve from "./RetrieveAndDelete";
import Task from "./Task";



function App() {
  return (
    
    <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Todo />} />
                    <Route path='/todos/:_id' element={<Task />} />
                </Routes>
            
            </BrowserRouter>
    
  );
}

export default App;
