import { Main } from "./components/Main";
import { SinglePaste } from "./components/singlePaste";
import React from "react";
import {
  BrowserRouter as Router,
  Routes, //switch
  Route,
  Link,
  useMatch, //useroutematch
  useParams,
} from "react-router-dom";
function App(): JSX.Element {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/:id" element={<SinglePaste />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
