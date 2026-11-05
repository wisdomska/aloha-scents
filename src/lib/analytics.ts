type EventData = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: EventData[];
    alohaTrack?: (event: string, data: EventData) => void;
  }
}

/**
 * Pushes an event to window.dataLayer (GTM-ready). Events: whatsapp_click, request_start,
 * scent_finder_complete, note_attached, enquiry_submit, enquiry_submit_invalid,
 * enquiry_submit_error, page_view.
 */
export function track(event: string, data: EventData = {}) {
  try {
    (window.dataLayer = window.dataLayer || []).push({ event, ...data });
    if (typeof window.alohaTrack === "function") window.alohaTrack(event, data);
  } catch {
    /* analytics must never break the page */
  }
}
