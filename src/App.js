import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReducer } from "react";
import MainPage from "./pages/mainPage";
import reducer, { initialState } from "./reducer/reducer";
import { MainContext } from "./reducer/context";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MainContext.Provider value={{ state, dispatch }}>
      <section className="App">
        <MainPage></MainPage>
      </section>
    </MainContext.Provider>
  );
}

export default App;
