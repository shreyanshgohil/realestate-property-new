export function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word chars with -
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing dashes
}

export function capitalizeFirstLetter(str) {
  if (!str) return ""; // handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}
