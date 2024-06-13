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
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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

  return (
    <div>
      <div className="input-container">
        <input
          list="book-list"
          value={query}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          className="search-input"
          data-testid="test-searchbar"
        />

        <datalist
          className="search-output"
          id="book-list"
          data-testid="test-booklist"
        >
          {books &&
            books.map((book) => (
              <option
                value={book.title}
                className="search-book"
                key={book.id}
              />
            ))}
        </datalist>
      </div>

      {/* {selectedBook && (
        <div key={selectedBook.id}>
          <div>Title:{selectedBook.title}</div>
          <div>
            Authors:
            {selectedBook.authors.map((author) => (
              <span key={author}>{author}</span>
            ))}
          </div>
          <div>Description:{selectedBook.description}</div>
        </div>
      )} */}
    </div>
  );
};

export default SearchBar;
