import nodemailer from 'nodemailer';
import HandlebarsMailTemplate, {
    IParseMailTemplate,
} from './HandlebarsMailTemplate';

interface IMailContact {
    name: string;
    email: string;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class EtherealMail {
    static async sendMail({ to, from, subject, templateData }: ISendMail) {
        const account = await nodemailer.createTestAccount();

        const handlebarsMailTemplate = new HandlebarsMailTemplate();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Sales API',
                address: to?.email || "equipe@salesApi.com'",
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject: subject,
            html: await handlebarsMailTemplate.parse(templateData),
        });

        console.log('message ', message.messageId);
        console.log('preview URL ', nodemailer.getTestMessageUrl(message));
        return;
    }
}
