import React, { ChangeEvent, useEffect, useState } from "react";
import "./SearchBar.css";

interface Book {
  id: string;
  title: string;
  authors: [];
  description: string;
}

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [onQuery, setOnQuery] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [selectedBookIndex, setSelectedBookIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&startIndex=0&maxResults=20`
        );
        const data = await response.json();

        const booksInfo = data.items.map((book: any) => {
          return {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
          };
        });

        setBooks(booksInfo);
      } catch (error) {
        console.log(error);
      }
    };

    if (query) fetchBooks();
  }, [query]);

  const handleSelect = (book: Book) => {
    setSelectedBook(book);
    setQuery(book.title);
    setOnQuery(false);
    setSelectedBookIndex(-1);
  };

  const handleKey = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLLIElement>
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedBookIndex((prev) =>
        prev < books.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedBookIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (selectedBookIndex !== -1 && books[selectedBookIndex]) {
        handleSelect(books[selectedBookIndex]);
      }
    } else if (e.key === "Escape") {
      setOnQuery(false);
    }
  };

  return (
    <div>
      <div
        className="input-container"
        onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          e.stopPropagation();
          setOnQuery(false);
          setSelectedBookIndex(-1);
        }}
      >
        <input
          // list="book-list"
          value={query}
          onClick={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            e.stopPropagation();
            setOnQuery(true);
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
            setOnQuery(true);
          }}
          onKeyDown={handleKey}
          className="search-input"
          placeholder="Book"
          data-testid="test-searchbar"
        />

        {onQuery && books.length !== 0 ? (
          <ul
            className="search-output"
            // id="book-list"
            data-testid="test-booklist"
          >
            {books.map((book, index) => (
              <li
                // value={book.title}
                className={`search-book ${
                  index === selectedBookIndex ? "selected" : ""
                }`}
                key={book.id}
                onMouseEnter={() => setSelectedBookIndex(index)}
                data-testid="test-booklist-option"
                onClick={() => handleSelect(book)}
              >
                {book.title}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="selected-book">
        <div>
          <span className="subject">Title: </span>
          <span>{selectedBook?.title}</span>
        </div>
        <div>
          <span className="subject">Author(s): </span>
          {selectedBook?.authors.map((author) => (
            <span key={author}>{author} </span>
          ))}
        </div>
        <div>
          <span className="subject">Description: </span>
          {selectedBook?.description}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
