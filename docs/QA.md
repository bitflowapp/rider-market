# QA — Rider Market

Fecha de la última corrida: **28/10/2026**.

## Entorno

- Windows 11, Python 3.11, Node 24.
- Chrome estable, controlado con Playwright 1.64 en modo headless.
- Servidor local: `python -m http.server 4174 -d public`.
- Producción: https://bitflowapp.github.io/rider-market/ (GitHub Pages, workflow `pages.yml`).
- Viewports: escritorio 1440×900; móvil 390×844, DPR 3, touch.
- Lighthouse 13.6 (móvil con throttling simulado; escritorio con preset desktop).

## Resultado funcional

**47/47 comprobaciones aprobadas en local y 47/47 en producción.**

Cobertura ejecutada:

- Respuesta HTTP 200 de `index.html` y `404.html`.
- Título y metadatos presentes; JSON-LD válido (2 nodos).
- Las 25 imágenes visibles cargan (`naturalWidth > 0`) y tienen atributo `alt` (las de galería son decorativas, con `alt=""` porque el botón y el epígrafe las describen).
- Sin scroll horizontal en 1440×900 ni en 390×844.
- Todas las anclas internas apuntan a secciones existentes.
- Filtros de productos: Todos 10, Perfumes 7, Repuestos 2, Accesorios 1; `aria-pressed` correcto y contador accesible actualizado.
- Filtros de galería: Todas 12, Servicios 2, Productos 10.
- Lightbox: abre, muestra tipo/caption/contador, navega con botones y teclado, cierra con Esc y devuelve el foco.
- Diálogo de contacto: abre desde cualquier CTA, prepara el mensaje con el tema correcto, copia al portapapeles, muestra toast y cierra con botón/Esc.
- Compartir: usa `navigator.share` cuando existe; si no, copia la URL canónica.
- Menú móvil: abre, `aria-expanded`, navega a Productos, cierra y bloquea/restaura el scroll.
- Header: cambia a estado con fondo al hacer scroll; navegación activa actualizada.
- Controles táctiles ≥ 24×24 px en móvil.
- Sin errores de consola, errores de página ni requests fallidos en escritorio ni móvil.
- `html-validate` sin errores en `index.html` y `404.html`.
- `node --check public/app.js` sin errores.

La misma suite se ejecutó contra la URL publicada: **47/47**, incluyendo filtros, lightbox, diálogos, menú móvil, ausencia de scroll horizontal, imágenes, consola y requests. También se verificó que una ruta inexistente devuelve HTTP 404 con la página personalizada, y que canonical, Open Graph, sitemap y robots apuntan a la URL final.

## Lighthouse

| Categoría | Local móvil | Local escritorio | Producción móvil | Producción escritorio |
|---|---:|---:|---:|---:|
| Performance | **99** | **100** | **97** | **99** |
| Accessibility | **100** | **100** | **100** | **100** |
| Best Practices | **100** | **100** | **100** | **100** |
| SEO | **100** | **100** | **100** | **100** |

Métricas móviles locales: FCP 1,5 s; LCP 1,5 s; TBT 0 ms; CLS 0. En producción: FCP 1,6 s; LCP 1,6 s; TBT 0 ms; CLS 0,006. El LCP móvil es el `h1`; el hero usa una imagen horizontal específica para móvil y `fetchpriority="high"`.

## Pruebas visuales

Capturas revisadas en escritorio y móvil: hero, servicios, productos, galería, contacto, menú móvil, lightbox y diálogo de contacto. Archivos en `D:\temp\rider-qa\shots` (fuera del repositorio).

Se corrigieron durante la revisión:

- Recorte del póster en el hero (titulares cortados).
- Recortes de las tarjetas de servicio.
- Contadores de productos (10 reales, no 11).
- Contraste de textos secundarios.
- Nombres accesibles de la marca y de los botones de galería.
- Tamaño táctil de los enlaces del pie.

## Publicación

- Repositorio: https://github.com/bitflowapp/rider-market
- URL: https://bitflowapp.github.io/rider-market/
- Workflow: `.github/workflows/pages.yml` (GitHub Actions → GitHub Pages, artefacto `public/`).
- Commit del código publicado: `43be397`.
- Ejecución verificada del código publicado: `40745703595` (success).

## Pendiente / no cubierto

- **Número comercial de WhatsApp sin confirmar.** El botón abre el diálogo de consulta preparada; no se publica el número.
- No se probó en Safari/iOS real ni en Firefox. Las pruebas fueron con Chrome.
- No hay pruebas automatizadas de regresión visual ni de accesibilidad con lector de pantalla real.
- El sitio publicado no tiene dominio propio; usa la URL gratuita de GitHub Pages.
