import Market from "./Market";
import Form from "./Form";
import "./App.css";
import Portfolio from "./Portfolio";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import History from './History'

function App() {
  return (
    <div className="App">
    <Router>
      
        <Nav />
        <Route path='/portfolio' exact component={Portfolio}/>
        <Route path='/form' component={Form} />
        <Route path='/history' component={History} />
      
    </Router>
    <p>Created with API from Coingecko and storage solutions from Firebase</p>
    </div>
  );
}

export default App;