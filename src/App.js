import { Route, Routes } from "react-router-dom";
import DataTableBooks from "./components/DataTableBooks";
import Footer from "./components/Footer";
import Header from "./components/Header";
import User from "./components/User";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <>
        <Header />
        <Routes>
          <Route path="/datatablebooks/:id"  element={<DataTableBooks/>} />
          <Route path="/"  element={<User/>} />
        
        </Routes>
        
        <Footer />
        
      </>
    </div>
  );
}
