/** Redimensiona/comprime a imagem escolhida e devolve um data URL JPEG (cabe melhor no armazenamento do navegador). */
export function fileToDataUrl(file: File, maxW = 1800, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('Selecione um arquivo de imagem.'))
    const url = URL.createObjectURL(file), img = new Image()
    img.onload = () => {
      const s = Math.min(1, maxW / img.width), c = document.createElement('canvas')
      c.width = Math.round(img.width * s); c.height = Math.round(img.height * s)
      c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height)
      URL.revokeObjectURL(url); resolve(c.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Não foi possível ler a imagem.')) }
    img.src = url
  })
}
