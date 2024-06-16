import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import SelectedBook from "../SelectedBook/SelectedBook";

export interface Book {
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
          `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`
        );
        const data = await response.json();

        const booksInfo = data.items?.map((book: any) => {
          return {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            description: book.volumeInfo.description,
          };
        });

        setBooks(booksInfo ?? []);
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

  const handleBlur = () => {
    setTimeout(() => {
      setOnQuery(false);
    }, 100);
  };

  return (
    <div>
      <div className="input-container">
        <input
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
            setOnQuery(true);
          }}
          onKeyDown={handleKey}
          className="search-input"
          placeholder="Book"
          data-testid="test-searchbar"
          onFocus={() => setOnQuery(true)}
          onBlur={handleBlur}
        />

        {onQuery && books.length !== 0 && query ? (
          <ul className="search-output" data-testid="test-booklist">
            {books?.map((book, index) => (
              <li
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

      <SelectedBook selectedBook={selectedBook} />
    </div>
  );
};

export default SearchBar;
