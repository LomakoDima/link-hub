export type LinkBlockType = "link" | "banner" | "header" | "social" | "contact" | "image";

export type SocialKind =
  | "instagram"
  | "telegram"
  | "tiktok"
  | "youtube"
  | "twitter"
  | "x"
  | "threads"
  | "facebook"
  | "whatsapp"
  | "discord"
  | "twitch"
  | "pinterest"
  | "spotify"
  | "dribbble"
  | "figma"
  | "slack"
  | "linkedin"
  | "github"
  | "website";

export type BannerStyle =
  | "dark"
  | "ember"
  | "crimson"
  | "midnight"
  | "sand"
  | "violet"
  | "teal"
  | "rose"
  | "gold"
  | "pine"
  | "storm"
  | "coral";

export type BannerPattern =
  | "honeycomb"
  | "spikes"
  | "dots"
  | "stars"
  | "dunes"
  | "diamonds"
  | "chevron"
  | "ripples"
  | "sparkle"
  | "trees"
  | "bolts"
  | "coral";

export interface LinkBlock {
  id: string;
  type: LinkBlockType;
  title?: string;
  subtitle?: string;
  url?: string;
  socials?: { kind: SocialKind; url: string }[];
  email?: string;
  phone?: string;
  image?: string;
  bannerStyle?: BannerStyle;
  bannerPattern?: BannerPattern;
  tall?: boolean;
}

export type ThemeName =
  | "dark"
  | "light"
  | "sunset"
  | "ocean"
  | "forest"
  | "aurora"
  | "candy"
  | "slate"
  | "blush"
  | "lavender"
  | "citrus"
  | "mint"
  | "noir"
  | "charcoal"
  | "cream"
  | "navy"
  | "sage"
  | "plum"
  | "tan"
  | "steel"
  | "peach"
  | "grape"
  | "arctic"
  | "wildfire"
  | "twilight";

export interface Profile {
  slug: string;
  avatar: string;
  cover: string;
  name: string;
  bio: string;
  theme: ThemeName;
  blocks: LinkBlock[];
}

export type ThemeKind = "solid" | "gradient";

export const THEMES: Record<
  ThemeName,
  {
    bg: string;
    card: string;
    text: string;
    muted: string;
    accent: string;
    label: string;
    kind: ThemeKind;
  }
