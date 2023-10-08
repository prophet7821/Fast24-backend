export type Mail = {
  type: "email" | "sms";
  from: string;
  to: string;
  subject: string;
  text: string;
  [key: string]: any;
};
