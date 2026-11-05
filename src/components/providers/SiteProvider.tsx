"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type MouseEvent,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from "react";
import { PATHS, type Line, type Page, type Vibe, type Who } from "@/content/site";
import { track } from "@/lib/analytics";
import { DRAFT_KEY, EMPTY_FORM, type EnquiryForm, type FieldKey } from "@/lib/enquiry";
import { burst as burstAt } from "@/lib/motion";

export interface GiftRequest {
  title: string;
  detail: string;
  img: string;
}

export interface FinderState {
  step: number;
  dir: number;
  who: Who | null;
  vibe: Vibe | null;
  budget: number | null;
}

export type FormStatus = "idle" | "sending" | "success" | "error";
export type GiftFilter = Line | "occasions";

const pageFromPath = (p: string): Page =>
  p.startsWith("/gifts")
    ? "gifts"
    : p.startsWith("/services")
      ? "services"
      : p.startsWith("/contact")
        ? "contact"
        : "home";

interface SiteContextValue {
  page: Page;
  activeKey: string;
  navigate: (page: Page, anchor?: string | null, key?: string) => void;
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  scrolled: boolean;
  isWide: boolean;
  isReduced: () => boolean;
  isFinePointer: () => boolean;
  burst: (x: number, y: number) => void;
  burstFrom: (el: Element) => void;
  burstRef: RefObject<HTMLDivElement | null>;
  cursorRef: RefObject<HTMLDivElement | null>;
  menuBtnRef: RefObject<HTMLButtonElement | null>;
  closeRef: RefObject<HTMLButtonElement | null>;

  finder: FinderState;
  setFinder: Dispatch<SetStateAction<FinderState>>;
  /** Jump to the finder on the home page, preselecting who it's for. */
  goFinder: (who: Who | null, step: number) => (e: MouseEvent) => void;
  clearFinderTimer: () => void;
  /** Run `fn` after `ms`, replacing any pending finder auto-advance. */
  scheduleFinder: (fn: () => void, ms: number) => void;

  giftFilter: GiftFilter;
  setGiftFilter: Dispatch<SetStateAction<GiftFilter>>;

  note: { to: string; text: string };
  setNote: Dispatch<SetStateAction<{ to: string; text: string }>>;

  request: GiftRequest | null;
  setRequest: Dispatch<SetStateAction<GiftRequest | null>>;
  startRequest: (e: MouseEvent | null, req: GiftRequest, prefill?: Partial<EnquiryForm>) => void;

  form: EnquiryForm;
  setForm: Dispatch<SetStateAction<EnquiryForm>>;
  setField: <K extends keyof EnquiryForm>(k: K, v: EnquiryForm[K]) => void;
  touched: Partial<Record<FieldKey, boolean>>;
  setTouched: Dispatch<SetStateAction<Partial<Record<FieldKey, boolean>>>>;
  focus: FieldKey | null;
  setFocus: Dispatch<SetStateAction<FieldKey | null>>;
  status: FormStatus;
  setStatus: Dispatch<SetStateAction<FormStatus>>;
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const page = pageFromPath(pathname);

  const [navKey, setNavKey] = useState<{ key: string; path: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isWide, setIsWide] = useState(true);
  const [finder, setFinder] = useState<FinderState>({ step: 0, dir: 0, who: null, vibe: null, budget: null });
  const [giftFilter, setGiftFilter] = useState<GiftFilter>("her");
  const [note, setNote] = useState({ to: "", text: "" });
  const [request, setRequest] = useState<GiftRequest | null>(null);
  const [form, setForm] = useState<EnquiryForm>(EMPTY_FORM);
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [focus, setFocus] = useState<FieldKey | null>(null);
  const [status, setStatus] = useState<FormStatus>("idle");

  const reduced = useRef(false);
  const fine = useRef(false);
  const burstRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const finderTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const pageRef = useRef(page);
  useEffect(() => {
    pageRef.current = page;
  }, [page]);

  const activeKey = navKey && navKey.path === pathname ? navKey.key : page;

