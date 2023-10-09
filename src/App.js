import Child from "./Components/Child";
import '../src/App.css';
import {BrowserRouter ,Route, Routes} from 'react-router-dom';
import Home from "./Components/Home";

function App() {
  

return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
      <Route path="/" element={<Child />}/>
      <Route path="/home" element={<Home />}/>
      </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;

