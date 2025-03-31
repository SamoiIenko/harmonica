import { Suspense } from "react";
import "./App.css";
import Home from "./components/Home";

const App = ({ onLogout }) => {
  return (
    <Suspense fallback="Loading core...">
      <div className="font-futura">
        <Home />
      </div>
    </Suspense>
  );
};

export default App;
