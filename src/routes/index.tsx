import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Layers, Palette, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkPreview } from "@/components/LinkPreview";
import type { Profile } from "@/lib/link-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Korner — конструктор мультиссылок" },
      {
        name: "description",
        content:
          "Одна ссылка для всех ваших соцсетей и проектов. Красивые темы, живой предпросмотр, мгновенная публикация.",
      },
      { property: "og:title", content: "Korner — конструктор мультиссылок" },
      {
        property: "og:description",
        content: "Одна ссылка для всех ваших соцсетей и проектов.",
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
        </div>
      </footer>
    </div>
  );
}
