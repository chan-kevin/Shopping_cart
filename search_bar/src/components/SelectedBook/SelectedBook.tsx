import React from "react";
import { Book } from "../SearchBar/SearchBar";

interface SelectedBookProps {
  selectedBook: Book | null;
}

const SelectedBook: React.FC<SelectedBookProps> = ({ selectedBook }) => {
  return (
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
  );
};

export default SelectedBook;
