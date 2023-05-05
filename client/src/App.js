import "./App.module.css";
import { Route } from "react-router-dom";
import { Home, Landing, Form, About, Detail } from "./views/index";
import NavBar from "./components/NavBar/NavBar.jsx";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { getQuery } from "./redux/actions";

function App() {
  const location = useLocation();

  const dispatch = useDispatch(); // VER ESTO
  function onSearch(name) {
    axios
      .get(`http://localhost:3001/countries?name=${name}`)
      .then(({ data }) => {
        const countryName = data.length ? data[0].name : null;
        dispatch(getQuery(countryName));
      })
      .catch((error) => {
        console.error(error);
        return alert("El Pais No Existe");
      });
  }

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar onSearch={onSearch} />}
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/about" component={About} />
      <Route exact path="/detail/:id" component={Detail} />
    </div>
  );
}

export default App;
