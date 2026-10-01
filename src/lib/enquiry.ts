import { enquiryTypes } from "@/data/buyer-content";
export type Lead = {
  name: string;
  phone: string;
  email: string;
  configuration: string;
  enquiryType: string;
  message: string;
  callback: string;
  consent: boolean;
};
export function validateLead(value: unknown): Lead | null {
  if (!value || typeof value !== "object") return null;
  const data = value as Record<string, unknown>;
  const string = (key: string, max: number) =>
    typeof data[key] === "string" && data[key].length <= max
      ? data[key].trim()
      : null;
  const name = string("name", 100),
    phone = string("phone", 22),
    email = string("email", 150),
    configuration = string("configuration", 100),
    enquiryType = string("enquiryType", 50),
    message = string("message", 1200),
    callback = string("callback", 100);
  if (
    !name ||
    name.length < 2 ||
    !phone ||
    !/^[+\d ()-]{7,22}$/.test(phone) ||
    phone.replace(/\D/g, "").length < 7 ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    configuration === null ||
    !enquiryType ||
    !(enquiryTypes as readonly string[]).includes(enquiryType) ||
    message === null ||
    callback === null ||
    data.consent !== true
  )
    return null;
  return {
    name,
    phone,
    email,
    configuration,
    enquiryType,
    message,
    callback,
    consent: true,
  };
}
