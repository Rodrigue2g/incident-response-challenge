import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IR-204 Archive",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function ClosureReelPage() {
  return (
    <main className="closure-reel-page">
      <section className="closure-reel">
        <p className="eyebrow">Restricted archive · ORA CAM 26</p>
        <h1>Archie&apos;s Playlist</h1>
        <video controls playsInline preload="metadata">
          <source src="/media/ir-204-closure-reel.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </section>
    </main>
  );
}
