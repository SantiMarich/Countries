import './App.css';
import {Route} from 'react-router-dom';
import {Home, Landing, Form, About, Detail} from "./views/index";
import NavBar from './components/NavBar/NavBar.jsx';
import { useLocation } from 'react-router-dom';



function App() {
  const location = useLocation();

  return (
    <div className="App">
        {location.pathname !== "/" && <NavBar/>}
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/create" component={Form} />
        <Route exact path="/about" component={About} />
        <Route exact path="/detail/:id" component={Detail} />
    </div>
  );
}

export default App;
