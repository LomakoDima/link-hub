import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BANNER_PATTERNS,
  BANNER_STYLES,
  bannerPatternUrl,
  imageFieldDisplay,
  type BannerLayout,
  type BannerPattern,
  type BannerStyle,
  type LinkBlock,
  type SocialKind,
} from "@/lib/link-store";
import { fileToResizedDataUrl } from "@/lib/image";
import { withViewTransition } from "@/lib/view-transition";
import { ArrowDown, ArrowUp, Trash2, Plus, Upload } from "lucide-react";

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

  const handleBannerImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const dataUrl = await fileToResizedDataUrl(file, 960, 0.78, 55_000);
      onChange({ ...block, image: dataUrl, imageName: file.name });
    } catch {
      toast.error("Couldn't read that image");
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-200 animate-slide-up">
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-lg bg-accent/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
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
                  value={imageFieldDisplay(block.image ?? "", block.imageName)}
                  onChange={(e) =>
                    onChange({ ...block, image: e.target.value, imageName: undefined })
                  }
                  placeholder="https://..."
                />
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
            <Label className="mb-2.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Banner layout
            </Label>
            <div className="flex gap-2">
              {(["horizontal", "vertical"] as BannerLayout[]).map((k) => {
                const active = (block.bannerLayout ?? "horizontal") === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() =>
                      withViewTransition(() => onChange({ ...block, bannerLayout: k }))
                    }
                    className={`rounded-lg px-3 py-1.5 text-sm capitalize transition-all duration-200 ${
                      active
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "border border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="space-y-3">
            <Label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Banner color
            </Label>
            <div>
              <Label className="mb-1.5 block text-[11px] text-muted-foreground">
                Solid &amp; moody
              </Label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(BANNER_STYLES) as BannerStyle[])
                  .filter((k) => BANNER_STYLES[k].kind === "moody")
                  .map((k) => (
                    <BannerStyleSwatch
                      key={k}
                      styleKey={k}
                      active={(block.bannerStyle ?? "dark") === k}
                      onSelect={() => onChange({ ...block, bannerStyle: k })}
                    />
                  ))}
              </div>
            </div>
            <div>
              <Label className="mb-1.5 block text-[11px] text-muted-foreground">Gradient</Label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(BANNER_STYLES) as BannerStyle[])
                  .filter((k) => BANNER_STYLES[k].kind === "gradient")
                  .map((k) => (
                    <BannerStyleSwatch
                      key={k}
                      styleKey={k}
                      active={(block.bannerStyle ?? "dark") === k}
                      onSelect={() => onChange({ ...block, bannerStyle: k })}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div>
            <Label className="mb-2.5 block text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Banner pattern
            </Label>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(BANNER_PATTERNS) as BannerPattern[]).map((k) => {
                const p = BANNER_PATTERNS[k];
                const active = (block.bannerPattern ?? "honeycomb") === k;
                return (
                  <button
                    key={k}
                    onClick={() => onChange({ ...block, bannerPattern: k })}
                    className={`h-10 w-16 rounded-lg cursor-pointer bg-neutral-800 transition-all duration-200 hover:scale-105 active:scale-95 ${
                      active
                        ? "ring-2 ring-primary ring-offset-2 shadow-md"
                        : "ring-1 ring-border hover:border-muted-foreground/30"
                    }`}
                    style={{ backgroundImage: bannerPatternUrl(k, false) }}
                    title={p.label}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <Label className="mb-2.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Transparency
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {block.bannerOpacity ?? 100}%
              </span>
            </Label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={[block.bannerOpacity ?? 100]}
              onValueChange={([v]) => onChange({ ...block, bannerOpacity: v })}
            />
          </div>
          <div className="flex items-center gap-2.5 pt-1.5">
            <Checkbox
              id={`tall-banner-${block.id}`}
              checked={block.tall ?? false}
              onCheckedChange={(checked) => onChange({ ...block, tall: checked === true })}
            />
            <Label
              htmlFor={`tall-banner-${block.id}`}
              className="text-sm font-normal cursor-pointer select-none"
            >
              Tall banner
            </Label>
          </div>
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
        <div className="space-y-3">
          {(block.socials ?? []).map((s, i) => (
            <div key={i} className="flex gap-2">
              <Select
                value={s.kind}
                onValueChange={(val) => {
                  const next = [...(block.socials ?? [])];
                  next[i] = { ...s, kind: val as SocialKind };
                  onChange({ ...block, socials: next });
                }}
              >
                <SelectTrigger className="w-[130px] shrink-0">
                  <SelectValue placeholder="Social" />
                </SelectTrigger>
                <SelectContent>
                  {SOCIAL_KINDS.map((k) => (
                    <SelectItem key={k} value={k}>
                      {k.charAt(0).toUpperCase() + k.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive transition-colors" />
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

function BannerStyleSwatch({
  styleKey,
  active,
  onSelect,
}: {
  styleKey: BannerStyle;
  active: boolean;
  onSelect: () => void;
}) {
  const s = BANNER_STYLES[styleKey];
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`h-10 w-16 rounded-lg cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${s.gradient} ${
        active
          ? "ring-2 ring-primary ring-offset-2 shadow-md"
          : "ring-1 ring-border hover:border-muted-foreground/30"
      }`}
      title={s.label}
    />
  );
}
