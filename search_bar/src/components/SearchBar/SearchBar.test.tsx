import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { act } from "react";

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
    jest.spyOn(global, "fetch").mockImplementation(
      () =>
        Promise.resolve({
          json: () => Promise.resolve(mockData),
        }) as Promise<Response>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render search bar", async () => {
    await act(() => {
      render(<SearchBar />);
    });
    const searchBar = screen.getByTestId("test-searchbar");
    expect(searchBar).toBeInTheDocument();
  });

  it("should fetch books correctly", async () => {
    await act(() => render(<SearchBar />));

    const searchBar = screen.getByTestId("test-searchbar");
    fireEvent.change(searchBar, { target: { value: "Book" } });
    await waitFor(() => {
      const booklist = screen.getByTestId("test-booklist");
      expect(booklist).toBeInTheDocument();

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(mockData.items.length);
      expect(listItems[0]).toHaveTextContent("Book Title 1");
      expect(listItems[1]).toHaveTextContent("Book Title 2");
    });
  });

  it("should show selected book correctly", async () => {
    await act(async () => render(<SearchBar />));

    const searchBar = screen.getByTestId("test-searchbar");
    fireEvent.change(searchBar, { target: { value: "Book" } });

    const listItems = await screen.findAllByRole("listitem");
    fireEvent.click(listItems[0]);

    await waitFor(() => {
      const titleElement = screen.getByText(/Title:/i);
      expect(titleElement.nextSibling?.textContent).toBe(
        mockData.items[0].volumeInfo.title
      );

      const authorElement = screen.getByText(/Author\(s\):/i);
      expect(authorElement.nextSibling?.textContent).toContain(
        mockData.items[0].volumeInfo.authors.join(" ")
      );
      const descriptionElement = screen.getByText(/Description:/i);
      expect(descriptionElement.nextSibling?.textContent).toBe(
        mockData.items[0].volumeInfo.description
      );
    });
  });

  it("should select book with keys", async () => {
    await act(async () => render(<SearchBar />));

    const searchBar = screen.getByTestId("test-searchbar");
    fireEvent.change(searchBar, { target: { value: "Book" } });

    const listItems = await screen.findAllByRole("listitem");

    await waitFor(() => {
      fireEvent.keyDown(searchBar, { key: "ArrowDown" });
      fireEvent.keyDown(searchBar, { key: "ArrowDown" });
      expect(listItems[1]).toHaveClass("selected");
      expect(listItems[0]).not.toHaveClass("selected");

      fireEvent.keyDown(searchBar, { key: "ArrowUp" });
      expect(listItems[0]).toHaveClass("selected");
      expect(listItems[1]).not.toHaveClass("selected");

      fireEvent.keyDown(searchBar, { key: "Enter" });
      expect(searchBar).toHaveValue(mockData.items[0].volumeInfo.title);
    });
  });
});
