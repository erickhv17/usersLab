import NavBar from "./components/navBar";
import Student from "./components/student";
import Footer from "./components/footer";
import Table from "./components/table";
import AddStudent from "./components/addStudent";
import { Route, BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={Table} />
        <Route path="/" component={Footer} />
        <Route exact path="/student/get/:userID" component={Student} />
        <Route exact path="/student/add" component={AddStudent} />
      </div>
    </BrowserRouter>
  );
}

export default App;
