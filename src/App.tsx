import { Main } from "./components/Main";
import { SinglePaste } from "./components/singlePaste";
import RecentPastes from "./components/recentPastes";
import {
  BrowserRouter as Router,
  Routes, //switch
  Route,
} from "react-router-dom";
import "./style.css";
function App(): JSX.Element {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:id" element={<SinglePaste />} />
          <Route path="/recent" element={<RecentPastes />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
