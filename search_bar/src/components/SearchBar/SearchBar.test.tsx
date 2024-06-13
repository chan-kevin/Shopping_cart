import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  const mockData = {
    items: [
      {
        id: "1",
        volumeInfo: {
          title: "Book Title 1",
          authors: ["Author 1"],
          description: "Book description 1",
        },
      },
      {
        id: "2",
        volumeInfo: {
          title: "Book Title 2",
          authors: ["Author 2"],
          description: "Book description 2",
        },
      },
    ],
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render search bar", () => {
    render(<SearchBar />);
    const searchBar = screen.getByTestId("test-searchbar");
    expect(searchBar).toBeInTheDocument();
  });

  it("should fetch books correctly", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(mockData),
        }) as Promise<Response>
    );

    render(<SearchBar />);

    const searchBar = screen.getByTestId("test-searchbar");
    fireEvent.change(searchBar, { target: { value: "Book" } });
    await waitFor(() => {
      const booklist = screen.getByTestId("test-booklist");
      expect(booklist).toBeInTheDocument();

      const options = screen.getAllByTestId("test-booklist-option");
      expect(options).toHaveLength(mockData.items.length);
      expect(options[0]).toHaveValue("Book Title 1");
      expect(options[1]).toHaveValue("Book Title 2");
    });
  });
});
