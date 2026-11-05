"use client";

import { Fragment, type ChangeEvent, type FormEvent, type MouseEvent } from "react";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { BUDGET_OPTS, CONTACT_OPTS, OCCASION_OPTS, SERVICE_OPTS } from "@/content/site";
import { track } from "@/lib/analytics";
import { DRAFT_KEY, EMPTY_FORM, FIELD_ORDER, submitEnquiry, validate, type FieldKey } from "@/lib/enquiry";
import { useWhatsApp } from "@/hooks/useNav";

const FIELDS: FieldKey[] = ["name", "phone", "service", "who", "occasion", "budget", "message"];

export function ContactSection() {
  const site = useSite();
  const { form, setForm, setField, touched, setTouched, focus, setFocus, status, setStatus, request, setRequest } =
    site;
  const { note, setNote, navigate, isReduced } = site;
  const { contactHref: formWaHref, headerWaClick, waHello } = useWhatsApp();

  const errs = validate(form);
  const F = Object.fromEntries(
    FIELDS.map((k) => {
      const err = touched[k] && errs[k] ? errs[k]! : "";
      return [
        k,
        {
          value: form[k],
          err,
          invalid: !!err,
          bc: err ? "#B4695A" : "rgba(46,26,22,.18)",
          lt: focus === k || !!String(form[k] || "").trim() ? "translateY(-11px) scale(0.78)" : "none",
          onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            setField(k, e.target.value),
          onFocus: () => setFocus(k),
          onBlur: () => {
            setFocus(null);
            setTouched((t) => ({ ...t, [k]: true }));
          },
        },
      ];
    }),
  ) as Record<
    FieldKey,
    {
      value: string;
      err: string;
      invalid: boolean;
      bc: string;
      lt: string;
      onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
      onFocus: () => void;
      onBlur: () => void;
    }
  >;

  const contactOpts = CONTACT_OPTS.map((v) => {
    const on = form.contact === v;
    return {
      v,
      checked: on,
      bg: on ? "#E7C3B5" : "#FFFDFA",
      bc: on ? "#B4695A" : "rgba(46,26,22,.18)",
      dot: on ? "#B4695A" : "rgba(46,26,22,.2)",
      onChange: () => setField("contact", v),
    };
  });
  const serviceOpts = SERVICE_OPTS;
  const occasionOpts = OCCASION_OPTS;
  const budgetSel = BUDGET_OPTS;
  const honeypot = form.website;
  const onHoney = (e: ChangeEvent<HTMLInputElement>) => setField("website", e.target.value);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const keys = Object.keys(errs) as FieldKey[];
    if (keys.length) {
      setTouched({ name: true, phone: true, service: true, who: true, occasion: true, budget: true });
      const box = document.querySelector(`[data-field="${FIELD_ORDER.find((k) => errs[k])}"]`);
      if (box) {
        box.querySelector<HTMLElement>("input,select,textarea")?.focus();
        if (!isReduced())
          box.animate(
            [
              { transform: "translateX(0)" },
              { transform: "translateX(-6px)" },
              { transform: "translateX(5px)" },
              { transform: "translateX(-3px)" },
              { transform: "translateX(0)" },
            ],
            { duration: 340, easing: "ease-out" },
          );
      }
      track("enquiry_submit_invalid", { fields: keys });
      return;
    }
    if (form.website) {
      setStatus("success");
      return;
    }
    setStatus("sending");
    try {
      await submitEnquiry({
        submittedAt: new Date().toISOString(),
        name: form.name.trim(),
        phone: form.phone.trim(),
        service: form.service,
        giftFor: form.who.trim(),
        occasion: form.occasion,
        budget: form.budget,
        contactMethod: form.contact,
        message: form.message.trim(),
        request: request ? request.title + " · " + request.detail : "",
        giftNote: note.text.trim(),
        noteFor: note.to.trim(),
        source: "website",
      });
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        /* storage unavailable */
      }
      setStatus("success");
      setForm({ ...EMPTY_FORM });
      setTouched({});
      setRequest(null);
      setNote({ to: "", text: "" });
      track("enquiry_submit", { occasion: form.occasion, budget: form.budget });
      window.scrollTo({ top: 0, behavior: isReduced() ? "auto" : "smooth" });
    } catch (err) {
      setStatus("error");
      track("enquiry_submit_error", { message: String(err instanceof Error ? err.message : err) });
    }
  };

  const isSending = status === "sending";
  const sendingAria = isSending;
  const sendingOpacity = isSending ? "0.75" : "1";
  const submitLabel = isSending ? "Sending…" : "Send my enquiry";
  const isError = status === "error";
  const isSuccess = status === "success";
  const showForm = !isSuccess;
  const newEnquiry = () => setStatus("idle");
  const goHome = (e: MouseEvent) => {
    e.preventDefault();
    setStatus("idle");
    navigate("home", null, "home");
  };

  const hasRequest = !!request;
  const req = request || { title: "", detail: "", img: "none" };
  const clearRequest = () => setRequest(null);
  const hasNote = !!note.text.trim();
  const noteText = note.text;
  const noteForLabel = note.to.trim() ? " · for " + note.to.trim() : "";
  const editNote = (e: MouseEvent) => {
    e.preventDefault();
    navigate("home", "note", "home");
  };
  const clearNote = () => setNote({ to: "", text: "" });

  return (
    <>
      <section
        aria-labelledby="contact-title"
        style={{ background: "#F3E8DC", padding: "clamp(40px,6vw,88px) clamp(20px,4vw,48px) clamp(64px,8vw,120px)" }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(40px,5vw,80px)",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: "1 1 520px", minWidth: "0" }}>
            <p
              style={{
                margin: "0",
                font: "600 12px/1.2 var(--font-body)",
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "#6B3F35",
                animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) both",
              }}
            >
              Contact
            </p>{" "}
            <h1
              id="contact-title"
              style={{
                margin: "16px 0 0",
                font: "300 clamp(44px,4vw + 14px,72px)/1.04 var(--font-display)",
                color: "#2E1A16",
                textWrap: "balance",
                animation: "riseIn 700ms cubic-bezier(.23,1,.32,1) 80ms both",
                letterSpacing: "-.05em",
              }}
            >
              Tell us about <em style={{ fontStyle: "italic", color: "#B4695A" }}>the gift.</em>
            </h1>{" "}
            <p
              style={{
                margin: "18px 0 0",
                maxWidth: "34em",
                font: "400 clamp(16px,.4vw + 14.5px,18px)/1.6 var(--font-body)",
                color: "#6B3F35",
                animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) 160ms both",
              }}
            >
              Share a few details and we&apos;ll come back with ideas that fit. Prefer to chat? WhatsApp is quickest.
            </p>{" "}
            {showForm && (
              <>
                {hasRequest && (
                  <>
                    <div
                      style={{
                        marginTop: "30px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "16px",
                        alignItems: "center",
                        padding: "14px 18px 14px 14px",
                        background: "#F3E8DC",
                        borderRadius: "22px",
                        animation: "riseIn 500ms cubic-bezier(.23,1,.32,1) both",
                      }}
                    >
                      <div
                        aria-hidden="true"
                        style={{
                          flex: "none",
                          width: "64px",
                          aspectRatio: "4/5",
                          borderRadius: "9999px 9999px 0 0",
                          background: req.img,
                        }}
                      />{" "}
                      <div style={{ flex: "1 1 180px", minWidth: "0" }}>
                        <p
                          style={{
                            margin: "0",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            font: "600 11px/1.2 var(--font-body)",
                            letterSpacing: ".3em",
                            textTransform: "uppercase",
                            color: "#6B3F35",
                          }}
                        >
                          <span style={{ color: "#C99A5B", display: "flex" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                              <path
                                fill="currentColor"
                                d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
                              />
                            </svg>
                          </span>
                          Your request
                        </p>{" "}
                        <p style={{ margin: "6px 0 0", font: "500 26px/1.1 var(--font-display)", color: "#2E1A16" }}>
                          {req.title}
                        </p>{" "}
                        <p style={{ margin: "4px 0 0", font: "400 14px/1.5 var(--font-body)", color: "#6B3F35" }}>
                          {req.detail}
                        </p>
                      </div>{" "}
                      <button
                        type="button"
                        onClick={clearRequest}
                        style={{
                          minHeight: "44px",
                          padding: "0 14px",
                          border: "0",
                          borderRadius: "999px",
                          background: "transparent",
                          color: "#2E1A16",
                          font: "500 14px var(--font-body)",
                          textDecoration: "underline",
                          textDecorationColor: "#C99A5B",
                          textUnderlineOffset: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
                {hasNote && (
                  <>
                    <div
                      style={{
                        marginTop: "12px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "12px 16px",
                        alignItems: "center",
                        padding: "16px 18px",
                        background: "#FBF7F2",
                        border: "1px solid rgba(201,154,91,.5)",
                        borderRadius: "22px",
                      }}
                    >
                      <div style={{ flex: "1 1 220px", minWidth: "0" }}>
                        <p
                          style={{
                            margin: "0",
                            font: "600 11px/1.2 var(--font-body)",
                            letterSpacing: ".3em",
                            textTransform: "uppercase",
                            color: "#6B3F35",
                          }}
                        >
                          Your note{noteForLabel}
                        </p>{" "}
                        <p
                          style={{
                            margin: "8px 0 0",
                            font: "400 26px/1.35 var(--font-script)",
                            color: "#6B3F35",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {noteText}
                        </p>
                      </div>{" "}
                      <div style={{ display: "flex", gap: "4px" }}>
                        <Link
                          href="/#note"
                          onClick={editNote}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            minHeight: "44px",
                            padding: "0 12px",
                            color: "#2E1A16",
                            font: "500 14px var(--font-body)",
                          }}
                        >
                          Edit
                        </Link>{" "}
                        <button
                          type="button"
                          onClick={clearNote}
                          style={{
                            minHeight: "44px",
                            padding: "0 12px",
                            border: "0",
                            background: "transparent",
                            color: "#2E1A16",
                            font: "500 14px var(--font-body)",
                            textDecoration: "underline",
                            textDecorationColor: "#C99A5B",
                            textUnderlineOffset: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                )}
                <form
                  noValidate
                  onSubmit={submit}
                  aria-describedby="req-note"
                  style={{
                    marginTop: "36px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) 220ms both",
                  }}
                >
                  <p id="req-note" style={{ margin: "0", font: "400 14px var(--font-body)", color: "#6B3F35" }}>
                    Fields marked{" "}
                    <span aria-hidden="true" style={{ color: "#B4695A" }}>
                      *
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        width: "1px",
                        height: "1px",
                        overflow: "hidden",
                        clip: "rect(0 0 0 0)",
                      }}
                    >
                      with an asterisk
                    </span>{" "}
                    are required.
                  </p>
                  {isError && (
                    <>
                      <div
                        role="alert"
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "flex-start",
                          padding: "16px 18px",
                          borderRadius: "16px",
                          background: "#E7C3B5",
                          color: "#2E1A16",
                          font: "400 15px/1.55 var(--font-body)",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: "22px",
                            height: "22px",
                            borderRadius: "50%",
                            background: "#2E1A16",
                            color: "#FBF7F2",
                            display: "grid",
                            placeItems: "center",
                            font: "600 13px var(--font-body)",
                          }}
                        >
                          !
                        </span>{" "}
                        <span>
                          We couldn&apos;t send that just now. Everything you typed is still here, so try again, or{" "}
                          <a
                            href={formWaHref}
                            target="_blank"
                            rel="noopener"
                            style={{ color: "#2E1A16", fontWeight: "600" }}
                          >
                            message us on WhatsApp
                          </a>{" "}
                          (opens WhatsApp).
                        </span>
                      </div>
                    </>
                  )}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
                      gap: "18px",
                    }}
                  >
                    <div
                      data-field="name"
                      style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}
                    >
                      <label htmlFor="f-name" style={{ font: "500 15px/1.3 var(--font-body)", color: "#2E1A16" }}>
                        Your name{" "}
                        <span aria-hidden="true" style={{ color: "#B4695A" }}>
                          *
                        </span>
                      </label>{" "}
                      <input
                        className="ix-fc"
                        id="f-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={F.name.invalid}
                        aria-describedby="f-name-err"
                        value={F.name.value}
                        onChange={F.name.onChange}
                        onFocus={F.name.onFocus}
                        onBlur={F.name.onBlur}
                        placeholder="Your full name"
                        style={{
                          width: "100%",
                          height: "54px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: `1px solid ${F.name.bc}`,
                          background: "#FFFDFA",
                          color: "#2E1A16",
                          font: "400 16px var(--font-body)",
                          outline: "none",
                          transition: "border-color 200ms ease, box-shadow 200ms ease",
                        }}
                      />{" "}
                      <p
                        id="f-name-err"
                        style={{ margin: "0", font: "500 14px/1.4 var(--font-body)", color: "#8A3A2C" }}
                      >
                        {F.name.err}
                      </p>
                    </div>{" "}
                    <div
                      data-field="phone"
                      style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}
                    >
                      <label htmlFor="f-phone" style={{ font: "500 15px/1.3 var(--font-body)", color: "#2E1A16" }}>
                        Phone / WhatsApp{" "}
                        <span aria-hidden="true" style={{ color: "#B4695A" }}>
                          *
                        </span>
                      </label>{" "}
                      <input
                        className="ix-fc"
                        id="f-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        aria-required="true"
                        aria-invalid={F.phone.invalid}
                        aria-describedby="f-phone-err"
                        value={F.phone.value}
                        onChange={F.phone.onChange}
                        onFocus={F.phone.onFocus}
                        onBlur={F.phone.onBlur}
                        placeholder="+233 24 123 4567"
                        style={{
                          width: "100%",
                          height: "54px",
                          padding: "0 16px",
                          borderRadius: "14px",
                          border: `1px solid ${F.phone.bc}`,
                          background: "#FFFDFA",
                          color: "#2E1A16",
                          font: "400 16px var(--font-body)",
                          outline: "none",
                          transition: "border-color 200ms ease, box-shadow 200ms ease",
                        }}
                      />{" "}
                      <p
                        id="f-phone-err"
                        style={{ margin: "0", font: "500 14px/1.4 var(--font-body)", color: "#8A3A2C" }}
                      >
                        {F.phone.err}
                      </p>
                    </div>
                  </div>
                  <div
                    data-field="service"
                    style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}
                  >
                    <label htmlFor="f-service" style={{ font: "500 15px/1.3 var(--font-body)", color: "#2E1A16" }}>
                      What can we help with?{" "}
                      <span aria-hidden="true" style={{ color: "#B4695A" }}>
                        *
                      </span>
                    </label>{" "}
                    <div style={{ position: "relative" }}>
                      <select
                        className="ix-fc"
                        id="f-service"
                        name="service"
                        aria-required="true"
                        aria-invalid={F.service.invalid}
                        aria-describedby="f-service-err"
                        value={F.service.value}
                        onChange={F.service.onChange}
                        onFocus={F.service.onFocus}
                        onBlur={F.service.onBlur}
                        style={{
                          width: "100%",
                          height: "54px",
                          padding: "0 44px 0 16px",
                          appearance: "none",
                          WebkitAppearance: "none",
                          cursor: "pointer",
                          borderRadius: "14px",
                          border: `1px solid ${F.service.bc}`,
                          background: "#FFFDFA",
                          color: "#2E1A16",
                          font: "400 16px var(--font-body)",
                          outline: "none",
                          transition: "border-color 200ms ease, box-shadow 200ms ease",
                        }}
                      >
                        <option value="">Choose a service</option>
                        {serviceOpts.map((op, i) => (
                          <Fragment key={i}>
                            <option value={op}>{op}</option>
                          </Fragment>
                        ))}
                      </select>{" "}
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          right: "18px",
                          top: "20px",
                          width: "8px",
                          height: "8px",
                          borderRight: "1.5px solid #6B3F35",
                          borderBottom: "1.5px solid #6B3F35",
                          transform: "rotate(45deg)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>{" "}
                    <p
                      id="f-service-err"
                      style={{ margin: "0", font: "500 14px/1.4 var(--font-body)", color: "#8A3A2C" }}
                    >
                      {F.service.err}
                    </p>
                  </div>
                  <div data-field="who" style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}>
                    <label htmlFor="f-who" style={{ font: "500 15px/1.3 var(--font-body)", color: "#2E1A16" }}>
                      Who is this gift for?{" "}
                      <span aria-hidden="true" style={{ color: "#B4695A" }}>
                        *
                      </span>
                    </label>{" "}
                    <input
                      className="ix-fc"
                      id="f-who"
                      name="who"
                      type="text"
                      autoComplete="off"
                      aria-required="true"
                      aria-invalid={F.who.invalid}
                      aria-describedby="f-who-err"
                      value={F.who.value}
                      onChange={F.who.onChange}
                      onFocus={F.who.onFocus}
                      onBlur={F.who.onBlur}
                      placeholder="e.g. My mum, she loves soft florals"
                      style={{
                        width: "100%",
                        height: "54px",
                        padding: "0 16px",
                        borderRadius: "14px",
                        border: `1px solid ${F.who.bc}`,
                        background: "#FFFDFA",
                        color: "#2E1A16",
                        font: "400 16px var(--font-body)",
                        outline: "none",
                        transition: "border-color 200ms ease, box-shadow 200ms ease",
                      }}
                    />{" "}
                    <p id="f-who-err" style={{ margin: "0", font: "500 14px/1.4 var(--font-body)", color: "#8A3A2C" }}>
                      {F.who.err}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
                      gap: "18px",
                    }}
                  >
                    <div
                      data-field="occasion"
                      style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}
                    >
                      <label htmlFor="f-occasion" style={{ font: "500 15px/1.3 var(--font-body)", color: "#2E1A16" }}>
                        Occasion{" "}
                        <span aria-hidden="true" style={{ color: "#B4695A" }}>
                          *
                        </span>
                      </label>{" "}
                      <div style={{ position: "relative" }}>
                        <select
                          className="ix-fc"
                          id="f-occasion"
                          name="occasion"
                          aria-required="true"
                          aria-invalid={F.occasion.invalid}
                          aria-describedby="f-occasion-err"
                          value={F.occasion.value}
                          onChange={F.occasion.onChange}
                          onFocus={F.occasion.onFocus}
                          onBlur={F.occasion.onBlur}
                          style={{
                            width: "100%",
                            height: "54px",
                            padding: "0 44px 0 16px",
                            appearance: "none",
                            WebkitAppearance: "none",
                            cursor: "pointer",
                            borderRadius: "14px",
                            border: `1px solid ${F.occasion.bc}`,
                            background: "#FFFDFA",
                            color: "#2E1A16",
                            font: "400 16px var(--font-body)",
                            outline: "none",
                            transition: "border-color 200ms ease, box-shadow 200ms ease",
                          }}
                        >
                          <option value="">Choose one</option>
                          {occasionOpts.map((op, i) => (
                            <Fragment key={i}>
                              <option value={op}>{op}</option>
                            </Fragment>
                          ))}
                        </select>{" "}
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            right: "18px",
                            top: "20px",
                            width: "8px",
                            height: "8px",
                            borderRight: "1.5px solid #6B3F35",
                            borderBottom: "1.5px solid #6B3F35",
                            transform: "rotate(45deg)",
                            pointerEvents: "none",
                          }}
                        />
                      </div>{" "}
                      <p
                        id="f-occasion-err"
                        style={{ margin: "0", font: "500 14px/1.4 var(--font-body)", color: "#8A3A2C" }}
                      >
                        {F.occasion.err}
                      </p>
                    </div>{" "}
                    <div
                      data-field="budget"
                      style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}
                    >
                      <label htmlFor="f-budget" style={{ font: "500 15px/1.3 var(--font-body)", color: "#2E1A16" }}>
                        Budget range{" "}
                        <span aria-hidden="true" style={{ color: "#B4695A" }}>
                          *
                        </span>
                      </label>{" "}
                      <div style={{ position: "relative" }}>
                        <select
                          className="ix-fc"
                          id="f-budget"
                          name="budget"
                          aria-required="true"
                          aria-invalid={F.budget.invalid}
                          aria-describedby="f-budget-err"
                          value={F.budget.value}
                          onChange={F.budget.onChange}
                          onFocus={F.budget.onFocus}
                          onBlur={F.budget.onBlur}
                          style={{
                            width: "100%",
                            height: "54px",
                            padding: "0 44px 0 16px",
                            appearance: "none",
                            WebkitAppearance: "none",
                            cursor: "pointer",
                            borderRadius: "14px",
                            border: `1px solid ${F.budget.bc}`,
                            background: "#FFFDFA",
                            color: "#2E1A16",
                            font: "400 16px var(--font-body)",
                            outline: "none",
                            transition: "border-color 200ms ease, box-shadow 200ms ease",
                          }}
                        >
                          <option value="">Choose a range</option>
                          {budgetSel.map((op, i) => (
                            <Fragment key={i}>
                              <option value={op}>{op}</option>
                            </Fragment>
                          ))}
                        </select>{" "}
                        <span
                          aria-hidden="true"
                          style={{
                            position: "absolute",
                            right: "18px",
                            top: "20px",
                            width: "8px",
                            height: "8px",
                            borderRight: "1.5px solid #6B3F35",
                            borderBottom: "1.5px solid #6B3F35",
                            transform: "rotate(45deg)",
                            pointerEvents: "none",
                          }}
                        />
                      </div>{" "}
                      <p
                        id="f-budget-err"
                        style={{ margin: "0", font: "500 14px/1.4 var(--font-body)", color: "#8A3A2C" }}
                      >
                        {F.budget.err}
                      </p>
                    </div>
                  </div>
                  <fieldset style={{ border: "0", margin: "0", padding: "0", minWidth: "0" }}>
                    <legend
                      style={{
                        padding: "0",
                        marginBottom: "10px",
                        font: "500 15px var(--font-body)",
                        color: "#2E1A16",
                      }}
                    >
                      How should we reach you?{" "}
                      <span aria-hidden="true" style={{ color: "#B4695A" }}>
                        *
                      </span>
                    </legend>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {contactOpts.map((m, i) => (
                        <Fragment key={i}>
                          <label
                            style={{
                              position: "relative",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              minHeight: "46px",
                              padding: "0 18px",
                              borderRadius: "999px",
                              border: `1px solid ${m.bc}`,
                              background: m.bg,
                              color: "#2E1A16",
                              font: "500 15px var(--font-body)",
                              cursor: "pointer",
                              transition: "background-color 200ms ease, border-color 200ms ease",
                            }}
                          >
                            <input
                              type="radio"
                              name="contact"
                              value={m.v}
                              checked={m.checked}
                              onChange={m.onChange}
                              style={{ position: "absolute", inset: "0", opacity: "0", margin: "0", cursor: "pointer" }}
                            />{" "}
                            <span
                              aria-hidden="true"
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                background: m.dot,
                                transition: "background-color 200ms ease",
                              }}
                            />
                            {m.v}
                          </label>
                        </Fragment>
                      ))}
                    </div>
                  </fieldset>
                  <div
                    data-field="message"
                    style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "0" }}
                  >
                    <label htmlFor="f-message" style={{ font: "500 15px/1.3 var(--font-body)", color: "#2E1A16" }}>
                      Anything else? <span style={{ fontWeight: "400", color: "#6B3F35" }}>(optional)</span>
                    </label>{" "}
                    <textarea
                      className="ix-fc"
                      id="f-message"
                      name="message"
                      rows={4}
                      value={F.message.value}
                      onChange={F.message.onChange}
                      onFocus={F.message.onFocus}
                      onBlur={F.message.onBlur}
                      placeholder="Scents they love, a date it's needed by, anything that helps"
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: "14px",
                        border: "1px solid rgba(46,26,22,.18)",
                        background: "#FFFDFA",
                        color: "#2E1A16",
                        font: "400 16px/1.55 var(--font-body)",
                        resize: "vertical",
                        outline: "none",
                        transition: "border-color 200ms ease, box-shadow 200ms ease",
                      }}
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
                  >
                    <label>
                      Leave this field empty
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={onHoney}
                      />
                    </label>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "14px 20px",
                      marginTop: "6px",
                    }}
                  >
                    <button
                      className="ix-hd ix-a3"
                      type="submit"
                      aria-disabled={sendingAria}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                        flex: "1 1 220px",
                        maxWidth: "360px",
                        minHeight: "56px",
                        padding: "0 30px",
                        border: "0",
                        borderRadius: "999px",
                        backgroundColor: "#2E1A16",
                        backgroundImage:
                          "linear-gradient(105deg, transparent 38%, rgba(201,154,91,.5) 47%, rgba(180,105,90,.7) 52%, transparent 62%)",
                        backgroundSize: "260% 100%",
                        backgroundPosition: "120% 0",
                        backgroundRepeat: "no-repeat",
                        color: "#FBF7F2",
                        font: "500 16px var(--font-body)",
                        cursor: "pointer",
                        transition:
                          "background-position 800ms cubic-bezier(.23,1,.32,1), transform 180ms cubic-bezier(.34,1.56,.64,1), opacity 200ms ease",
                        opacity: sendingOpacity,
                      }}
                    >
                      {isSending && (
                        <>
                          <span
                            aria-hidden="true"
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              border: "2px solid rgba(251,247,242,.35)",
                              borderTopColor: "#FBF7F2",
                              animation: "spin 800ms linear infinite",
                            }}
                          />
                        </>
                      )}{" "}
                      {submitLabel}
                    </button>{" "}
                    <p style={{ margin: "0", font: "400 13px/1.5 var(--font-body)", color: "#6B3F35" }}>
                      Saved to the enquiries sheet the team reviews each morning.
                    </p>
                  </div>
                </form>
              </>
            )}{" "}
            {isSuccess && (
              <>
                <div
                  role="status"
                  style={{
                    marginTop: "40px",
                    padding: "clamp(28px,4vw,48px)",
                    background: "#FBF7F2",
                    borderRadius: "28px",
                    boxShadow: "0 30px 60px -40px rgba(46,26,22,.4)",
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "32px",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      position: "relative",
                      width: "240px",
                      height: "160px",
                      margin: "40px auto 0",
                      perspective: "800px",
                    }}
                  >
                    <div style={{ position: "absolute", inset: "0", background: "#E7C3B5", borderRadius: "6px" }} />{" "}
                    <div
                      style={{
                        position: "absolute",
                        left: "16px",
                        right: "16px",
                        top: "12px",
                        height: "130px",
                        background: "#FBF7F2",
                        borderRadius: "3px",
                        boxShadow: "0 0 0 1px rgba(201,154,91,.5)",
                        display: "grid",
                        placeItems: "start center",
                        paddingTop: "18px",
                        animation: "envCard 520ms cubic-bezier(.77,0,.175,1) 120ms both",
                      }}
                    >
                      <span style={{ font: "400 30px/1 var(--font-script)", color: "#6B3F35" }}>thank you</span>
                    </div>{" "}
                    <div
                      style={{
                        position: "absolute",
                        inset: "0",
                        background: "#DDB3A3",
                        borderRadius: "6px",
                        clipPath: "polygon(0 0, 50% 58%, 100% 0, 100% 100%, 0 100%)",
                      }}
                    />{" "}
                    <div
                      style={{
                        position: "absolute",
                        left: "0",
                        right: "0",
                        top: "0",
                        height: "58%",
                        background: "#D3A493",
                        clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                        transformOrigin: "top center",
                        animation: "envFlap 480ms cubic-bezier(.23,1,.32,1) 620ms both",
                      }}
                    />{" "}
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: "34px",
                        height: "34px",
                        margin: "-17px 0 0 -17px",
                        borderRadius: "50%",
                        background: "#6B3F35",
                        display: "grid",
                        placeItems: "center",
                        animation: "sealIn 400ms cubic-bezier(.34,1.56,.64,1) 1050ms both",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24">
                        <path
                          fill="#C99A5B"
                          d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
                        />
                      </svg>
                    </div>
                  </div>{" "}
                  <div
                    style={{
                      flex: "1 1 260px",
                      minWidth: "0",
                      animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) 900ms both",
                    }}
                  >
                    <h2
                      style={{
                        margin: "0",
                        font: "300 clamp(32px,2vw + 16px,44px)/1.1 var(--font-display)",
                        color: "#2E1A16",
                        letterSpacing: "-.05em",
                      }}
                    >
                      Thank you. We&apos;ll message you within the day.
                    </h2>{" "}
                    <p style={{ margin: "12px 0 0", font: "400 16px/1.6 var(--font-body)", color: "#6B3F35" }}>
                      Your enquiry is with the team. If it&apos;s urgent, WhatsApp is quickest.
                    </p>{" "}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "22px" }}>
                      <Link
                        className="ix-he"
                        href="/"
                        onClick={goHome}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          minHeight: "48px",
                          padding: "0 22px",
                          borderRadius: "999px",
                          border: "1px solid rgba(46,26,22,.28)",
                          color: "#2E1A16",
                          font: "500 15px var(--font-body)",
                          textDecoration: "none",
                        }}
                      >
                        Back to home
                      </Link>{" "}
                      <button
                        type="button"
                        onClick={newEnquiry}
                        style={{
                          minHeight: "48px",
                          padding: "0 18px",
                          border: "0",
                          background: "transparent",
                          color: "#2E1A16",
                          font: "500 15px var(--font-body)",
                          textDecoration: "underline",
                          textDecorationColor: "#C99A5B",
                          textUnderlineOffset: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Send another enquiry
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>{" "}
          <aside
            aria-label="Other ways to reach us"
            style={{
              position: "sticky",
              top: "var(--sticky-top)",
              alignSelf: "flex-start",
              flex: "1 1 300px",
              minWidth: "0",
              maxWidth: "440px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) 260ms both",
            }}
          >
            <div style={{ padding: "28px", borderRadius: "24px", background: "#2E1A16", color: "#F3E8DC" }}>
              <p
                style={{
                  margin: "0",
                  font: "600 12px/1.2 var(--font-body)",
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                  color: "#C99A5B",
                }}
              >
                Quickest
              </p>{" "}
              <p style={{ margin: "12px 0 0", font: "300 32px/1.1 var(--font-display)", color: "#FBF7F2" }}>
                Your signature scent is one message away.
              </p>{" "}
              <a
                className="ix-ha ix-a3"
                href={formWaHref}
                target="_blank"
                rel="noopener"
                onClick={headerWaClick}
                onMouseEnter={waHello}
                style={{
                  marginTop: "20px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  minHeight: "52px",
                  padding: "0 22px 0 9px",
                  borderRadius: "999px",
                  background: "#FBF7F2",
                  color: "#2E1A16",
                  font: "500 16px var(--font-body)",
                  textDecoration: "none",
                  transition: "background-color 200ms ease, transform 180ms cubic-bezier(.34,1.56,.64,1)",
                }}
              >
                <span
                  data-wa-icon=""
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    background: "#B4695A",
                    color: "#FBF7F2",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      display: "block",
                      width: "18px",
                      height: "18px",
                      backgroundColor: "currentColor",
                      WebkitMask: "url(/assets/icons/whatsapp.svg) center / contain no-repeat",
                      mask: "url(/assets/icons/whatsapp.svg) center / contain no-repeat",
                    }}
                  />
                </span>{" "}
                +233 595 873 933
              </a>{" "}
              <p style={{ margin: "10px 0 0", font: "400 13px var(--font-body)", color: "#E7C3B5" }}>Opens WhatsApp</p>
            </div>
            <div
              style={{
                padding: "24px 28px",
                borderRadius: "24px",
                background: "#F3E8DC",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                font: "400 15px/1.5 var(--font-body)",
                color: "#2E1A16",
              }}
            >
              <p
                style={{
                  margin: "0",
                  font: "600 12px/1.2 var(--font-body)",
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                  color: "#6B3F35",
                }}
              >
                Find us
              </p>{" "}
              <a
                href="https://instagram.com/_alohascents"
                target="_blank"
                rel="noopener"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  minHeight: "44px",
                  alignItems: "center",
                  color: "#2E1A16",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(46,26,22,.1)",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      display: "block",
                      width: "18px",
                      height: "18px",
                      backgroundColor: "currentColor",
                      WebkitMask: "url(/assets/icons/instagram.svg) center / contain no-repeat",
                      mask: "url(/assets/icons/instagram.svg) center / contain no-repeat",
                    }}
                  />
                  Instagram
                </span>{" "}
                <span style={{ color: "#6B3F35" }}>@_alohascents</span>
              </a>{" "}
              <a
                href="https://www.tiktok.com/@_alohascentsgh"
                target="_blank"
                rel="noopener"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  minHeight: "44px",
                  alignItems: "center",
                  color: "#2E1A16",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(46,26,22,.1)",
                }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      display: "block",
                      width: "18px",
                      height: "18px",
                      backgroundColor: "currentColor",
                      WebkitMask: "url(/assets/icons/tiktok.svg) center / contain no-repeat",
                      mask: "url(/assets/icons/tiktok.svg) center / contain no-repeat",
                    }}
                  />
                  TikTok
                </span>{" "}
                <span style={{ color: "#6B3F35" }}>@_alohascentsgh</span>
              </a>{" "}
              <p
                style={{
                  margin: "0",
                  display: "flex",
                  justifyContent: "space-between",
                  minHeight: "44px",
                  alignItems: "center",
                }}
              >
                Based in <span style={{ color: "#6B3F35" }}>Accra, Ghana</span>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
