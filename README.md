# Refúgio da Serra — site de pousada (demonstração)

React + TypeScript + Tailwind CSS (Vite). Site público em `/`, painel em `/admin`.

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (pasta dist/)
```

## Onde editar
- Conteúdo padrão: `src/content/defaultContent.ts` (nome, textos, cabanas, galeria, WhatsApp…).
- Seções do site: `src/components/*`. Cores/fontes: `src/index.css`.
- Painel: `src/pages/admin/*`. Número e mensagens do WhatsApp são configurados em **/admin → Contato e localização** (`https://wa.me/NUMERO`, só dígitos; `{cabana}` é substituído pelo nome).

## ⚠️ Limitações desta demonstração (leia antes de apresentar/vender)
1. **Fotos:** as imagens em `public/fotos/*.jpg` são **ilustrações geradas por IA** (recortadas dos mosaicos enviados), NÃO fotografias de uma pousada real, e mostram itens (lago, lareira, hidromassagem) que não estão confirmados. Troque-as por fotos reais pelo painel (Enviar foto) ou em `public/fotos`.
2. **Persistência:** o painel salva no `localStorage` do navegador de quem edita. **Visitantes do site não veem as alterações.** Para produção é necessário backend + banco + armazenamento de imagens (ex.: Supabase/Firebase ou API própria). Basta reimplementar `loadContent`/`saveContent` em `src/lib/store.ts`.
3. **Login:** não há senhas no código; no primeiro acesso o proprietário cria uma. Porém, sem servidor, **isso não é segurança real** (roda no navegador e pode ser contornado). Em produção, autentique no servidor.
4. Comodidades são exemplos editáveis; não há preços, avaliações, capacidade nem endereço inventados. WhatsApp/Instagram/endereço começam vazios.
5. Hospedagem estática precisa de fallback SPA para `/admin` (`public/_redirects` cobre Netlify/Cloudflare).
