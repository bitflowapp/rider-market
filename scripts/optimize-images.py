#!/usr/bin/env python3
"""Optimiza las fotografías originales del cliente a WebP responsive.

- Corrige orientación EXIF y elimina todos los metadatos.
- Genera anchos 1000 / 640 px (sin upscalear).
- Genera una imagen Open Graph 1200x630.
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "source"
OUT = ROOT / "public" / "assets" / "img"
OUT.mkdir(parents=True, exist_ok=True)

IMAGES = [
    ("servicio-bicicletas", 88),
    ("servicio-antipinchazos", 88),
    ("perfume-la-bomba", 84),
    ("perfume-sterling", 84),
    ("pedales-ridera", 84),
    ("pastillas-freno", 84),
    ("smartwatch-erun", 84),
    ("perfume-go-mango", 84),
    ("perfume-khamrah-qahwa", 84),
    ("perfume-9pm-elixir", 84),
    ("perfumes-club-only", 84),
    ("perfumes-yara", 84),
]

WIDTHS = [1000, 640]

for name, quality in IMAGES:
    src = SRC / f"{name}.jpeg"
    im = Image.open(src)
    im = ImageOps.exif_transpose(im).convert("RGB")
    w, h = im.size
    for target in WIDTHS:
        if target > w:
            continue
        nh = round(h * target / w)
        resized = im.resize((target, nh), Image.Resampling.LANCZOS)
        dest = OUT / f"{name}-{target}.webp"
        resized.save(dest, "WEBP", quality=quality, method=6)
        print(f"{dest.name}: {target}x{nh} {dest.stat().st_size // 1024} KB")

# Detalle del póster de servicio para el hero: recorte 4:5 sin texto.
hero = Image.open(SRC / "servicio-bicicletas.jpeg")
hero = ImageOps.exif_transpose(hero).convert("RGB")
detail = ImageOps.grayscale(hero.crop((540, 420, 1024, 1024))).convert("RGB")
detail.save(OUT / "hero-taller-484.webp", "WEBP", quality=86, method=6)
detail.resize((968, 1208), Image.Resampling.LANCZOS).save(
    OUT / "hero-taller-968.webp", "WEBP", quality=82, method=6
)
mobile = ImageOps.grayscale(hero.crop((520, 520, 1024, 835))).convert("RGB")
mobile.resize((640, 400), Image.Resampling.LANCZOS).save(
    OUT / "hero-taller-mobile-640.webp", "WEBP", quality=84, method=6
)
print("hero-taller-484.webp / hero-taller-968.webp / hero-taller-mobile-640.webp listos")

# Recortes de detalle para las tarjetas de servicio (sin titulares del póster).
taller = ImageOps.grayscale(hero.crop((540, 520, 1024, 822))).convert("RGB")
taller.save(OUT / "servicio-taller-detalle-484.webp", "WEBP", quality=86, method=6)
taller.resize((384, 240), Image.Resampling.LANCZOS).save(
    OUT / "servicio-taller-detalle-384.webp", "WEBP", quality=84, method=6
)
anti = Image.open(SRC / "servicio-antipinchazos.jpeg")
anti = ImageOps.grayscale(ImageOps.exif_transpose(anti).convert("RGB").crop((480, 800, 1024, 1140))).convert("RGB")
anti.save(OUT / "servicio-antipinchazos-detalle-544.webp", "WEBP", quality=86, method=6)
anti.resize((384, 240), Image.Resampling.LANCZOS).save(
    OUT / "servicio-antipinchazos-detalle-384.webp", "WEBP", quality=84, method=6
)
print("recortes de servicio listos")

# Open Graph 1200x630, tipográfico y sin depender de fuentes externas.
og = Image.new("RGB", (1200, 630), "#0d1012")
draw = ImageDraw.Draw(og)
try:
    bold = ImageFont.truetype(r"C:\Windows\Fonts\arialbd.ttf", 96)
    regular = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 30)
    small = ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", 22)
except OSError:
    bold = ImageFont.load_default()
    regular = ImageFont.load_default()
    small = ImageFont.load_default()

draw.rectangle((0, 0, 14, 630), fill="#8fcbe8")
draw.text((80, 150), "RIDER MARKET", font=bold, fill="#ffffff")
draw.text((84, 280), "Servicio · Repuestos · Perfumes", font=regular, fill="#8fcbe8")
draw.text((84, 340), "Tu bici. Tu ritmo. Tu mercado.", font=regular, fill="#d8dde1")
draw.line((84, 430, 520, 430), fill="#2a3136", width=2)
draw.text((84, 460), "NEUQUÉN · ARGENTINA", font=small, fill="#9aa4ab")
draw.text((84, 540), "rider market", font=small, fill="#5d686f")
og.save(OUT / "og-rider-market.jpg", "JPEG", quality=90, optimize=True)
print("og-rider-market.jpg listo")
