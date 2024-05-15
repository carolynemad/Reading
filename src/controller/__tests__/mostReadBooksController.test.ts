import { Response } from "express";
import mostReadBooksService from "../../services/mostReadBooksService";
import mostReadBooksController from "../mostReadBooksController";
import mongoose from "mongoose";

jest.mock("../../services/mostReadBooksService", () => ({
  calculateMostReadBooks: jest.fn(() =>
    Promise.resolve([
      { bookId: "book1", pagesRead: 15 },
      { bookId: "book2", pagesRead: 10 },
    ])
  ),
}));

jest.mock("mongoose", () => {
  class MockSchema {
    static Types = {
      ObjectId: "ObjectId",
      String: "String",
      Number: "Number",
    };

    constructor(schema: any) {
      return schema;
    }
  }
  const intervals = [
    { userId: "user1", bookId: "book1", startPage: 1, endPage: 10 },
    { userId: "user2", bookId: "book1", startPage: 5, endPage: 15 },
    { userId: "user3", bookId: "book2", startPage: 1, endPage: 5 },
    { userId: "user4", bookId: "book2", startPage: 3, endPage: 7 },
  ] as Array<{
    userId: string;
    bookId: string;
    startPage: number;
    endPage: number;
  }>;

  return {
    Schema: MockSchema,
    model: jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue(intervals),
      findById: jest
        .fn()
        .mockResolvedValue({ title: "Title", numberOfPages: 206 }),
      save: jest.fn().mockResolvedValue({}),
      remove: jest.fn().mockResolvedValue({}),
    }),
    connect: jest.fn(),
    disconnect: jest.fn(),
  };
});

describe("mostReadBooksController", () => {
  afterEach(async () => {
    await mongoose.disconnect();
    jest.clearAllMocks();
  });

  it("should call service and send response", async () => {
    const sendMock = jest.fn();
    const statusMock = jest.fn().mockReturnThis();
    const res = { send: sendMock, status: statusMock } as unknown as Response;

    await mostReadBooksController.getMostReadBooks(res);

    expect(mostReadBooksService.calculateMostReadBooks).toHaveBeenCalledTimes(
      1
    );
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith([
      { bookId: "book1", pagesRead: 15 },
      { bookId: "book2", pagesRead: 10 },
    ]);
  });

  it("should handle errors", async () => {
    const sendMock = jest.fn();
    const statusMock = jest.fn(() => ({ send: sendMock }));
    const res = { status: statusMock } as unknown as Response;

    (
      mostReadBooksService.calculateMostReadBooks as jest.Mock
    ).mockRejectedValueOnce(new Error("Test error"));

    await mostReadBooksController.getMostReadBooks(res);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(sendMock).toHaveBeenCalledWith({
      error: "An error occurred while fetching the most read books",
    });
  });
});
