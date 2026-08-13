// Shared image helpers.
// PLACEHOLDER_IMG is an inline SVG data URI so it always renders,
// even with no network — used whenever a product has no image or
// its image URL fails to load.

export const PLACEHOLDER_IMG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000">
      <rect width="800" height="1000" fill="#f2ede6"/>
      <g fill="none" stroke="#c9bba7" stroke-width="10">
        <rect x="160" y="330" width="480" height="340" rx="18"/>
        <circle cx="300" cy="430" r="40"/>
        <path d="M180 620 L340 480 L460 570 L560 460 L620 620" stroke-linejoin="round" stroke-linecap="round"/>
      </g>
      <text x="400" y="740" font-family="sans-serif" font-size="26" fill="#a9998a" text-anchor="middle">
        No Image Available
      </text>
    </svg>
  `);

// Resizes/compresses an uploaded image file down to a small base64
// data URL so it can be stored directly on the Firestore product doc
// (Firestore field limit is ~1MB) without needing separate storage.
export function fileToCompressedDataUrl(file, maxDim = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not load image"));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
