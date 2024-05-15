import request from "supertest";
import express, { Express } from "express";
import mostReadBooksRouter from "../../routes/mostReadBooks";
import mostReadBooksController from "../../controller/mostReadBooksController";

jest.mock("../../controller/mostReadBooksController", () => ({
  getMostReadBooks: jest.fn((req, res) => {
    res.status(200).json([
      {
        bookId: "6643cf8d2a6ff6f1045d3aed",
        pagesRead: 384,
      },
      {
        bookId: "6643cf8d2a6ff6f1045d3a3b",
        pagesRead: 357,
      },
      {
        bookId: "6643cf8d2a6ff6f1045d3a8e",
        pagesRead: 310,
      },
    ]);
  }),
}));

describe("mostReadBooksRouter", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json()); 
    app.use(mostReadBooksRouter);
    jest.clearAllMocks();
  });

  it("should call mostReadBooksController.getMostReadBooks when GET /most-read is called", async () => {
    await request(app)
      .get("/most-read")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect([
        {
          bookId: "6643cf8d2a6ff6f1045d3aed",
          pagesRead: 384,
        },
        {
          bookId: "6643cf8d2a6ff6f1045d3a3b",
          pagesRead: 357,
        },
        {
          bookId: "6643cf8d2a6ff6f1045d3a8e",
          pagesRead: 310,
        },
      ]);

    expect(mostReadBooksController.getMostReadBooks).toHaveBeenCalledTimes(1);
  });
});
