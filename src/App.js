import { Route, Routes } from "react-router-dom";
import DataTableBooks from "./components/Books/DataTableBooks";
import Footer from "./components/Footer";
import Header from "./components/Header";
import User from "./components/Users/User";
import Book from "./components/Books/Book";
import Reviews from "./components/Books/Reviews";

import "./styles.css";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/datatablebooks/:id" element={<DataTableBooks />} />
        <Route path="/datatablebooks/details/:id" element={<Book />} />
        <Route
          path="/datatablebooks/details/reviews/:id"
          element={<Reviews />}
        />
        <Route path="*" element={<Reviews />} />
      </Routes>
      <Footer />
    </>
  );
}