> = {
  dark: {
    label: "Midnight",
    kind: "solid",
    bg: "bg-[#0b0b0f] text-white",
    card: "bg-white/5 hover:bg-white/10 border border-white/10",
    text: "text-white",
    muted: "text-white/60",
    accent: "text-orange-400",
  },
  light: {
    label: "Paper",
    kind: "solid",
    bg: "bg-[#f6f4ef] text-neutral-900",
    card: "bg-white hover:bg-neutral-50 border border-neutral-200 shadow-sm",
    text: "text-neutral-900",
    muted: "text-neutral-500",
    accent: "text-orange-600",
  },
  sunset: {
    label: "Sunset",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#2a0a0a] via-[#3b0f05] to-[#1a0505] text-white",
    card: "bg-gradient-to-r from-orange-600/30 to-red-700/30 hover:from-orange-600/40 hover:to-red-700/40 border border-orange-500/30",
    text: "text-white",
    muted: "text-orange-100/70",
    accent: "text-orange-300",
  },
  ocean: {
    label: "Ocean",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#031b2f] via-[#062a45] to-[#01111d] text-white",
    card: "bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30",
    text: "text-white",
    muted: "text-cyan-100/70",
    accent: "text-cyan-300",
  },
  forest: {
    label: "Forest",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#0a1f14] via-[#0f2d1c] to-[#04120a] text-white",
    text: "text-white",
    card: "bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30",
    muted: "text-emerald-100/70",
    accent: "text-emerald-300",
  },
  aurora: {
    label: "Aurora",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#052e2b] via-[#0a3d55] to-[#1a0a3d] text-white",
    card: "bg-teal-400/10 hover:bg-teal-400/20 border border-teal-300/30",
    text: "text-white",
    muted: "text-teal-100/70",
    accent: "text-teal-300",
  },
  candy: {
    label: "Candy",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#3a0a2e] via-[#5a1050] to-[#1a0a2e] text-white",
    card: "bg-pink-400/10 hover:bg-pink-400/20 border border-pink-300/30",
    text: "text-white",
    muted: "text-pink-100/70",
    accent: "text-pink-300",
  },
  slate: {
    label: "Slate",
    kind: "solid",
    bg: "bg-[#1b2430] text-white",
    card: "bg-white/5 hover:bg-white/10 border border-white/10",
    text: "text-white",
    muted: "text-slate-300/70",
    accent: "text-sky-400",
  },
  blush: {
    label: "Blush",
    kind: "solid",
    bg: "bg-[#fdf1f3] text-neutral-900",
    card: "bg-white hover:bg-rose-50 border border-rose-200 shadow-sm",
    text: "text-neutral-900",
    muted: "text-rose-500/70",
    accent: "text-rose-600",
  },
  lavender: {
    label: "Lavender",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#efeaff] via-[#e4dbfb] to-[#d9cdf7] text-neutral-900",
    card: "bg-white/70 hover:bg-white/90 border border-purple-200 shadow-sm",
    text: "text-neutral-900",
    muted: "text-purple-700/60",
    accent: "text-purple-600",
  },
  citrus: {
    label: "Citrus",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#3a1f02] via-[#5a3405] to-[#2a1601] text-white",
    card: "bg-amber-400/10 hover:bg-amber-400/20 border border-amber-300/30",
    text: "text-white",
    muted: "text-amber-100/70",
    accent: "text-amber-300",
  },
  mint: {
    label: "Mint",
    kind: "solid",
    bg: "bg-[#eefaf3] text-neutral-900",
    card: "bg-white hover:bg-emerald-50 border border-emerald-200 shadow-sm",
    text: "text-neutral-900",
    muted: "text-emerald-600/70",
    accent: "text-emerald-600",
  },
  noir: {
    label: "Noir",
    kind: "solid",
    bg: "bg-black text-white",
    card: "bg-white/10 hover:bg-white/20 border border-white/20",
    text: "text-white",
    muted: "text-white/50",
    accent: "text-white",
  },
  charcoal: {
    label: "Charcoal",
    kind: "solid",
    bg: "bg-[#2b2b2b] text-white",
    card: "bg-white/5 hover:bg-white/10 border border-white/10",
    text: "text-white",
    muted: "text-white/55",
    accent: "text-orange-300",
  },
  cream: {
    label: "Cream",
    kind: "solid",
    bg: "bg-[#faf6ec] text-neutral-900",
    card: "bg-white hover:bg-neutral-50 border border-neutral-200 shadow-sm",
    text: "text-neutral-900",
    muted: "text-neutral-500",
    accent: "text-amber-600",
  },
  navy: {
    label: "Navy",
    kind: "solid",
    bg: "bg-[#0d1b2a] text-white",
    card: "bg-blue-400/10 hover:bg-blue-400/20 border border-blue-300/25",
    text: "text-white",
    muted: "text-blue-100/70",
    accent: "text-blue-300",
  },
  sage: {
    label: "Sage",
    kind: "solid",
    bg: "bg-[#eef1e8] text-neutral-900",
    card: "bg-white hover:bg-green-50 border border-green-200 shadow-sm",
    text: "text-neutral-900",
    muted: "text-green-700/60",
    accent: "text-green-700",
  },
  plum: {
    label: "Plum",
    kind: "solid",
    bg: "bg-[#2a1030] text-white",
    card: "bg-fuchsia-400/10 hover:bg-fuchsia-400/20 border border-fuchsia-300/25",
    text: "text-white",
    muted: "text-fuchsia-100/70",
    accent: "text-fuchsia-300",
  },
  tan: {
    label: "Tan",
    kind: "solid",
    bg: "bg-[#e8dcc8] text-neutral-900",
    card: "bg-white hover:bg-amber-50 border border-amber-200 shadow-sm",
    text: "text-neutral-900",
    muted: "text-amber-800/60",
    accent: "text-amber-800",
  },
  steel: {
    label: "Steel",
    kind: "solid",
    bg: "bg-[#3a4550] text-white",
    card: "bg-white/10 hover:bg-white/15 border border-white/15",
    text: "text-white",
    muted: "text-slate-200/70",
    accent: "text-cyan-300",
  },
  peach: {
    label: "Peach",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#ffe8d6] via-[#ffd3b0] to-[#ffb98a] text-neutral-900",
    card: "bg-white/70 hover:bg-white/90 border border-orange-200 shadow-sm",
    text: "text-neutral-900",
    muted: "text-orange-700/60",
    accent: "text-orange-600",
  },
  grape: {
    label: "Grape",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#1f0a2e] via-[#3a1050] to-[#150620] text-white",
    card: "bg-purple-400/10 hover:bg-purple-400/20 border border-purple-300/30",
    text: "text-white",
    muted: "text-purple-100/70",
    accent: "text-purple-300",
  },
  arctic: {
    label: "Arctic",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#e8f4f8] via-[#d0e8f0] to-[#b8dce8] text-neutral-900",
    card: "bg-white/70 hover:bg-white/90 border border-sky-200 shadow-sm",
    text: "text-neutral-900",
    muted: "text-sky-700/60",
    accent: "text-sky-600",
  },
  wildfire: {
    label: "Wildfire",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#3a0505] via-[#7a1f05] to-[#2a0a02] text-white",
    card: "bg-red-500/10 hover:bg-red-500/20 border border-red-400/30",
    text: "text-white",
    muted: "text-red-100/70",
    accent: "text-red-300",
  },
  twilight: {
    label: "Twilight",
    kind: "gradient",
    bg: "bg-gradient-to-b from-[#0a1030] via-[#2a1550] to-[#3a1030] text-white",
    card: "bg-indigo-400/10 hover:bg-indigo-400/20 border border-indigo-300/30",
    text: "text-white",
    muted: "text-indigo-100/70",
    accent: "text-indigo-300",
  },
};

