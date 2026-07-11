import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BANNER_STYLES, type BannerStyle, type LinkBlock, type SocialKind } from "@/lib/link-store";
import { ArrowDown, ArrowUp, Trash2, Plus } from "lucide-react";

const SOCIAL_KINDS: SocialKind[] = [
  "instagram",
  "telegram",
  "tiktok",
  "youtube",
  "twitter",
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
            <Label>Заголовок</Label>
            <Input
              value={block.title ?? ""}
              onChange={(e) => onChange({ ...block, title: e.target.value })}
              placeholder="Мой сайт"
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
              <Label>Заголовок</Label>
              <Input
                value={block.title ?? ""}
                onChange={(e) => onChange({ ...block, title: e.target.value })}
                placeholder="Название проекта"
              />
            </div>
            <div>
              <Label>Подпись</Label>
              <Input
                value={block.subtitle ?? ""}
                onChange={(e) => onChange({ ...block, subtitle: e.target.value })}
                placeholder="Короткое описание"
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
            <div>
              <Label>Картинка (URL)</Label>
              <Input
                value={block.image ?? ""}
                onChange={(e) => onChange({ ...block, image: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Стиль баннера</Label>
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
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={block.tall ?? false}
              onChange={(e) => onChange({ ...block, tall: e.target.checked })}
            />
            Высокий баннер
          </label>
        </div>
      )}

      {block.type === "header" && (
        <div>
          <Label>Текст заголовка</Label>
          <Input
            value={block.title ?? ""}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            placeholder="Мои проекты"
          />
        </div>
      )}

      {block.type === "image" && (
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label>URL картинки</Label>
            <Input
              value={block.image ?? ""}
              onChange={(e) => onChange({ ...block, image: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div>
            <Label>Ссылка (по клику)</Label>
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
            <Plus className="mr-1 h-4 w-4" /> Соцсеть
          </Button>
        </div>
      )}
    </div>
  );
}
