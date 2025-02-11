export function hashGen(count: number) {
  const phase = "qwertyuiopasdfghjklzxcvbnm123456789";
  const length = phase.length;
  let hash = "";
  for (let i = 0; i < count; i++) {
    hash += phase[Math.floor(Math.random() * length)];
  }
  return hash;
}
export function extractYoutubeLinkId(link: string): string {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = link.match(regex);
  return match ? match[1] : "";
}

export function extractTwitterLinkId(link: string): string {
  const regex = /(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/;
  const match = link.match(regex);
  return match ? match[1] : "";
}
