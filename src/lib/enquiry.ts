import { CONTACT_OPTS } from "@/content/site";

export interface EnquiryForm {
  name: string;
  phone: string;
  service: string;
  who: string;
  occasion: string;
  budget: string;
  contact: (typeof CONTACT_OPTS)[number];
  message: string;
  /** Honeypot: humans never see or fill this. */
  website: string;
}

export type FieldKey = "name" | "phone" | "service" | "who" | "occasion" | "budget" | "message";

export const EMPTY_FORM: EnquiryForm = {
  name: "",
  phone: "+233 ",
  service: "",
  who: "",
  occasion: "",
  budget: "",
  contact: "WhatsApp",
  message: "",
  website: "",
};

export const FIELD_ORDER: FieldKey[] = ["name", "phone", "service", "who", "occasion", "budget"];

export function validate(f: EnquiryForm): Partial<Record<FieldKey, string>> {
  const e: Partial<Record<FieldKey, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please add your name so we know who we're talking to.";
  const d = f.phone.replace(/\D/g, "");
  const ok = d.startsWith("233")
    ? d.length === 12
    : d.startsWith("0")
      ? d.length === 10
      : d.length >= 8 && d.length <= 15;
  if (!ok) e.phone = "Add a number we can reach, with the country code, like +233 24 123 4567.";
  if (!f.service) e.service = "Choose what you need help with, or “Something else”.";
  if (!f.who.trim()) e.who = "Tell us who the gift is for, even just “my sister”.";
  if (!f.occasion) e.occasion = "Pick an occasion, or choose “Just because”.";
  if (!f.budget) e.budget = "Choose a range, or “Not sure yet” and we'll guide you.";
  return e;
}

export interface EnquiryRow {
  submittedAt: string;
  name: string;
  phone: string;
  service: string;
  giftFor: string;
  occasion: string;
  budget: string;
  contactMethod: string;
  message: string;
  request: string;
  giftNote: string;
  noteFor: string;
  source: "website";
}

/**
 * Isolated submit. Set NEXT_PUBLIC_ENQUIRY_ENDPOINT to a Google Apps Script web-app URL
 * (whose doPost appends a row to the "Enquiries" sheet) or an Airtable/Zapier hook.
 * Without an endpoint, submissions are kept in this browser's localStorage.
 */
export async function submitEnquiry(row: EnquiryRow) {
  const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT;
  if (endpoint) {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(row),
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return;
  }
  await new Promise((r) => setTimeout(r, 900));
  const all = JSON.parse(localStorage.getItem("aloha-enquiries") || "[]") as EnquiryRow[];
  all.push(row);
  localStorage.setItem("aloha-enquiries", JSON.stringify(all));
}

export const DRAFT_KEY = "aloha-enquiry-draft";
