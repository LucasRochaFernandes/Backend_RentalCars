import { IMailProvider } from "../../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";

export class EtherealMailProviderInMemory implements IMailProvider {
  private message: any[] = [];

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    this.message.push({
      to,
      subject,
      variables,
      path,
    });
  }
}
