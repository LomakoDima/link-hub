import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Link as LinkIcon,
  Heading1,
  Share2,
  Image as ImageIcon,
  Eye,
  Copy,
  Rocket,
  LayoutPanelTop,
} from "lucide-react";
import {
  THEMES,
  defaultProfile,
  loadProfile,
  saveProfile,
  uid,
  encodeProfile,
  type LinkBlock,
  type Profile,
  type ThemeName,
} from "@/lib/link-store";
import { LinkPreview } from "@/components/LinkPreview";
import { BlockEditor } from "@/components/BlockEditor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Korner — конструктор мультиссылок" },
      {
        name: "description",
        content:
          "Собери свою страницу со всеми ссылками за минуту. Красивые темы, соцсети, живой предпросмотр.",
      },
      { property: "og:title", content: "Korner — конструктор мультиссылок" },
      {
        property: "og:description",
        content: "Собери свою страницу со всеми ссылками за минуту.",
      },
    ],
  }),
  component: BuilderPage,
});

function BuilderPage() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveProfile(profile);
  }, [profile, ready]);

  const update = (patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch }));

  const addBlock = (type: LinkBlock["type"]) => {
    const nb: LinkBlock =
      type === "social"
        ? { id: uid(), type, socials: [{ kind: "instagram", url: "" }] }
        : type === "header"
          ? { id: uid(), type, title: "Новый заголовок" }
          : type === "image"
            ? { id: uid(), type, image: "", url: "" }
            : type === "banner"
              ? {
                  id: uid(),
                  type: "banner",
                  title: "Новый баннер",
                  subtitle: "",
                  url: "https://",
                  image: "",
                  bannerStyle: "ember",
                }
              : { id: uid(), type: "link", title: "Новая ссылка", url: "https://" };
    setProfile((p) => ({ ...p, blocks: [...p.blocks, nb] }));
  };

  const updateBlock = (b: LinkBlock) =>
    setProfile((p) => ({ ...p, blocks: p.blocks.map((x) => (x.id === b.id ? b : x)) }));
  const removeBlock = (id: string) =>
    setProfile((p) => ({ ...p, blocks: p.blocks.filter((x) => x.id !== id) }));
  const moveBlock = (id: string, dir: -1 | 1) =>
    setProfile((p) => {
      const i = p.blocks.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= p.blocks.length) return p;
      const next = [...p.blocks];
      [next[i], next[j]] = [next[j], next[i]];
      return { ...p, blocks: next };
    });

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/p/${profile.slug}#${encodeProfile(profile)}`;
  }, [profile]);

  const copyShare = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Ссылка скопирована");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">korner.</span>
            <span className="ml-2 hidden text-sm text-muted-foreground sm:inline">
              конструктор мультиссылок
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyShare}>
              <Copy className="mr-2 h-4 w-4" /> Копировать
            </Button>
            <a href={shareUrl} target="_blank" rel="noreferrer">
              <Button size="sm">
                <Eye className="mr-2 h-4 w-4" /> Открыть
              </Button>
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[1fr_380px]">
        <div>
          <Tabs defaultValue="content" className="w-full">
            <TabsList>
              <TabsTrigger value="content">Контент</TabsTrigger>
              <TabsTrigger value="design">Дизайн</TabsTrigger>
              <TabsTrigger value="profile">Профиль</TabsTrigger>
              <TabsTrigger value="share">Публикация</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={() => addBlock("link")}>
                  <LinkIcon className="mr-2 h-4 w-4" /> Ссылка
                </Button>
                <Button variant="default" size="sm" onClick={() => addBlock("banner")}>
                  <LayoutPanelTop className="mr-2 h-4 w-4" /> Баннер
                </Button>
                <Button variant="secondary" size="sm" onClick={() => addBlock("header")}>
                  <Heading1 className="mr-2 h-4 w-4" /> Заголовок
                </Button>
                <Button variant="secondary" size="sm" onClick={() => addBlock("social")}>
                  <Share2 className="mr-2 h-4 w-4" /> Соцсети
                </Button>
                <Button variant="secondary" size="sm" onClick={() => addBlock("image")}>
                  <ImageIcon className="mr-2 h-4 w-4" /> Картинка
                </Button>
              </div>

              <div className="space-y-3">
                {profile.blocks.map((b, i) => (
                  <BlockEditor
                    key={b.id}
                    block={b}
                    onChange={updateBlock}
                    onDelete={() => removeBlock(b.id)}
                    onMove={(d) => moveBlock(b.id, d)}
                    canUp={i > 0}
                    canDown={i < profile.blocks.length - 1}
                  />
                ))}
                {profile.blocks.length === 0 && (
                  <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                    Добавьте первый блок кнопкой выше
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-6">
              <Label className="mb-3 block">Тема оформления</Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {(Object.keys(THEMES) as ThemeName[]).map((name) => {
                  const t = THEMES[name];
                  const active = profile.theme === name;
                  return (
                    <button
                      key={name}
                      onClick={() => update({ theme: name })}
                      className={`overflow-hidden rounded-xl border-2 text-left transition ${
                        active ? "border-primary" : "border-transparent"
                      }`}
                    >
                      <div className={`${t.bg} p-4`}>
                        <div className="mb-2 h-2 w-8 rounded bg-white/50" />
                        <div className={`h-6 rounded ${t.card}`} />
                        <div className={`mt-2 h-6 rounded ${t.card}`} />
                      </div>
                      <div className="bg-card px-3 py-2 text-sm font-medium">{t.label}</div>
                    </button>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-6 space-y-4">
              <div>
                <Label>Никнейм (@slug)</Label>
                <Input
                  value={profile.slug}
                  onChange={(e) =>
                    update({ slug: e.target.value.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase() })
                  }
                />
              </div>
              <div>
                <Label>Имя</Label>
                <Input value={profile.name} onChange={(e) => update({ name: e.target.value })} />
              </div>
              <div>
                <Label>О себе</Label>
                <Textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => update({ bio: e.target.value })}
                />
              </div>
              <div>
                <Label>URL аватара</Label>
                <Input
                  value={profile.avatar}
                  onChange={(e) => update({ avatar: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </TabsContent>

            <TabsContent value="share" className="mt-6 space-y-4">
              <div>
                <Label>Ссылка на вашу страницу</Label>
                <div className="flex gap-2">
                  <Input readOnly value={shareUrl} />
                  <Button onClick={copyShare}>
                    <Copy className="mr-2 h-4 w-4" /> Копировать
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Данные закодированы в самой ссылке — можно делиться без бэкенда.
                </p>
              </div>
              <a href={shareUrl} target="_blank" rel="noreferrer" className="inline-block">
                <Button variant="secondary">
                  <Eye className="mr-2 h-4 w-4" /> Предпросмотр в новой вкладке
                </Button>
              </a>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="hidden lg:block">
          <LinkPreview profile={profile} framed />
        </aside>
      </div>

      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button size="lg" onClick={() => addBlock("link")}>
          <Plus className="mr-2 h-4 w-4" /> Блок
        </Button>
      </div>
    </div>
  );
}
