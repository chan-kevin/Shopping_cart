const fetchBooks = async (query: string) => {
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

    return booksInfo;
  } catch (error) {
    console.log(error);
  }
};

export default fetchBooks;