export const BANNER_STYLES: Record<BannerStyle, { gradient: string; ring: string; label: string }> = {
  dark: {
    label: "Graphite",
    gradient: "bg-[radial-gradient(ellipse_at_top_right,rgba(234,88,12,0.15),transparent_60%),linear-gradient(135deg,#111114,#1c1c22)]",
    ring: "ring-1 ring-white/10",
  },
  ember: {
    label: "Ember",
    gradient: "bg-[radial-gradient(ellipse_at_right,rgba(255,120,50,0.35),transparent_65%),linear-gradient(135deg,#2a0f06,#4a1608)]",
    ring: "ring-1 ring-orange-500/30",
  },
  crimson: {
    label: "Crimson",
    gradient: "bg-[radial-gradient(ellipse_at_left,rgba(220,38,38,0.35),transparent_60%),linear-gradient(135deg,#3a0808,#7a0f0f)]",
    ring: "ring-1 ring-red-500/30",
  },
  midnight: {
    label: "Midnight",
    gradient: "bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.35),transparent_60%),linear-gradient(135deg,#0a1e3a,#1e3a6a)]",
    ring: "ring-1 ring-blue-400/30",
  },
  sand: {
    label: "Sand",
    gradient: "bg-[linear-gradient(135deg,#f5efe4,#e6d9c2)]",
    ring: "ring-1 ring-amber-900/20",
  },
  violet: {
    label: "Violet",
    gradient: "bg-[radial-gradient(ellipse_at_top_left,rgba(168,85,247,0.35),transparent_65%),linear-gradient(135deg,#1e0a30,#3a1050)]",
    ring: "ring-1 ring-purple-500/30",
  },
  teal: {
    label: "Teal",
    gradient: "bg-[radial-gradient(ellipse_at_right,rgba(45,212,191,0.35),transparent_65%),linear-gradient(135deg,#042a28,#0a4a45)]",
    ring: "ring-1 ring-teal-400/30",
  },
  rose: {
    label: "Rose",
    gradient: "bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,0.35),transparent_60%),linear-gradient(135deg,#3a0818,#6a1030)]",
    ring: "ring-1 ring-rose-500/30",
  },
  gold: {
    label: "Gold",
    gradient: "bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.35),transparent_60%),linear-gradient(135deg,#2a1e02,#4a3508)]",
    ring: "ring-1 ring-yellow-400/30",
  },
  pine: {
    label: "Pine",
    gradient: "bg-[radial-gradient(ellipse_at_left,rgba(52,211,153,0.3),transparent_65%),linear-gradient(135deg,#04160c,#0a2e1a)]",
    ring: "ring-1 ring-emerald-500/30",
  },
  storm: {
    label: "Storm",
    gradient: "bg-[radial-gradient(ellipse_at_bottom,rgba(100,116,139,0.35),transparent_60%),linear-gradient(135deg,#12181f,#252f3a)]",
    ring: "ring-1 ring-slate-400/30",
  },
  coral: {
    label: "Coral",
    gradient: "bg-[radial-gradient(ellipse_at_right,rgba(251,146,60,0.35),transparent_65%),linear-gradient(135deg,#3a1206,#5a2410)]",
    ring: "ring-1 ring-orange-400/30",
  },
};

