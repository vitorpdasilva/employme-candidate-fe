// utils.ts

export interface CompressedImage {
  dataUrl: string;
  width: number;
  height: number;
}

export const compressImage = async (
  file: File, maxWidth: number, maxHeight: number, quality: number
): Promise<CompressedImage> => {
  return new Promise<CompressedImage>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string

      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height

        // Scale the image down to fit within the maximum width and height
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        // Set the canvas dimensions and draw the image onto it
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)

        // Get the base64-encoded JPEG data with reduced quality
        const dataUrl = canvas.toDataURL("image/jpeg", quality)

        resolve({ dataUrl, width, height })
      }
    }

    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
