import { uid, type LinkBlock, type ThemeName } from "./link-store";

export interface Template {
  id: string;
  name: string;
  description: string;
  theme: ThemeName;
  blocks: Omit<LinkBlock, "id">[];
}

export const TEMPLATES: Template[] = [
  {
    id: "creator",
    name: "Creator",
    description: "Socials up front, a big banner for your latest drop.",
    theme: "sunset",
    blocks: [
      {
        type: "social",
        socials: [
          { kind: "instagram", url: "" },
          { kind: "youtube", url: "" },
          { kind: "tiktok", url: "" },
        ],
      },
      {
        type: "banner",
        title: "My latest video",
        subtitle: "Watch the newest upload",
        url: "https://",
        bannerStyle: "ember",
        bannerPattern: "sparkle",
      },
      { type: "link", title: "Subscribe", url: "https://" },
      { type: "link", title: "Merch store", url: "https://" },
    ],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "A bento-style showcase for work samples and a hire link.",
    theme: "slate",
    blocks: [
      { type: "header", title: "Selected work" },
      {
        type: "banner",
        title: "Featured project",
        subtitle: "Case study",
        url: "https://",
        bannerStyle: "midnight",
        bannerLayout: "vertical",
        bannerPattern: "none",
      },
      { type: "image", image: "", url: "https://" },
      { type: "link", title: "View full portfolio", url: "https://" },
      { type: "contact", email: "", phone: "" },
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "Clean and simple — services, booking link, and contact info.",
    theme: "light",
    blocks: [
      { type: "header", title: "Services" },
      { type: "link", title: "Book a consultation", url: "https://" },
      { type: "link", title: "View pricing", url: "https://" },
      {
        type: "social",
        socials: [
          { kind: "linkedin", url: "" },
          { kind: "website", url: "" },
        ],
      },
      { type: "contact", email: "", phone: "" },
    ],
  },
  {
    id: "musician",
    name: "Musician",
    description: "Lead with a release banner, then streaming links and tour dates.",
    theme: "grape",
    blocks: [
      {
        type: "banner",
        title: "New single out now",
        subtitle: "Stream everywhere",
        url: "https://",
        bannerStyle: "violet",
        bannerPattern: "stars",
      },
      { type: "link", title: "Listen on Spotify", url: "https://" },
      { type: "link", title: "Tour dates", url: "https://" },
      {
        type: "social",
        socials: [
          { kind: "spotify", url: "" },
          { kind: "instagram", url: "" },
          { kind: "youtube", url: "" },
        ],
      },
    ],
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Just the essentials — a short list of links, nothing else.",
    theme: "noir",
    blocks: [
      { type: "link", title: "My website", url: "https://" },
      { type: "link", title: "Newsletter", url: "https://" },
      { type: "link", title: "Say hello", url: "https://" },
    ],
  },
  {
    id: "streamer",
    name: "Streamer",
    description: "Go-live banner, socials, and support links for a gaming audience.",
    theme: "twilight",
    blocks: [
      {
        type: "banner",
        title: "Live on Twitch",
        subtitle: "Tap in for the schedule",
        url: "https://",
        bannerStyle: "storm",
        bannerPattern: "bolts",
      },
      {
        type: "social",
        socials: [
          { kind: "twitch", url: "" },
          { kind: "discord", url: "" },
          { kind: "twitter", url: "" },
        ],
      },
      { type: "link", title: "Support the stream", url: "https://" },
    ],
  },
];

export function instantiateTemplate(t: Template): LinkBlock[] {
  return t.blocks.map((b) => ({ ...b, id: uid() }));
}
