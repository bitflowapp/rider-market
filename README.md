# Rider Market — sitio web

Sitio comercial estático de **Rider Market** (Neuquén, Argentina): servicio de bicicletas, repuestos, accesorios y una selección de perfumes.

- **Sitio publicado:** https://bitflowapp.github.io/rider-market/
- **Repositorio:** https://github.com/bitflowapp/rider-market
- **Stack:** HTML, CSS y JavaScript sin dependencias ni build. Fuentes autoalojadas. Sin Supabase, Firebase, base de datos, servidor propio ni pasarela de pagos.
- **Hosting:** GitHub Pages (gratuito), desplegado desde `public/` con GitHub Actions.

## Estado

El sitio está terminado y publicado. Queda pendiente **confirmar el número comercial de WhatsApp** para activar el botón directo: hoy el botón abre un diálogo que permite preparar y copiar la consulta, sin publicar el número del cliente.

## Estructura

```
public/                     Sitio que se publica
  index.html                Inicio, servicios, productos, galería y contacto
  styles.css                Sistema visual y responsive
  app.js                    Menú, filtros, lightbox, contacto, compartir
  404.html                  Página de error
  favicon.svg
  site.webmanifest
  robots.txt
  sitemap.xml
  assets/fonts/             Manrope e Instrument Serif (WOFF2 + licencias OFL)
  assets/img/               Imágenes optimizadas WebP, OG e iconos
assets/source/              Originales recibidos del cliente (12 JPEG)
legacy-demo/                Demo anterior recuperada desde Vercel (referencia, no se publica)
scripts/optimize-images.py  Generación de WebP, recortes y OG
docs/                       Fuentes, criterios y QA
.github/workflows/pages.yml Despliegue a GitHub Pages
```

## Previsualizar en local

Desde la raíz del proyecto:

```powershell
python -m http.server 4174 -d public
```

Abrir `http://127.0.0.1:4174/`.

No requiere instalar dependencias. Para regenerar las imágenes hace falta Python 3 con Pillow:

```powershell
python scripts/optimize-images.py
```

## Publicar

El workflow `.github/workflows/pages.yml` publica `public/` en GitHub Pages al hacer push a `main`.

```powershell
git push origin main
```

En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Contenido y criterios

- No se publican precios, stock, promociones, testimonios, reseñas, años de experiencia ni trabajos realizados que no estén confirmados.
- Los productos se describen según lo visible en las fotos enviadas por el cliente. Las presentaciones dudosas se indican como “a confirmar”.
- Las dos imágenes de servicios son ilustraciones generadas con IA enviadas por el cliente. Están rotuladas como **Ilustración** y no se presentan como trabajos reales.
- Las fotos de productos son fotografías reales del cliente.
- No hay carrito, checkout ni pagos online.
- El sitio no hace pedidos a servicios externos: fuentes, estilos, scripts e imágenes son locales.

## WhatsApp

El número comercial **no está publicado**. `body[data-whatsapp]` está vacío a propósito.

Para activarlo, cuando el emprendimiento lo confirme:

1. Completar `data-whatsapp` en `public/index.html` con el número en formato internacional, solo dígitos (ejemplo: `5492990000000`).
2. Revisar el texto de `data-contact-note` y del diálogo `#contact-dialog`.
3. Volver a ejecutar las pruebas de `docs/QA.md`.

No publicar el número sin autorización expresa del cliente.

## Pruebas

Ver [`docs/QA.md`](docs/QA.md). Última corrida: **47/47 comprobaciones aprobadas** y Lighthouse **99/100/100/100** en móvil y **100/100/100/100** en escritorio (Chrome headless, local).

## Fuentes e imágenes

Ver [`docs/FUENTES-Y-ASSETS.md`](docs/FUENTES-Y-ASSETS.md). Las fuentes se distribuyen bajo SIL Open Font License; las licencias están en `public/assets/fonts/`.
