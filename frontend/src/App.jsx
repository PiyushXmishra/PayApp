import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Signin from "./Components/Signin";
import Landing from "./Components/Landing";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Transfer from "./Components/Transfer";
function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/"element={<Landing/>}></Route>
        <Route path="/signin"element={<Signin/>}></Route>
        <Route path="/signup"element={<Signup/>}></Route>
        <Route path="/dashboard"element={<Dashboard/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