// Geometric line-art motifs available to every banner color equally — pattern
// and color are independent choices, not paired presets. Each motif is a bare
// shape (no stroke color baked in) so `bannerPatternUrl` can tint it to
// contrast correctly against whichever color it's paired with.
const PATTERN_SHAPES: Record<BannerPattern, { label: string; w: number; h: number; inner: string }> = {
  honeycomb: {
    label: "Honeycomb",
    w: 84,
    h: 96,
    inner: "<path d='M42 2 l40 23 v46 l-40 23 l-40 -23 v-46 z'/><path d='M42 26 l20 11 v22 l-20 11 l-20 -11 v-22 z'/>",
  },
  spikes: {
    label: "Spikes",
    w: 60,
    h: 40,
    inner: "<path d='M0 40 L10 20 L20 40'/><path d='M20 40 L30 20 L40 40'/><path d='M40 40 L50 20 L60 40'/><path d='M-10 20 L0 0 L10 20'/><path d='M30 20 L40 0 L50 20'/>",
  },
  dots: {
    label: "Dots",
    w: 40,
    h: 40,
    inner: "<circle cx='6' cy='6' r='2'/><circle cx='20' cy='6' r='2'/><circle cx='34' cy='6' r='2'/><circle cx='13' cy='20' r='2'/><circle cx='27' cy='20' r='2'/><circle cx='6' cy='34' r='2'/><circle cx='20' cy='34' r='2'/><circle cx='34' cy='34' r='2'/>",
  },
  stars: {
    label: "Stars",
    w: 90,
    h: 90,
    inner: "<path d='M15 10 L17 16 L23 16 L18 20 L20 26 L15 22 L10 26 L12 20 L7 16 L13 16 Z'/><path d='M65 25 L66 29 L70 29 L67 32 L68 36 L65 33 L62 36 L63 32 L60 29 L64 29 Z'/><path d='M40 55 L42 61 L48 61 L43 65 L45 71 L40 67 L35 71 L37 65 L32 61 L38 61 Z'/><circle cx='75' cy='70' r='1.5'/><circle cx='25' cy='75' r='1.5'/><circle cx='55' cy='15' r='1.5'/>",
  },
  dunes: {
    label: "Dunes",
    w: 100,
    h: 40,
    inner: "<path d='M0 10 Q25 0 50 10 T100 10'/><path d='M0 25 Q25 15 50 25 T100 25'/>",
  },
  diamonds: {
    label: "Diamonds",
    w: 50,
    h: 50,
    inner: "<path d='M12 0 L24 12 L12 24 L0 12 Z'/><path d='M37 0 L49 12 L37 24 L25 12 Z'/><path d='M12 25 L24 37 L12 49 L0 37 Z'/><path d='M37 25 L49 37 L37 49 L25 37 Z'/>",
  },
  chevron: {
    label: "Chevron",
    w: 60,
    h: 30,
    inner: "<path d='M0 10 L15 0 L30 10 L45 0 L60 10'/><path d='M0 25 L15 15 L30 25 L45 15 L60 25'/>",
  },
  ripples: {
    label: "Ripples",
    w: 70,
    h: 70,
    inner: "<circle cx='20' cy='20' r='6'/><circle cx='20' cy='20' r='12'/><circle cx='55' cy='45' r='6'/><circle cx='55' cy='45' r='12'/>",
  },
  sparkle: {
    label: "Sparkle",
    w: 60,
    h: 60,
    inner: "<path d='M15 5 L17 13 L25 15 L17 17 L15 25 L13 17 L5 15 L13 13 Z'/><path d='M45 30 L46.5 36 L52 37.5 L46.5 39 L45 45 L43.5 39 L38 37.5 L43.5 36 Z'/>",
  },
  trees: {
    label: "Trees",
    w: 50,
    h: 60,
    inner: "<path d='M10 10 L18 25 L2 25 Z'/><path d='M10 20 L20 38 L0 38 Z'/><path d='M35 5 L42 18 L28 18 Z'/><path d='M35 15 L44 30 L26 30 Z'/>",
  },
  bolts: {
    label: "Bolts",
    w: 50,
    h: 70,
    inner: "<path d='M20 5 L10 30 L20 30 L8 55'/><path d='M40 15 L33 35 L41 35 L30 60'/>",
  },
  coral: {
    label: "Coral",
    w: 60,
    h: 60,
    inner: "<path d='M15 5 L15 25 M5 15 L25 15'/><path d='M45 30 L45 50 M35 40 L55 40'/><path d='M15 45 L15 55 M10 50 L20 50'/>",
  },
};

