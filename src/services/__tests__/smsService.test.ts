import { SMSService } from "../smsService";

describe("SMSService", () => {
  afterEach(async () => {
    jest.clearAllMocks();
  });
  it("should send SMS correctly", async () => {
    const smsService = new SMSService();
    const sendSMSMock = jest.fn();
    smsService.sendSMS = sendSMSMock;

    const phoneNumber = "1234567890";
    const message = "Test message";

    await smsService.sendSMS(phoneNumber, message);

    expect(sendSMSMock).toHaveBeenCalledWith(phoneNumber, message);
  });
});
