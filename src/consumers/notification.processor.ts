import { Process, Processor } from "@nestjs/bull";
import { MailerService } from "@nestjs-modules/mailer";

@Processor("notifications")
export class NotificationProcessor {
  constructor(private readonly mailService: MailerService) {}
  @Process()
  async sendEmail(job) {
    const { data } = job;

    await this.mailService.sendMail({
      ...data,
      subject: "Testing Nest MailerModule ✔",
      template: "welcome",
      context: { user: data.message },
    });
  }
}