export const BANNER_PATTERNS: Record<BannerPattern, { label: string }> = Object.fromEntries(
  (Object.keys(PATTERN_SHAPES) as BannerPattern[]).map((k) => [k, { label: PATTERN_SHAPES[k].label }]),
) as Record<BannerPattern, { label: string }>;

// Builds the pattern's SVG data URI, tinted dark-on-light or light-on-dark so
// it stays visible no matter which banner color it's paired with.
export function bannerPatternUrl(name: BannerPattern, light: boolean): string {
  const shape = PATTERN_SHAPES[name];
  const color = light ? "%23000000" : "%23ffffff";
  const opacity = light ? 0.25 : 0.22;
  return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='${shape.w}' height='${shape.h}' viewBox='0 0 ${shape.w} ${shape.h}'><g fill='none' stroke='${color}' stroke-opacity='${opacity}' stroke-width='1.3'>${shape.inner}</g></svg>")`;
}

const STORAGE_KEY = "linqo_profile_v2";

export const defaultProfile: Profile = {
  slug: "yourname",
  name: "yourname",
  bio: "A few words about yourself\nand your project ✨",
  avatar: "",
  cover: "",
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

function normalizeProfile(raw: unknown): Profile {
  const r = (raw && typeof raw === "object" ? raw : {}) as Partial<Profile>;
  return {
    slug: typeof r.slug === "string" ? r.slug : defaultProfile.slug,
    name: typeof r.name === "string" ? r.name : defaultProfile.name,
    bio: typeof r.bio === "string" ? r.bio : defaultProfile.bio,
    avatar: typeof r.avatar === "string" ? r.avatar : defaultProfile.avatar,
    cover: typeof r.cover === "string" ? r.cover : defaultProfile.cover,
    theme: typeof r.theme === "string" && r.theme in THEMES ? r.theme : defaultProfile.theme,
    blocks: Array.isArray(r.blocks) ? r.blocks : defaultProfile.blocks,
  };
}

export function loadProfile(): Profile {
  if (typeof window === "undefined") return defaultProfile;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile;
    return normalizeProfile(JSON.parse(raw));
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
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") return null;
    return normalizeProfile(parsed);
  } catch {
    return null;
  }
}

export function mailtoHref(value: string): string {
  if (!value) return "#";
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export function telHref(value: string): string {
  if (!value) return "#";
  if (value.startsWith("tel:")) return value;
  return `tel:${value.replace(/[^\d+]/g, "")}`;
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
