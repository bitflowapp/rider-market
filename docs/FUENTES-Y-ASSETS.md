# Fuentes y assets

## Origen de las imágenes

Las 12 imágenes fueron enviadas por el cliente por WhatsApp el **27/10/2026**, en la conversación identificada con el número terminado en **2572**. No se accedió a otras conversaciones ni se modificó WhatsApp.

- Archivo original descargado: `D:\temp\rider-wa\rider-media.zip` (fuera del repositorio).
- Copias de trabajo: `assets/source/` (12 JPEG, sin metadatos EXIF).
- Versiones publicadas: `public/assets/img/` (WebP 640/1000, recortes y OG).

## Inventario

| Archivo fuente | Tamaño | Uso en el sitio | Tipo |
|---|---:|---|---|
| `servicio-bicicletas.jpeg` | 1024×1024 | Hero (recorte), tarjeta de servicio (recorte), galería | Ilustración IA |
| `servicio-antipinchazos.jpeg` | 1024×1536 | Tarjeta de servicio (recorte), galería | Ilustración IA |
| `perfume-la-bomba.jpeg` | 1600×1440 | Producto y galería | Foto real |
| `perfume-sterling.jpeg` | 1600×1200 | Producto y galería | Foto real |
| `perfume-go-mango.jpeg` | 1469×1413 | Producto y galería | Foto real |
| `perfume-khamrah-qahwa.jpeg` | 1600×1200 | Producto y galería | Foto real |
| `perfume-9pm-elixir.jpeg` | 1600×1200 | Producto y galería | Foto real |
| `perfumes-club-only.jpeg` | 1200×1600 | Producto y galería | Foto real |
| `perfumes-yara.jpeg` | 1200×1600 | Producto y galería | Foto real |
| `pedales-ridera.jpeg` | 1600×1200 | Producto y galería | Foto real |
| `pastillas-freno.jpeg` | 1200×1600 | Producto y galería | Foto real |
| `smartwatch-erun.jpeg` | 1600×935 | Producto y galería | Foto real |

## Recortes derivados

- `hero-taller-484.webp`, `hero-taller-968.webp`: detalle del póster de servicio de bicicletas, recortado para evitar los titulares del póster. Fondo en escala de grises.
- `hero-taller-mobile-640.webp`: recorte horizontal para móvil, mismo origen.
- `servicio-taller-detalle-484.webp` y `servicio-antipinchazos-detalle-544.webp`: detalles en escala de grises para las tarjetas de servicio.
- `og-rider-market.jpg`: composición tipográfica 1200×630 para redes sociales.

Todos los recortes son derivados de las ilustraciones del cliente y se identifican en el sitio como **Ilustración**.

## Criterio editorial

- Las ilustraciones de servicio **no** representan trabajos realizados; están rotuladas como “Ilustración” en el hero, las tarjetas y la galería, y hay una nota visible en la sección de servicios y en la galería.
- Las fotos de productos se muestran sin retoques de contenido. Las marcas y presentaciones se indican según lo visible en los envases.
- No se publican precios ni stock. Las presentaciones que no se pueden leer con certeza se indican como “a confirmar”.

## Tipografías

- **Manrope** — Mikhail Sharanda. SIL Open Font License 1.1. Licencia: `public/assets/fonts/OFL-Manrope.txt`.
- **Instrument Serif** — Rodrigo Fuenzalida / Instrument. SIL Open Font License 1.1. Licencia: `public/assets/fonts/OFL-InstrumentSerif.txt`.

Ambas se autoalojan en WOFF2 (subconjunto latino) para evitar pedidos a Google Fonts.

## Dependencias externas

Ninguna en producción. El sitio no carga analítica, mapas, fuentes, iconos ni scripts de terceros.
