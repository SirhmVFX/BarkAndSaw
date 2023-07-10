import { sendEmail } from "./sendEmail";
import { HttpError } from "@utils/HttpError";
import * as Templates from "@templates";

export class EmailService {
    public async sendWelcomeEmail(email: string, username: string) {
        try {
            const emailTemplate = Templates.WelcomeTemplate(username);
            const to = email;
            const subject = "Welcome to Flowday";
            const html = emailTemplate;

            await sendEmail(to, subject, html);
        } catch (error) {
            throw new HttpError(500, "Unable to send email");
        }
    }
}
