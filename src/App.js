import { Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Header from "./components/Header";

import User from "./components/Users/User";
import Book from "./components/Books/Book";
import Reviews from "./components/Books/Reviews";


import "./styles.css";
import Home from "./pages/Home";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import DataTableBooks from "./components/Books/DataTableBooks";

export default function App() {
  return (
    <>
      <Header />
      <Routes>

        
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<Books />} />
        <Route path="/books/details/:id" element={<BookDetails />} />

      </Routes>
      <Footer />
    </>
  );
}
