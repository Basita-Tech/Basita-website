
const readImage = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });

const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });

/**
 * Compress image using Canvas API
 * @param {File} file
 * @param {Object} options
 * @returns {Promise<File>}
 */
export const compressImage = async (file, options = {}) => {
  if (!file || !file.type.startsWith("image/")) {
    return file;
  }

  const defaultOptions = {
    maxSizeMB: 2,
    maxWidthOrHeight: 4000,
    fileType: "image/webp",
    initialQuality: 0.7,
    minQuality: 0.6,
    qualityStep: 0.08,
    maxIterations: 8,
    maxDimensionReduction: 0.9
  };

  const finalOptions = { ...defaultOptions, ...options };
  const maxBytes = finalOptions.maxSizeMB * 1024 * 1024;

  try {
    const img = await readImage(file);

    let width = img.width;
    let height = img.height;
    const maxDim = finalOptions.maxWidthOrHeight;

    if (Math.max(width, height) > maxDim) {
      const scale = maxDim / Math.max(width, height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Canvas not supported");
    }

    let quality = finalOptions.initialQuality;
    let iteration = 0;
    let blob = null;

    while (iteration < finalOptions.maxIterations) {
      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      blob = await canvasToBlob(canvas, finalOptions.fileType, quality);
      if (!blob) {
        throw new Error("Compression failed to create blob");
      }

      if (blob.size <= maxBytes) {
        break;
      }

      quality = Math.max(finalOptions.minQuality, quality - finalOptions.qualityStep);

      if (quality === finalOptions.minQuality) {
        width = Math.round(width * finalOptions.maxDimensionReduction);
        height = Math.round(height * finalOptions.maxDimensionReduction);
      }

      iteration += 1;
    }

    if (!blob) {
      return file;
    }

    const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", {
      type: finalOptions.fileType,
      lastModified: Date.now()
    });

    return compressedFile;
  } catch (error) {
    console.error("❌ Compression failed:", error.message);
    return file;
  }
};

export const COMPRESSION_CONFIG = {
  maxSizeMB: 2,
  maxWidthOrHeight: 4000,
  fileType: "image/webp",
  initialQuality: 0.9,
  minQuality: 0.6,
  qualityStep: 0.08,
  maxIterations: 8,
  maxDimensionReduction: 0.9
};

