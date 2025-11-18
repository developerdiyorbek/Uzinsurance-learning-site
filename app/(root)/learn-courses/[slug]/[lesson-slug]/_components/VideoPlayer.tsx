"use client";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
}

const getYouTubeEmbedUrl = (url: string): string | null => {
  const watchMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  );
  if (watchMatch) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }
  if (url.includes("youtube.com/embed/")) {
    return url;
  }
  return null;
};

const isVideoFile = (url: string): boolean => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi", ".mkv"];
  return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
};

const isValidUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
};

export default function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  if (!videoUrl) return null;

  const trimmedUrl = videoUrl.trim();

  const embedUrl = getYouTubeEmbedUrl(trimmedUrl);
  if (embedUrl) {
    return (
      <div className="w-full aspect-video lg:aspect-[21/10] rounded-lg overflow-hidden border bg-muted">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  if (isValidUrl(trimmedUrl) && !isVideoFile(trimmedUrl)) {
    return (
      <div className="w-full aspect-video lg:aspect-[21/10] rounded-lg overflow-hidden border bg-muted">
        <iframe
          src={trimmedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="w-full aspect-video lg:aspect-[21/10] rounded-lg overflow-hidden border bg-muted">
      <video src={trimmedUrl} controls className="w-full h-full" title={title}>
        Sizning brauzeringiz video elementini qo&apos;llab-quvvatlamaydi.
      </video>
    </div>
  );
}
