import Market from "./Market";
import Form from "./Form";
import "./App.css";
import Portfolio from "./Portfolio";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route path='/portfolio' exact component={Portfolio}/>
        <Route path='/form' component={Form} />
        <h1>Crypto Portfolio</h1>
        {/* <Form />
        <Portfolio /> */}
      </div>
    </Router>
  );
}

export default App;
