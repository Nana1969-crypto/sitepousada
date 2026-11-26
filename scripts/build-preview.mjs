// Gera dist-preview/preview-single.html: site público em um único arquivo (JS, CSS e imagens embutidos).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
const d = 'dist-preview/', html = readFileSync(d + 'preview.html', 'utf8')
const css = readFileSync(d + html.match(/href="\/(assets\/[^"]+\.css)"/)[1], 'utf8')
let js = readFileSync(d + html.match(/src="\/(assets\/[^"]+\.js)"/)[1], 'utf8')
for (const f of readdirSync('public/fotos')) js = js.replaceAll(`/fotos/${f}`, 'data:image/jpeg;base64,' + readFileSync('public/fotos/' + f).toString('base64'))
const out = `<title>Refúgio da Serra</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@400;500;600&display=swap">
<style>${css}</style>
<div id="root"></div>
<script type="module">${js.replaceAll('</script', '<\\/script')}</script>`
writeFileSync(process.argv[2], out); console.log((out.length / 1024).toFixed(0) + ' KB')
