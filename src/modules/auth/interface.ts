export type Payload = {
  email: string;
  password: string;
  role: "maintainer" | "contributor";
};