export default function VideoSection({ play: _play }: { play: () => void }) {
  return (
    <div className="hero-visual youtube-shell">
      <div className="youtube-frame">
        <iframe
          src="https://www.youtube-nocookie.com/embed/RAjUaWcZSiI?rel=0&modestbranding=1&playsinline=1"
          title="Vídeo da Contrata.chat"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <p className="video-caption">Vídeo da Contrata.chat · YouTube</p>
    </div>
  );
}
