export interface Track {
  name: string;
  artist: { "#text": string };
  album: { "#text": string };
  image: { "#text": string; size: string }[];
  url: string;
  date?: { uts: string; "#text": string };
  "@attr"?: { nowplaying: string };
}

export interface Album {
  name: string;
  artist: { name: string };
  playcount: string;
  image: { "#text": string; size: string }[];
  url: string;
}

export const sizeMap: Record<string, number> = {
  small: 34,
  medium: 64,
  large: 174,
  extralarge: 300,
};

export const getTimeAgo = (timestamp?: string): string => {
  if (!timestamp) return "";
  const seconds = Math.floor(Date.now() / 1000 - parseInt(timestamp));
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const getImageData = (track: Track) => {
  const images = track.image.filter((img) => img["#text"]).reverse();
  const defaultImage = images[0]?.["#text"] || "";
  const srcset = images
    .map((img) => `${img["#text"]} ${sizeMap[img.size] || 64}w`)
    .join(", ");
  return { defaultImage, srcset };
};

export const getTrackId = (track: Track): string => {
  return `${track.name}-${track.artist["#text"]}-${track.date?.uts || "now"}`;
};

export const fetchRecentTracks = async (
  username: string,
  apiKey: string,
  limit: number = 5
): Promise<Track[]> => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tracks");
  }

  const data = await response.json();
  return data.recenttracks?.track || [];
};

export const fetchTopAlbums = async (
  username: string,
  apiKey: string,
  limit: number = 10
): Promise<Album[]> => {
  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&api_key=${apiKey}&format=json&period=1month&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }

  const data = await response.json();
  return data.topalbums?.album || [];
};
