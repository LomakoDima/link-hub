import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LinkPreview } from "@/components/LinkPreview";
import { decodeProfile, loadProfile, defaultProfile, type Profile } from "@/lib/link-store";

export const Route = createFileRoute("/p/$slug")({
  component: PublicPage,
});

function PublicPage() {
  const { slug } = Route.useParams();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (hash) {
      const decoded = decodeProfile(hash);
      if (decoded) {
        setProfile(decoded);
        document.title = `@${decoded.slug} — Linqo`;
        return;
      }
    }
    const local = loadProfile();
    if (local.slug === slug) {
      setProfile(local);
      document.title = `@${local.slug} — Linqo`;
    } else {
      setProfile({ ...defaultProfile, slug });
    }
  }, [slug]);

  if (!profile) return null;
  return <LinkPreview profile={profile} />;
}
