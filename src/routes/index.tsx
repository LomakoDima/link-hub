import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Layers, Palette, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkPreview } from "@/components/LinkPreview";
import type { Profile } from "@/lib/link-store";
import { Button } from "@/components/ui/button";
import { Rocket, ArrowRight, Palette, Share2, LayoutPanelTop, Zap } from "lucide-react";
import type { Profile } from "@/lib/link-store";
import { LinkPreview } from "@/components/LinkPreview";

const exampleProfile: Profile = {
  slug: "mayadesigns",
  name: "Maya Reyes",
  bio: "Graphic designer & illustrator\nBrand identity, editorial, and web ✨",
  avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Maya-Reyes&backgroundColor=b6e3f4",
  cover: "",
  theme: "sunset",
  blocks: [
    {
      id: "e-social",
      type: "social",
      socials: [
        { kind: "instagram", url: "https://instagram.com/mayadesigns" },
        { kind: "dribbble", url: "https://dribbble.com/mayadesigns" },
        { kind: "website", url: "https://mayareyes.design" },
      ],
    },
    {
      id: "e-banner",
      type: "banner",
      title: "My portfolio",
      subtitle: "Branding, illustration & web design",
      url: "https://mayareyes.design",
      image: "",
      bannerStyle: "sand",
    },
    {
      id: "e-link",
      type: "link",
      title: "Book a design consult",
      url: "https://mayareyes.design/contact",
    },
    {
      id: "e-contact",
      type: "contact",
      email: "hello@mayareyes.design",
      phone: "+1 (555) 018-2394",
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Linqo — the multi-link builder" },
      {
        name: "description",
        content:

          "Одна ссылка для всех ваших соцсетей и проектов. Красивые темы, живой предпросмотр, мгновенная публикация.",
          "One link for every platform. Build a beautiful all-links page in a minute — no sign-up, no backend.",
      },
      { property: "og:title", content: "Linqo — the multi-link builder" },
      {
        property: "og:description",

        content: "Одна ссылка для всех ваших соцсетей и проектов.",

        content: "One link for every platform. Build a beautiful all-links page in a minute.",

      },
    ],
  }),
  component: LandingPage,
});

const demoProfile: Profile = {
  slug: "demo",
  name: "Анна Корнер",
  bio: "Фотограф, путешественник, автор курса по визуальному контенту",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
  theme: "dark",
  blocks: [
    {
      id: "1",
      type: "banner",
      title: "Мой новый курс",
      subtitle: "Старт 1 сентября",
      url: "https://example.com",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
      bannerStyle: "ember",
      tall: true,
    },
    {
      id: "2",
      type: "link",
      title: "Записаться на консультацию",
      url: "https://example.com",
    },
    {
      id: "3",
      type: "link",
      title: "Портфолио",
      url: "https://example.com",
    },
    {
      id: "4",
      type: "social",
      socials: [
        { kind: "instagram", url: "https://instagram.com" },
        { kind: "telegram", url: "https://telegram.org" },
      ],
    },
  ],
};

const features = [
  {
    icon: Layers,
    title: "Блоки под всё",
    description: "Ссылки, баннеры, заголовки, соцсети и картинки — расставляйте в любом порядке.",
  },
  {
    icon: Palette,
    title: "Красивые темы",
    description: "Тёмная, светлая, закат, океан и лес. Каждая тема адаптируется под ваш контент.",
  },
  {
    icon: Share2,
    title: "Мгновенная публикация",
    description: "Данные хранятся прямо в ссылке — делитесь без регистрации и бэкенда.",
  },
];
const FEATURES = [
  {
    icon: Palette,
    title: "5 hand-tuned themes",
    body: "Midnight, Paper, Sunset, Ocean, Forest — switch anytime, no design skills required.",
  },
  {
    icon: Share2,
    title: "20+ networks",
    body: "Instagram to Discord, Spotify to Threads, plus email and phone as their own contact block.",
  },
  {
    icon: LayoutPanelTop,
    title: "Rich blocks",
    body: "Links, banners, headings, and images — arrange and reorder them however you like.",
  },
  {
    icon: Zap,
    title: "Nothing to host",
    body: "Your page is encoded right into the link. Share it anywhere, no account or server needed.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Add your content",
    body: "Drop in links, a banner, your socials, and a contact block.",
  },
  {
    n: "02",
    title: "Pick a theme",
    body: "Choose from 5 curated looks. The preview updates live as you go.",
  },
  {
    n: "03",
    title: "Share your link",
    body: "Copy it and post it anywhere. That's the whole page, done.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="font-heading text-xl font-semibold tracking-tight">korner.</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to="/build"
            className="hidden text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Редактор
          </Link>
          <Button asChild size="sm">
            <Link to="/build">
              Начать <ArrowRight className="ml-2 h-4 w-4" />
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Linqo.</span>
          </div>
          <Button asChild size="sm">
            <Link to="/build">
              Open builder <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main>

        <section className="mx-auto max-w-7xl px-6 pb-20 pt-10 lg:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <h1 className="font-heading text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Одна ссылка — <br />
                <span className="text-muted-foreground">все ваши проекты</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Соберите минималистичную страницу с соцсетями, баннерами и ссылками за минуту.
                Живой предпросмотр, красивые темы и мгновенная публикация.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link to="/build">
                    Создать страницу <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground">Бесплатно, без регистрации</span>
              </div>
              <ul className="mt-10 space-y-3 text-sm text-muted-foreground">
                {[
                  "Редактор с живым превью",
                  "Готовые темы оформления",
                  "Публикация через одну ссылку",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-muted/60 via-transparent to-muted/40 blur-2xl" />
                <LinkPreview profile={demoProfile} framed />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-sm"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-heading text-lg font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <p className="text-sm font-medium text-muted-foreground">One link. Every platform.</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              All your links,
              <br />
              one beautiful page.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Linqo is a minimal link-in-bio builder. Add your socials, pick a theme, and share one
              link — no sign-up, no backend, live in seconds.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/build">
                  Start building <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>No sign-up</span>
              <span>No backend</span>
              <span>5 themes</span>
              <span>20+ socials</span>
            </div>
          </div>

          <div className="mx-auto">
            <LinkPreview profile={exampleProfile} framed />
          </div>
        </section>

        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Everything you need, nothing you don't
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="rounded-xl border border-border bg-background p-5">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-medium">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <span className="font-heading text-sm font-semibold">korner.</span>
          <p className="text-xs text-muted-foreground">
            Минималистичный конструктор мультиссылок
          </p>
        <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How it works</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n}>
                <span className="text-sm font-semibold text-muted-foreground">{s.n}</span>
                <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-20 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to build yours?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              It takes about a minute, and there's nothing to sign up for.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/build">
                Start building <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Linqo.</span>
          <Link to="/build" className="hover:text-foreground">
            Open the builder →
          </Link>
        </div>
      </footer>
    </div>
  );
}