  // Restore the enquiry draft after hydration (localStorage is client-only).
  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      // Hydration-safe: the server cannot read localStorage, so the draft is restored after mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (draft) setForm({ ...EMPTY_FORM, ...draft, website: "" });
    } catch {
      /* ignore corrupt draft */
    }
  }, []);

  // Environment, scroll-linked effects, keyboard.
  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    fine.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wideMq = window.matchMedia("(min-width: 1040px)");
    const onWide = () => setIsWide(wideMq.matches);
    onWide();
    wideMq.addEventListener("change", onWide);

    const onScroll = () => {
      const ft = document.getElementById("site-footer");
      if (ft && !reduced.current) {
        const r = ft.getBoundingClientRect();
        const p = Math.max(
          0,
          Math.min(1, (r.top + r.height * 0.5 - window.innerHeight) / -(r.height * 0.5 + window.innerHeight * 0.5)),
        );
        ft.style.setProperty("--fy", (1 - p).toFixed(3));
      }
      const hero = document.getElementById("home");
      if (hero && !reduced.current) hero.style.setProperty("--sy", Math.min(window.scrollY, 1200).toFixed(1));
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Cursor sparkle that follows the pointer inside [data-sparkle-zone] areas.
    let onPM: ((e: PointerEvent) => void) | null = null;
    const el = cursorRef.current;
    if (fine.current && !reduced.current && el) {
      let x = 0,
        y = 0,
        tx = 0,
        ty = 0,
        on = false,
        raf = 0;
      const tick = () => {
        x += (tx - x) * 0.2;
        y += (ty - y) * 0.2;
        el.style.transform = `translate(${x}px,${y}px)`;
        raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
      };
      onPM = (e: PointerEvent) => {
        const t = e.target as Element | null;
        const z = !!t?.closest?.("[data-sparkle-zone]");
        if (z !== on) {
          on = z;
          el.style.opacity = on ? "1" : "0";
          if (on) {
            x = e.clientX + 14;
            y = e.clientY + 14;
          }
        }
        tx = e.clientX + 14;
        ty = e.clientY + 14;
        if (!raf && on) raf = requestAnimationFrame(tick);
      };
      window.addEventListener("pointermove", onPM, { passive: true });
    }

    return () => {
      wideMq.removeEventListener("change", onWide);
      window.removeEventListener("scroll", onScroll);
      if (onPM) window.removeEventListener("pointermove", onPM);
    };
  }, []);

  // Re-measure scroll effects whenever the route changes.
  useEffect(() => {
    window.dispatchEvent(new Event("scroll"));
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setTimeout(() => menuBtnRef.current?.focus(), 50);
  }, []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  const navigate = useCallback(
    (to: Page, anchor?: string | null, key?: string) => {
      const same = to === pageRef.current;
      setNavKey({ key: key || to, path: PATHS[to] });
      setMenuOpen(false);
      if (!same) router.push(PATHS[to], { scroll: false });
      const run = (tries: number) => {
        if (anchor) {
          const el = document.getElementById(anchor);
          if (!el && tries > 0) {
            setTimeout(() => run(tries - 1), 50);
            return;
          }
          if (el) {
            window.scrollTo({
              top: el.getBoundingClientRect().top + window.scrollY - 70,
              behavior: same && !reduced.current ? "smooth" : "auto",
            });
            el.setAttribute("tabindex", "-1");
            el.style.outline = "none";
            el.focus({ preventScroll: true });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "auto" });
          document.getElementById("main")?.focus({ preventScroll: true });
        }
      };
      setTimeout(() => run(10), same ? 0 : 80);
      track("page_view", { page: to, anchor: anchor || null });
    },
    [router],
  );

  const burst = useCallback((x: number, y: number) => {
    if (!reduced.current) burstAt(burstRef.current, x, y);
  }, []);
  const burstFrom = useCallback(
    (el: Element) => {
      const r = el.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2);
    },
    [burst],
  );

  const setField = useCallback(<K extends keyof EnquiryForm>(k: K, v: EnquiryForm[K]) => {
    setForm((prev) => {
      const next = { ...prev, [k]: v };
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify({ ...next, website: "" }));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const startRequest = useCallback(
    (e: MouseEvent | null, req: GiftRequest, prefill: Partial<EnquiryForm> = {}) => {
      e?.preventDefault();
      track("request_start", { title: req.title });
      if (e?.currentTarget) burstFrom(e.currentTarget as Element);
      setTimeout(
        () => {
          setForm((prev) => {
            const next = { ...prev } as Record<string, string>;
            for (const [k, v] of Object.entries(prefill)) {
              if (v && (!next[k] || k === "occasion" || k === "budget" || k === "service")) next[k] = v as string;
            }
            return next as unknown as EnquiryForm;
          });
          setRequest(req);
          setStatus("idle");
          navigate("contact", null, "contact");
        },
        reduced.current ? 0 : 320,
      );
    },
    [burstFrom, navigate],
  );

  const clearFinderTimer = useCallback(() => clearTimeout(finderTimerRef.current), []);
  const scheduleFinder = useCallback((fn: () => void, ms: number) => {
    clearTimeout(finderTimerRef.current);
    finderTimerRef.current = setTimeout(fn, ms);
  }, []);
  const goFinder = useCallback(
    (who: Who | null, step: number) => (e: MouseEvent) => {
      e.preventDefault();
      clearTimeout(finderTimerRef.current);
      setFinder({ who, vibe: null, budget: null, step, dir: 1 });
      navigate("home", "finder", "home");
    },
    [navigate],
  );

  const value = useMemo<SiteContextValue>(
    () => ({
      page,
      activeKey,
      navigate,
      menuOpen,
      openMenu,
      closeMenu,
      scrolled,
      isWide,
      isReduced: () => reduced.current,
      isFinePointer: () => fine.current,
      burst,
      burstFrom,
      burstRef,
      cursorRef,
      menuBtnRef,
      closeRef,
      finder,
      setFinder,
      goFinder,
      clearFinderTimer,
      scheduleFinder,
      giftFilter,
      setGiftFilter,
      note,
      setNote,
      request,
      setRequest,
      startRequest,
      form,
      setForm,
      setField,
      touched,
      setTouched,
      focus,
      setFocus,
      status,
      setStatus,
    }),
    [
      page,
      activeKey,
      navigate,
      menuOpen,
      openMenu,
      closeMenu,
      scrolled,
      isWide,
      burst,
      burstFrom,
      finder,
      goFinder,
      clearFinderTimer,
      scheduleFinder,
      giftFilter,
      note,
      request,
      startRequest,
      form,
      setField,
      touched,
      focus,
      status,
    ],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}
