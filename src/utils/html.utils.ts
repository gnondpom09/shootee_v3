export function getRandomId(length = 4): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(length));

  return btoa(String.fromCharCode(...randomBytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
