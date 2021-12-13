export const generateDownload = (canvas: any, crop: any) => {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    (blob: any) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.download = "cropPreview.png";
      anchor.href = URL.createObjectURL(blob);
      anchor.click();

      window.URL.revokeObjectURL(previewUrl);
    },
    "image/png",
    1
  );
};
