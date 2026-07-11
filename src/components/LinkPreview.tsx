import { THEMES, type Profile, type SocialKind } from "@/lib/link-store";
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
              {profile.name.charAt(0).toUpperCase()}
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
                        href={s.url}
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
            return (
              <a
                key={b.id}
                href={b.url}
                target="_blank"
                rel="noreferrer"
                className={`block rounded-2xl px-5 py-4 text-center text-sm font-medium transition ${theme.card} ${theme.text}`}
              >
                {b.title}
              </a>
            );
          })}
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
