# Dentiscan — Portfólio Acadêmico (Next.js)

Site em Next.js 15 (App Router) + TypeScript, construído a partir do
`nextjs-digital-agency-template`, adaptado para o projeto Dentiscan
(portfólio acadêmico de radiologia odontológica e reabilitação oral).

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000

Para gerar a versão de produção:

```bash
npm run build
npm run start
```

## Estrutura

```
src/
  app/
    layout.tsx      # fontes (Space Grotesk, Inter, JetBrains Mono) e metadata
    globals.css      # todos os tokens de cor e estilos
    page.tsx          # composição da home
  components/
    header.tsx        # navegação + menu mobile
    hero.tsx           # seção inicial com o "scan" animado do dente
    about.tsx          # seção "Sobre"
    formation.tsx      # LAIO e LAERO Focus
    cases.tsx          # grade de casos/produções
    skills.tsx         # habilidades por categoria
    cta-band.tsx        # chamada para contato
    footer.tsx           # rodapé com wave e links
    reveal.tsx            # wrapper de animação ao rolar a página
  data/
    cases.ts        # EDITE AQUI: seus casos clínicos, resumos, artigos
    formation.ts     # dados das ligas acadêmicas
    skills.ts         # habilidades exibidas na seção "Habilidades"
public/
  logo.png            # logo do Dentiscan
```

## O que editar primeiro

1. **`src/data/cases.ts`** — troque os 6 casos de exemplo pelos seus casos
   reais, resumos, pôsteres e artigos.
2. **`src/components/about.tsx`** — ajuste o texto de "Sobre" se quiser.
3. **`src/components/footer.tsx`** — troque e-mail e links de redes sociais.
4. **`src/components/about.tsx`** (`.photo-frame`) — troque o placeholder
   por uma foto real usando `next/image`.

## Paleta de cores

Definida em `src/app/globals.css` (`:root`), derivada da logo do Dentiscan:

| Token | Cor | Uso |
|---|---|---|
| `--blue` | `#0b6fb0` | Radiologia / diagnóstico |
| `--teal` | `#159e97` | Transição |
| `--green` | `#1e9e5a` | Reabilitação oral |
| `--ink` | `#10181d` | Texto principal / footer |
| `--paper` | `#f3f7f7` | Fundo |

## Deploy

O projeto é compatível com deploy direto na [Vercel](https://vercel.com)
(criador do Next.js) — basta importar o repositório e o build é
automático.
