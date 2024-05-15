import request from "supertest";
import { Router, Express } from "express";
import express from "express";
import readingIntervalRouter from "../../routes/readingIntervals";
import readingIntervalController from "../../controller/readingIntervalController";

jest.mock("../../controller/readingIntervalController", () => ({
  addReadingInterval: jest.fn((req, res) => {
    res.status(201).send({
      success: true,
      message: "Reading interval added successfully",
    });
  }),
}));

describe("readingIntervalRouter", () => {
  let app: Express;

  beforeEach(() => {
    app = express();
    app.use(express.json()); 
    app.use(readingIntervalRouter);
    jest.clearAllMocks();
  });

  it("should call readingIntervalController.addReadingInterval when POST /add is called", async () => {
    const readingIntervalData = {
      userId: "user123",
      startTime: "2024-05-15T10:00:00",
      endTime: "2024-05-15T12:00:00",
    };

    await request(app)
      .post("/add")
      .send(readingIntervalData)
      .expect(201)
      .expect("Content-Type", /json/)
      .expect({
        success: true,
        message: "Reading interval added successfully",
      });

    expect(readingIntervalController.addReadingInterval).toHaveBeenCalledTimes(1);
  });
});
