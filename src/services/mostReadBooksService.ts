
const calculateMostReadBooks = (
  intervals: Array<{
    userId: string;
    bookId: string;
    startPage: number;
    endPage: number;
  }>
) => {
  const bookReadings: { [key: string]: Set<number> } = {};
  intervals.forEach((interval) => {
    if (!bookReadings[interval.bookId]) {
      bookReadings[interval.bookId] = new Set<number>();
    }
    for (let page = interval.startPage; page <= interval.endPage; page++) {
      bookReadings[interval.bookId].add(page);
    }
  });

  console.log("Calculating pages read per book");
  const sortedBooks = Object.entries(bookReadings)
    .map(([bookId, pagesSet]) => ({ bookId, pagesRead: pagesSet.size }))
    .sort((a, b) => b.pagesRead - a.pagesRead);

  return sortedBooks;
};

const mostReadBooksService = {
  calculateMostReadBooks,
};

export default mostReadBooksService;
