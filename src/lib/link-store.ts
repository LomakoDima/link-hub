export type LinkBlockType = "link" | "banner" | "header" | "social" | "image";

export type SocialKind =
  | "instagram"
  | "telegram"
  | "tiktok"
  | "youtube"
  | "twitter"
  | "linkedin"
  | "github"
  | "website";

export type BannerStyle = "dark" | "ember" | "crimson" | "midnight" | "sand";

export interface LinkBlock {
  id: string;
  type: LinkBlockType;
  title?: string;
  subtitle?: string;
  url?: string;
  socials?: { kind: SocialKind; url: string }[];
  image?: string;
  bannerStyle?: BannerStyle;
  tall?: boolean;
}

export type ThemeName = "dark" | "light" | "sunset" | "ocean" | "forest";

export interface Profile {
  slug: string;
  avatar: string;
  name: string;
  bio: string;
  theme: ThemeName;
  blocks: LinkBlock[];
}

export const THEMES: Record<
  ThemeName,
  { bg: string; card: string; text: string; muted: string; accent: string; label: string }
> = {
  dark: {
    label: "Midnight",
    bg: "bg-[#0b0b0f] text-white",
    card: "bg-white/5 hover:bg-white/10 border border-white/10",
    text: "text-white",
    muted: "text-white/60",
    accent: "text-orange-400",
  },
  light: {
    label: "Paper",
    bg: "bg-[#f6f4ef] text-neutral-900",
    card: "bg-white hover:bg-neutral-50 border border-neutral-200 shadow-sm",
    text: "text-neutral-900",
    muted: "text-neutral-500",
    accent: "text-orange-600",
  },
  sunset: {
    label: "Sunset",
    bg: "bg-gradient-to-b from-[#2a0a0a] via-[#3b0f05] to-[#1a0505] text-white",
    card: "bg-gradient-to-r from-orange-600/30 to-red-700/30 hover:from-orange-600/40 hover:to-red-700/40 border border-orange-500/30",
    text: "text-white",
    muted: "text-orange-100/70",
    accent: "text-orange-300",
  },
  ocean: {
    label: "Ocean",
    bg: "bg-gradient-to-b from-[#031b2f] via-[#062a45] to-[#01111d] text-white",
    card: "bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30",
    text: "text-white",
    muted: "text-cyan-100/70",
    accent: "text-cyan-300",
  },
  forest: {
    label: "Forest",
    bg: "bg-gradient-to-b from-[#0a1f14] via-[#0f2d1c] to-[#04120a] text-white",
    text: "text-white",
    card: "bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30",
    muted: "text-emerald-100/70",
    accent: "text-emerald-300",
  },
};

export const BANNER_STYLES: Record<
  BannerStyle,
  { gradient: string; ring: string; label: string }
> = {
  dark: {
    label: "Графит",
    gradient: "bg-[radial-gradient(ellipse_at_top_right,rgba(234,88,12,0.15),transparent_60%),linear-gradient(135deg,#111114,#1c1c22)]",
    ring: "ring-1 ring-white/10",
  },
  ember: {
    label: "Уголь",
    gradient: "bg-[radial-gradient(ellipse_at_right,rgba(255,120,50,0.35),transparent_65%),linear-gradient(135deg,#2a0f06,#4a1608)]",
    ring: "ring-1 ring-orange-500/30",
  },
  crimson: {
    label: "Кармин",
    gradient: "bg-[radial-gradient(ellipse_at_left,rgba(220,38,38,0.35),transparent_60%),linear-gradient(135deg,#3a0808,#7a0f0f)]",
    ring: "ring-1 ring-red-500/30",
  },
  midnight: {
    label: "Полночь",
    gradient: "bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35),transparent_60%),linear-gradient(135deg,#0a1e3a,#1e3a6a)]",
    ring: "ring-1 ring-blue-400/30",
  },
  sand: {
    label: "Песок",
    gradient: "bg-[linear-gradient(135deg,#f5efe4,#e6d9c2)]",
    ring: "ring-1 ring-amber-900/20",
  },
};

const STORAGE_KEY = "korner_profile_v2";

export const defaultProfile: Profile = {
  slug: "yourname",
  name: "yourname",
  bio: "Пара слов о себе\nи вашем проекте ✨",
  avatar: "",
  theme: "dark",
  blocks: [
    {
      id: "s1",
      type: "social",
      socials: [
        { kind: "instagram", url: "" },
        { kind: "telegram", url: "" },
        { kind: "youtube", url: "" },
      ],
    },
  ],
};

export function loadProfile(): Profile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    return defaultProfile;
  }
}

export function saveProfile(p: Profile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

export function encodeProfile(p: Profile): string {
  const json = JSON.stringify(p);
  return btoa(unescape(encodeURIComponent(json)));
}

export function decodeProfile(s: string): Profile | null {
  try {
    const json = decodeURIComponent(escape(atob(s)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
