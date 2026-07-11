import { BANNER_STYLES, THEMES, type Profile, type SocialKind } from "@/lib/link-store";
import {
  Instagram,
  Send,
  Youtube,
  Twitter,
  Linkedin,
  Github,
  Globe,
  Music2,
} from "lucide-react";

const socialIcon: Record<SocialKind, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  telegram: Send,
  tiktok: Music2,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  website: Globe,
};

// Subtle honeycomb SVG pattern used as decorative background on banners.
const HONEYCOMB =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='84' height='96' viewBox='0 0 84 96'><g fill='none' stroke='%23ff7a2a' stroke-opacity='0.18' stroke-width='1'><path d='M42 2 l40 23 v46 l-40 23 l-40 -23 v-46 z'/><path d='M42 26 l20 11 v22 l-20 11 l-20 -11 v-22 z'/></g></svg>\")";

export function LinkPreview({ profile, framed = false }: { profile: Profile; framed?: boolean }) {
  const theme = THEMES[profile.theme];
  const content = (
    <div className={`min-h-full w-full ${theme.bg} px-5 py-8`}>
      <div className="mx-auto flex max-w-md flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-3 text-center">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="h-20 w-20 rounded-full object-cover ring-2 ring-white/20"
            />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/10 text-2xl font-bold ring-2 ring-white/20">
              {profile.name.charAt(0).toUpperCase() || "K"}
            </div>
          )}
          <div>
            <h1 className={`text-lg font-semibold ${theme.text}`}>@{profile.slug}</h1>
            <p className={`mt-2 whitespace-pre-line text-sm ${theme.muted}`}>{profile.bio}</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          {profile.blocks.map((b) => {
            if (b.type === "header") {
              return (
                <h2
                  key={b.id}
                  className={`mt-2 text-center text-xs font-semibold uppercase tracking-widest ${theme.accent}`}
                >
                  {b.title}
                </h2>
              );
            }

            if (b.type === "social") {
              return (
                <div key={b.id} className="flex flex-wrap justify-center gap-3 py-1">
                  {(b.socials ?? []).map((s, i) => {
                    const Icon = socialIcon[s.kind];
                    return (
                      <a
                        key={i}
                        href={s.url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className={`grid h-11 w-11 place-items-center rounded-full ${theme.card} transition-transform hover:scale-105`}
                        aria-label={s.kind}
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              );
            }

            if (b.type === "image" && b.image) {
              return (
                <a
                  key={b.id}
                  href={b.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="overflow-hidden rounded-2xl"
                >
                  <img src={b.image} alt={b.title || ""} className="w-full object-cover" />
                </a>
              );
            }

            if (b.type === "banner") {
              const style = BANNER_STYLES[b.bannerStyle ?? "dark"];
              const isLight = b.bannerStyle === "sand";
              return (
                <a
                  key={b.id}
                  href={b.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative block overflow-hidden rounded-2xl ${style.gradient} ${style.ring} transition-transform hover:-translate-y-0.5 hover:shadow-2xl`}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-70 mix-blend-screen"
                    style={{ backgroundImage: HONEYCOMB }}
                  />
                  {b.image && (
                    <img
                      src={b.image}
                      alt=""
                      className="pointer-events-none absolute inset-y-0 right-0 h-full w-2/3 object-cover"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)",
                        maskImage:
                          "linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 95%)",
                      }}
                    />
                  )}
                  <div
                    className={`relative flex ${b.tall ? "min-h-[150px]" : "min-h-[92px]"} items-center px-5 py-4`}
                  >
                    <div className="max-w-[65%]">
                      <div
                        className={`text-lg font-bold leading-tight drop-shadow-sm ${
                          isLight ? "text-neutral-900" : "text-white"
                        }`}
                      >
                        {b.title || "Заголовок"}
                      </div>
                      {b.subtitle && (
                        <div
                          className={`mt-1 text-xs ${
                            isLight ? "text-neutral-700" : "text-white/70"
                          }`}
                        >
                          {b.subtitle}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              );
            }

            return (
              <a
                key={b.id}
                href={b.url || "#"}
                target="_blank"
                rel="noreferrer"
                className={`block rounded-2xl px-5 py-4 text-center text-sm font-medium transition ${theme.card} ${theme.text}`}
              >
                {b.title}
              </a>
            );
          })}

          {profile.blocks.length === 0 && (
            <div className={`rounded-2xl border border-dashed border-white/15 py-10 text-center text-sm ${theme.muted}`}>
              Добавьте первый блок
            </div>
          )}
        </div>

        <div className={`mt-6 text-[11px] ${theme.muted}`}>Made with korner.</div>
      </div>
    </div>
  );

  if (!framed) return content;

  return (
    <div className="sticky top-8 mx-auto w-[320px]">
      <div className="relative rounded-[2.5rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-2xl">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-neutral-900" />
        <div className="h-[640px] overflow-y-auto rounded-[2rem]">{content}</div>
      </div>
    </div>
  );
}
