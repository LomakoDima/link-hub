import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BANNER_PATTERNS,
  BANNER_STYLES,
  bannerPatternUrl,
  type BannerPattern,
  type BannerStyle,
  type LinkBlock,
  type SocialKind,
} from "@/lib/link-store";
import { fileToResizedDataUrl } from "@/lib/image";
import { ArrowDown, ArrowUp, Trash2, Plus, Upload } from "lucide-react";

const BANNER_RESOLUTIONS = [640, 960, 1280, 1600] as const;

const SOCIAL_KINDS: SocialKind[] = [
  "instagram",
  "telegram",
  "tiktok",
  "youtube",
  "twitter",
  "x",
  "threads",
  "facebook",
  "whatsapp",
  "discord",
  "twitch",
  "pinterest",
  "spotify",
  "dribbble",
  "figma",
  "slack",
  "linkedin",
  "github",
  "website",
];

export function BlockEditor({
  block,
  onChange,
  onDelete,
  onMove,
  canUp,
  canDown,
}: {
  block: LinkBlock;
  onChange: (b: LinkBlock) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
  canUp: boolean;
  canDown: boolean;
}) {
  const bannerImageInputRef = useRef<HTMLInputElement>(null);
  const [bannerResolution, setBannerResolution] = useState<number>(960);

  const handleBannerImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const dataUrl = await fileToResizedDataUrl(file, bannerResolution, 0.82);
      onChange({ ...block, image: dataUrl });
    } catch {
      toast.error("Couldn't read that image");
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-md bg-accent px-2 py-1 text-xs font-medium uppercase tracking-wide">
          {block.type}
        </span>
        <div className="flex items-center gap-1">
          <Button size="icon" variant="ghost" disabled={!canUp} onClick={() => onMove(-1)}>
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" disabled={!canDown} onClick={() => onMove(1)}>
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={onDelete}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </div>

      {block.type === "link" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Title</Label>
            <Input
              value={block.title ?? ""}
              onChange={(e) => onChange({ ...block, title: e.target.value })}
              placeholder="My website"
            />
          </div>
          <div>
            <Label>URL</Label>
            <Input
              value={block.url ?? ""}
              onChange={(e) => onChange({ ...block, url: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>
      )}

      {block.type === "banner" && (
        <div className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label>Title</Label>
              <Input
                value={block.title ?? ""}
                onChange={(e) => onChange({ ...block, title: e.target.value })}
                placeholder="Project name"
              />
            </div>
            <div>
              <Label>Subtitle</Label>
              <Input
                value={block.subtitle ?? ""}
                onChange={(e) => onChange({ ...block, subtitle: e.target.value })}
                placeholder="Short description"
              />
            </div>
            <div>
              <Label>URL</Label>
              <Input
                value={block.url ?? ""}
                onChange={(e) => onChange({ ...block, url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Image</Label>
              <div className="flex flex-wrap items-center gap-2">
                <Input
                  className="min-w-[160px] flex-1"
                  value={block.image ?? ""}
                  onChange={(e) => onChange({ ...block, image: e.target.value })}
                  placeholder="https://..."
                />
                <select
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                  value={bannerResolution}
                  onChange={(e) => setBannerResolution(Number(e.target.value))}
                  title="Upload resolution"
                >
                  {BANNER_RESOLUTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}px
                    </option>
                  ))}
                </select>
                <input
                  ref={bannerImageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerImageFile}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => bannerImageInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Banner color</Label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(BANNER_STYLES) as BannerStyle[]).map((k) => {
                const s = BANNER_STYLES[k];
                const active = (block.bannerStyle ?? "dark") === k;
                return (
                  <button
                    key={k}
                    onClick={() => onChange({ ...block, bannerStyle: k })}
                    className={`h-10 w-16 rounded-lg ${s.gradient} ${
                      active ? "ring-2 ring-primary" : "ring-1 ring-border"
                    }`}
                    title={s.label}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Banner pattern</Label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(BANNER_PATTERNS) as BannerPattern[]).map((k) => {
                const p = BANNER_PATTERNS[k];
                const active = (block.bannerPattern ?? "honeycomb") === k;
                return (
                  <button
                    key={k}
                    onClick={() => onChange({ ...block, bannerPattern: k })}
                    className={`h-10 w-16 rounded-lg bg-neutral-800 ${
                      active ? "ring-2 ring-primary" : "ring-1 ring-border"
                    }`}
                    style={{ backgroundImage: bannerPatternUrl(k, false) }}
                    title={p.label}
                  />
                );
              })}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={block.tall ?? false}
              onChange={(e) => onChange({ ...block, tall: e.target.checked })}
            />
            Tall banner
          </label>
        </div>
      )}

      {block.type === "header" && (
        <div>
          <Label>Heading text</Label>
          <Input
            value={block.title ?? ""}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            placeholder="My projects"
          />
        </div>
      )}

      {block.type === "contact" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={block.email ?? ""}
              onChange={(e) => onChange({ ...block, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              type="tel"
              value={block.phone ?? ""}
              onChange={(e) => onChange({ ...block, phone: e.target.value })}
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>
      )}

      {block.type === "image" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>Image URL</Label>
            <Input
              value={block.image ?? ""}
              onChange={(e) => onChange({ ...block, image: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label>Link (on click)</Label>
            <Input
              value={block.url ?? ""}
              onChange={(e) => onChange({ ...block, url: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>
      )}

      {block.type === "social" && (
        <div className="space-y-2">
          {(block.socials ?? []).map((s, i) => (
            <div key={i} className="flex gap-2">
              <select
                className="rounded-md border border-input bg-background px-2 text-sm"
                value={s.kind}
                onChange={(e) => {
                  const next = [...(block.socials ?? [])];
                  next[i] = { ...s, kind: e.target.value as SocialKind };
                  onChange({ ...block, socials: next });
                }}
              >
                {SOCIAL_KINDS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <Input
                className="flex-1"
                value={s.url}
                onChange={(e) => {
                  const next = [...(block.socials ?? [])];
                  next[i] = { ...s, url: e.target.value };
                  onChange({ ...block, socials: next });
                }}
                placeholder="https://..."
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const next = (block.socials ?? []).filter((_, j) => j !== i);
                  onChange({ ...block, socials: next });
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              onChange({
                ...block,
                socials: [...(block.socials ?? []), { kind: "instagram", url: "" }],
              })
            }
          >
            <Plus className="mr-1 h-4 w-4" /> Social
          </Button>
        </div>
      )}
    </div>
  );
}
