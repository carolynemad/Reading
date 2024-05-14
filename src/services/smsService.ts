import axios from "axios";

interface SMSProvider {
  sendSMS: (phoneNumber: string, message: string) => Promise<void>;
}

class MockySMSProvider implements SMSProvider {
  async sendSMS(phoneNumber: string, message: string): Promise<void> {
    try {
      await axios.post(
        "https://run.mocky.io/v3/d17e044e-383f-4368-bea0-86a99d3db804",
        {
          phoneNumber,
          message,
        }
      );
      console.log(`SMS sent to ${phoneNumber} with message: ${message}`);
    } catch (error) {
      console.error("Error sending SMS:", error);
      throw new Error("Failed to send SMS");
    }
  }
}
export class SMSService {
  private smsProvider: SMSProvider;

  constructor() {
    this.smsProvider = new MockySMSProvider();
  }

  async sendSMS(phoneNumber: string, message: string): Promise<void> {
    console.log("Sending sms...");
    await this.smsProvider.sendSMS(phoneNumber, message);
  }
}
