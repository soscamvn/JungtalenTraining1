import React, { useState, useEffect } from "react";
import "./App.css";
import * as BooksAPI from "./utils/BooksAPI";
import Bookshelf from "./components/Bookshelf/Bookshelf";
import SearchPage from "./pages/SearchPage/SearchPage";

function App() {
  // State to manage the list of books and the visibility of the search page
  const [books, setBooks] = useState([]);
  const [showSearchPage, setShowSearchPage] = useState(false);
  // Add the list of random books when the component mounts (runs only once)
  useEffect(() => {
    BooksAPI.getAll().then((books) => setBooks(books));
  }, []);
  // Handle the change of a book's shelf (Currently Reading, Want to Read, or Read)
  const handleChangeShelf = (book, shelf) => {
    if (!book) {
      setShowSearchPage(false);
      return;
    }
    // Update the book's shelf using the API, then fetch the updated list of books
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      BooksAPI.getAll().then((updatedBooks) => {
        setBooks(updatedBooks);//Update new List
      });
    });
  };
  
  // Handle the search functionality when the user types a query
  const handleSearch = (query) => {
    if (query) {
      BooksAPI.search(query).then((results) => {
        if (!results.error) {
          setBooks(results);
        }
      });
    }
  };
  //In General, just showing all the shelf with search button
  return (
    <div className="app">
      {showSearchPage ? (
        <SearchPage
          books={books}
          onChangeShelf={handleChangeShelf}
          onSearch={handleSearch}
        />
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <Bookshelf
              title="Currently Reading"
              books={books.filter((book) => book.shelf === "currentlyReading")}
              onChangeShelf={handleChangeShelf}
            />
            <Bookshelf
              title="Want to Read"
              books={books.filter((book) => book.shelf === "wantToRead")}
              onChangeShelf={handleChangeShelf}
            />
            <Bookshelf
              title="Read"
              books={books.filter((book) => book.shelf === "read")}
              onChangeShelf={handleChangeShelf}
            />
          </div>
          <div className="open-search"> {/* Plus-Button to open the search page */}
            <a onClick={() => setShowSearchPage(true)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
