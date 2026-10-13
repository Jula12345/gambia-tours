const OfferPhotoTools = (() => {
  const libraries = new Map();
  function loadScript(src) {
    if (!libraries.has(src)) {
      const promise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = () => { script.remove(); reject(new Error("Photo tools could not load. Please try again.")); };
        document.head.append(script);
      });
      libraries.set(src, promise);
      promise.catch(() => libraries.delete(src));
    }
    return libraries.get(src);
  }

  function loadImage(blob) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      const url = URL.createObjectURL(blob);
      image.onload = () => { URL.revokeObjectURL(url); resolve(image); };
      image.onerror = () => { URL.revokeObjectURL(url); reject(new Error("This photo could not be opened.")); };
      image.src = url;
    });
  }

  async function prepareFile(file, onProgress = () => {}) {
    if (!file || file.size > 20 * 1024 * 1024) throw new Error("Choose a photo no larger than 20 MB.");
    if (!/\.(?:jpe?g|png|webp|heic|heif)$/i.test(file.name || "") && !/^image\/(?:jpeg|png|webp|heic|heif)$/.test(file.type)) throw new Error("Choose a JPG, PNG, WebP, HEIC or HEIF photo.");
    let image;
    try { image = await loadImage(file); }
    catch (error) {
      if (!/\.hei[cf]$/i.test(file.name || "") && !/^image\/hei[cf]$/.test(file.type)) throw error;
      onProgress("Converting your iPhone photo…");
      await loadScript("assets/vendor/heic-to.js");
      try { image = await loadImage(await HeicTo({ blob: file, type: "image/jpeg", quality: .9 })); }
      catch { throw new Error("This HEIC photo could not be converted. Try another photo or export it as JPG."); }
    }
    onProgress("Optimizing your photo…");
    const canvas = document.createElement("canvas");
    const scale = Math.min(1, 2000 / image.naturalWidth, 2000 / image.naturalHeight);
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    try {
      for (const quality of [.88, .76, .64, .5]) {
        const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/jpeg", quality));
        if (blob && blob.size <= 2 * 1024 * 1024) return blob;
      }
      throw new Error("This photo could not be optimized. Try a smaller photo.");
    } finally { canvas.width = canvas.height = 1; }
  }

  async function crop(src, aspectRatio, previous) {
    await loadScript("assets/vendor/cropper.min.js");
    const dialog = document.querySelector("[data-crop-dialog]");
    const image = document.querySelector("[data-crop-image]");
    const slider = document.querySelector("[data-crop-zoom]");
    const apply = document.querySelector("[data-apply-crop]");
    const cancel = document.querySelector("[data-cancel-crop]");
    const reset = document.querySelector("[data-reset-crop]");
    image.src = src;
    slider.value = 1;
    apply.disabled = true;
    dialog.showModal();
    return new Promise((resolve, reject) => {
      let cropper;
      let baseRatio = 1;
      function finish(value) {
        cropper?.destroy();
        image.onerror = null;
        dialog.close();
        dialog.removeEventListener("cancel", onCancel);
        apply.onclick = cancel.onclick = reset.onclick = slider.oninput = null;
        resolve(value);
      }
      const onCancel = event => { event.preventDefault(); finish(null); };
      dialog.addEventListener("cancel", onCancel);
      cancel.onclick = () => finish(null);
      cropper = new Cropper(image, {
        aspectRatio, viewMode: 1, autoCropArea: 1, dragMode: "move", background: false,
        rotatable: false, scalable: false, toggleDragModeOnDblclick: false,
        ready() {
          const dimensions = cropper.getImageData();
          if (previous) cropper.setData({ x: previous.x * dimensions.naturalWidth, y: previous.y * dimensions.naturalHeight, width: previous.width * dimensions.naturalWidth, height: previous.height * dimensions.naturalHeight });
          baseRatio = cropper.getCanvasData().width / dimensions.naturalWidth;
          apply.disabled = false;
        }
      });
      image.onerror = () => { cropper?.destroy(); dialog.close(); dialog.removeEventListener("cancel", onCancel); reject(new Error("The crop preview could not load. Please try again.")); };
      slider.oninput = () => cropper.zoomTo(baseRatio * Number(slider.value));
      reset.onclick = () => { cropper.reset(); slider.value = 1; baseRatio = cropper.getCanvasData().width / cropper.getImageData().naturalWidth; };
      apply.onclick = () => {
        const data = cropper.getData();
        const dimensions = cropper.getImageData();
        const x = Math.max(0, data.x / dimensions.naturalWidth);
        const y = Math.max(0, data.y / dimensions.naturalHeight);
        finish({ x, y, width: Math.min(1 - x, data.width / dimensions.naturalWidth), height: Math.min(1 - y, data.height / dimensions.naturalHeight) });
      };
    });
  }
  return { prepareFile, crop };
})();
