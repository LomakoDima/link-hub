import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
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
  Contact,
  Image as ImageIcon,
  Eye,
  Copy,
  Rocket,
  LayoutPanelTop,
  Upload,
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
import { fileToResizedDataUrl } from "@/lib/image";
import { LinkPreview } from "@/components/LinkPreview";
import { BlockEditor } from "@/components/BlockEditor";

export const Route = createFileRoute("/build")({
  head: () => ({
    meta: [
      { title: "Linqo — the multi-link builder" },
      {
        name: "description",
        content: "Build your all-links page in a minute. Beautiful themes, socials, live preview.",
      },
      { property: "og:title", content: "Linqo — the multi-link builder" },
      {
        property: "og:description",
        content: "Build your all-links page in a minute.",
      },
    ],
  }),
  component: BuilderPage,
});

function BuilderPage() {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [ready, setReady] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setProfile(loadProfile());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) saveProfile(profile);
  }, [profile, ready]);

  const update = (patch: Partial<Profile>) => setProfile((p) => ({ ...p, ...patch }));

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      update({ avatar: dataUrl });
    } catch {
      toast.error("Couldn't read that image");
    }
  };

  const handleCoverFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const dataUrl = await fileToResizedDataUrl(file, 960, 0.82);
      update({ cover: dataUrl });
    } catch {
      toast.error("Couldn't read that image");
    }
  };

  const addBlock = (type: LinkBlock["type"]) => {
    const nb: LinkBlock =
      type === "social"
        ? { id: uid(), type, socials: [{ kind: "instagram", url: "" }] }
        : type === "contact"
          ? { id: uid(), type, email: "", phone: "" }
          : type === "header"
            ? { id: uid(), type, title: "New heading" }
            : type === "image"
              ? { id: uid(), type, image: "", url: "" }
              : type === "banner"
                ? {
                    id: uid(),
                    type: "banner",
                    title: "New banner",
                    subtitle: "",
                    url: "https://",
                    image: "",
                    bannerStyle: "ember",
                  }
                : { id: uid(), type: "link", title: "New link", url: "https://" };
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

  // Relative path: resolvable during SSR and immediately after hydration, with
  // no dependency on `window` or client mount timing — the Open/Preview links
  // below must never risk pointing at an empty or stale href.
  const sharePath = useMemo(() => {
    return `/p/${profile.slug}#${encodeProfile(profile)}`;
  }, [profile]);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}${sharePath}` : sharePath;
  const copyShare = async () => {
    await navigator.clipboard.writeText(`${window.location.origin}${sharePath}`);
    toast.success("Link copied");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Rocket className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">Linqo.</span>
            <span className="ml-2 hidden text-sm text-muted-foreground sm:inline">
              the multi-link builder
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={copyShare}>
              <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
            <a href={sharePath} target="_blank" rel="noreferrer">
              <Button size="sm">
                <Eye className="mr-2 h-4 w-4" /> Open
              </Button>
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 lg:grid-cols-[1fr_380px]">
        <div>
          <Tabs defaultValue="content" className="w-full">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="share">Publish</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" onClick={() => addBlock("link")}>
                  <LinkIcon className="mr-2 h-4 w-4" /> Link
                </Button>
                <Button variant="default" size="sm" onClick={() => addBlock("banner")}>
                  <LayoutPanelTop className="mr-2 h-4 w-4" /> Banner
                </Button>
                <Button variant="secondary" size="sm" onClick={() => addBlock("header")}>
                  <Heading1 className="mr-2 h-4 w-4" /> Heading
                </Button>
                <Button variant="secondary" size="sm" onClick={() => addBlock("social")}>
                  <Share2 className="mr-2 h-4 w-4" /> Socials
                </Button>
                <Button variant="secondary" size="sm" onClick={() => addBlock("contact")}>
                  <Contact className="mr-2 h-4 w-4" /> Contact
                </Button>
                <Button variant="secondary" size="sm" onClick={() => addBlock("image")}>
                  <ImageIcon className="mr-2 h-4 w-4" /> Image
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
                    Add your first block using the button above
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="design" className="mt-6 space-y-6">
              <div>
                <Label className="mb-3 block">Solid colors</Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {(Object.keys(THEMES) as ThemeName[])
                    .filter((name) => THEMES[name].kind === "solid")
                    .map((name) => (
                      <ThemeSwatch
                        key={name}
                        name={name}
                        active={profile.theme === name}
                        onSelect={() => update({ theme: name })}
                      />
                    ))}
                </div>
              </div>
              <div>
                <Label className="mb-3 block">Gradients</Label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {(Object.keys(THEMES) as ThemeName[])
                    .filter((name) => THEMES[name].kind === "gradient")
                    .map((name) => (
                      <ThemeSwatch
                        key={name}
                        name={name}
                        active={profile.theme === name}
                        onSelect={() => update({ theme: name })}
                      />
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="profile" className="mt-6 space-y-4">
              <div>
                <Label>Username (@slug)</Label>
                <Input
                  value={profile.slug}
                  onChange={(e) =>
                    update({ slug: e.target.value.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase() })
                  }
                />
              </div>
              <div>
                <Label>Name</Label>
                <Input value={profile.name} onChange={(e) => update({ name: e.target.value })} />
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => update({ bio: e.target.value })}
                />
              </div>
              <div>
                <Label>Cover image</Label>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {profile.cover && (
                      <img src={profile.cover} alt="Cover" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <Input
                    value={profile.cover}
                    onChange={(e) => update({ cover: e.target.value })}
                    placeholder="https://..."
                  />
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverFile}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={() => coverInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </Button>
                </div>
              </div>
              <div>
                <Label>Avatar</Label>
                <div className="flex items-center gap-3">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Avatar"
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                      {profile.name.charAt(0).toUpperCase() || "?"}
                    </div>
                  )}
                  <Input
                    value={profile.avatar}
                    onChange={(e) => update({ avatar: e.target.value })}
                    placeholder="https://..."
                  />
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarFile}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="share" className="mt-6 space-y-4">
              <div>
                <Label>Link to your page</Label>
                <div className="flex gap-2">
                  <Input readOnly value={shareUrl} />
                  <Button onClick={copyShare}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  The data is encoded right in the link — you can share it without a backend.
                </p>
              </div>
              <a href={sharePath} target="_blank" rel="noreferrer" className="inline-block">
                <Button variant="secondary">
                  <Eye className="mr-2 h-4 w-4" /> Preview in new tab
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
          <Plus className="mr-2 h-4 w-4" /> Block
        </Button>
      </div>
    </div>
  );
}

function ThemeSwatch({
  name,
  active,
  onSelect,
}: {
  name: ThemeName;
  active: boolean;
  onSelect: () => void;
}) {
  const t = THEMES[name];
  return (
    <button
      onClick={onSelect}
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
}
