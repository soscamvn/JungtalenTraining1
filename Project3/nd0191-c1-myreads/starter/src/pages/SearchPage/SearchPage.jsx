import React, { useState } from "react";
import Book from "../../components/Books/Book";
import * as BooksAPI from "../../utils/BooksAPI";


const SearchPage = ({ onChangeShelf }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim()) {
      try {
        // Fetch search results and user's bookshelf
        const fetchedResults = await BooksAPI.search(value, 20); 
        const bookshelfBooks = await BooksAPI.getAll();

        // Add shelf information if books are on the user's shelf
        const updatedResults = fetchedResults.map((book) => {
          const bookOnShelf = bookshelfBooks.find((b) => b.id === book.id);
          return bookOnShelf ? { ...book, shelf: bookOnShelf.shelf } : book;
        });

        setSearchResults(updatedResults); // Update the local state with results
      } catch (error) {
        console.error("Error during search:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleClose = () => {
    onChangeShelf(null);
  };
  //Return Book items with properties
  return (
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={handleClose}>
          Close
        </button>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchResults.map((book) => (
            <li key={book.id}>
              <Book
                book={book}
                onChangeShelf={onChangeShelf}
              />
              {book.shelf && (
                //If book in shelf
                <p className="book-shelf-info">
                  On shelf
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;