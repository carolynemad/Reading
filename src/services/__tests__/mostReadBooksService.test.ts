import mostReadBooksService from "../mostReadBooksService";

describe("mostReadBooksService", () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });
  it("should calculate most read books correctly", () => {
    const intervals: Array<{
      userId: string;
      bookId: string;
      startPage: number;
      endPage: number;
    }> = [
      { userId: "user1", bookId: "book1", startPage: 10, endPage: 30 },
      { userId: "user2", bookId: "book1", startPage: 2, endPage: 25 },
      { userId: "user1", bookId: "book2", startPage: 40, endPage: 50 },
      { userId: "user3", bookId: "book2", startPage: 1, endPage: 10 },
    ];
    const expectedResult = [
      { bookId: "book1", pagesRead: 29 },
      { bookId: "book2", pagesRead: 21 },
    ];
    const result = mostReadBooksService.calculateMostReadBooks(intervals);
    expect(result).toEqual(expectedResult);
  });
});
