#!/usr/bin/env python3
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont
import json
import math
import random

OUT = Path("zow-logo-assets")

CYAN = (36, 246, 255, 255)
MAGENTA = (255, 43, 214, 255)
WHITE = (242, 252, 255, 255)
DARK = (3, 4, 13, 255)

try:
    RESAMPLE = Image.Resampling.LANCZOS
except AttributeError:
    RESAMPLE = Image.LANCZOS


def tint(color, alpha):
    return (color[0], color[1], color[2], alpha)


def sbox(box, scale):
    return tuple(int(round(v * scale)) for v in box)


def spoints(points, scale):
    return [(int(round(x * scale)), int(round(y * scale))) for x, y in points]


def make_background(size):
    w, h = size
    low_w = 320
    low_h = max(160, int(low_w * h / w))
    small = Image.new("RGBA", (low_w, low_h), DARK)
    px = small.load()

    for y in range(low_h):
        for x in range(low_w):
            nx = x / max(1, low_w - 1) - 0.5
            ny = y / max(1, low_h - 1) - 0.5
            r = math.sqrt((nx * 1.35) ** 2 + (ny * 1.15) ** 2)
            pulse = max(0.0, 1.0 - r * 1.85)
            left = max(0.0, 0.55 - nx)
            right = max(0.0, nx + 0.55)

            red = int(3 + 18 * pulse + 26 * left * pulse)
            green = int(4 + 11 * pulse + 25 * right * pulse)
            blue = int(13 + 45 * pulse)
            px[x, y] = (min(red, 70), min(green, 70), min(blue, 105), 255)

    bg = small.resize((w, h), RESAMPLE)

    noise = Image.effect_noise((w, h), 18).convert("L")
    grain = Image.new("RGBA", (w, h), (255, 255, 255, 0))
    grain.putalpha(noise.point(lambda p: 10 if p > 145 else 0))
    bg.alpha_composite(grain)

    d = ImageDraw.Draw(bg, "RGBA")
    step = max(4, h // 128)
    for yy in range(0, h, step * 2):
        d.line((0, yy, w, yy), fill=(255, 255, 255, 8), width=1)

    return bg


def load_font(size, bold=True):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSansCondensed.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except Exception:
            pass

    try:
        return ImageFont.truetype("DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf", size=size)
    except Exception:
        return ImageFont.load_default()


def draw_line(draw, points, fill, width):
    try:
        draw.line(points, fill=fill, width=width, joint="curve")
    except TypeError:
        draw.line(points, fill=fill, width=width)


def draw_arc(draw, bbox, start, end, fill, width):
    try:
        draw.arc(bbox, start=start, end=end, fill=fill, width=width)
    except TypeError:
        for i in range(max(1, width)):
            inset = i - width // 2
            b = (bbox[0] - inset, bbox[1] - inset, bbox[2] + inset, bbox[3] + inset)
            draw.arc(b, start, end, fill=fill)


def draw_ellipse(draw, bbox, outline, width):
    try:
        draw.ellipse(bbox, outline=outline, width=width)
    except TypeError:
        for i in range(max(1, width)):
            inset = i - width // 2
            b = (bbox[0] - inset, bbox[1] - inset, bbox[2] + inset, bbox[3] + inset)
            draw.ellipse(b, outline=outline)


def draw_glow_line(img, points, color, width, glow_width=26, blur=16, alpha=115):
    width = max(1, int(width))
    glow_width = max(1, int(glow_width))

    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(layer, "RGBA")
    draw_line(gd, points, tint(color, alpha), width + glow_width)
    layer = layer.filter(ImageFilter.GaussianBlur(max(1, int(blur))))
    img.alpha_composite(layer)

    d = ImageDraw.Draw(img, "RGBA")
    draw_line(d, points, color, width)


def draw_glow_polygon(img, points, fill, glow=None, blur=18, alpha=110):
    if glow is None:
        glow = fill

    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(layer, "RGBA")
    gd.polygon(points, fill=tint(glow, alpha))
    layer = layer.filter(ImageFilter.GaussianBlur(max(1, int(blur))))
    img.alpha_composite(layer)

    d = ImageDraw.Draw(img, "RGBA")
    d.polygon(points, fill=fill)


def draw_glow_arc(img, bbox, start, end, color, width, glow_width=22, blur=14, alpha=120):
    width = max(1, int(width))
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(layer, "RGBA")
    draw_arc(gd, bbox, start, end, tint(color, alpha), width + max(1, int(glow_width)))
    layer = layer.filter(ImageFilter.GaussianBlur(max(1, int(blur))))
    img.alpha_composite(layer)

    d = ImageDraw.Draw(img, "RGBA")
    draw_arc(d, bbox, start, end, color, width)


def draw_glow_ellipse(img, bbox, color, width, glow_width=24, blur=16, alpha=115):
    width = max(1, int(width))
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(layer, "RGBA")
    draw_ellipse(gd, bbox, tint(color, alpha), width + max(1, int(glow_width)))
    layer = layer.filter(ImageFilter.GaussianBlur(max(1, int(blur))))
    img.alpha_composite(layer)

    d = ImageDraw.Draw(img, "RGBA")
    draw_ellipse(d, bbox, color, width)


def measure_text(draw, text, font):
    try:
        b = draw.textbbox((0, 0), text, font=font)
        return b[2] - b[0], b[3] - b[1]
    except Exception:
        return draw.textsize(text, font=font)


def draw_text_glow(img, xy, text, font, fill, glow, blur=10):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(layer, "RGBA")
    gd.text(xy, text, font=font, fill=glow)
    layer = layer.filter(ImageFilter.GaussianBlur(max(1, int(blur))))
    img.alpha_composite(layer)

    d = ImageDraw.Draw(img, "RGBA")
    d.text(xy, text, font=font, fill=fill)


def draw_tracking_text(img, text, y, font, tracking, fills, glow):
    d = ImageDraw.Draw(img, "RGBA")
    widths = [measure_text(d, ch, font)[0] for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    x = int((img.size[0] - total) / 2)

    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(layer, "RGBA")

    gx = x
    for i, ch in enumerate(text):
        gd.text((gx, y), ch, font=font, fill=glow)
        gx += widths[i] + tracking

    layer = layer.filter(ImageFilter.GaussianBlur(max(1, int(img.size[0] / 160))))
    img.alpha_composite(layer)

    x2 = x
    for i, ch in enumerate(text):
        fill = fills[i] if isinstance(fills, list) else fills
        d.text((x2, y), ch, font=font, fill=fill)
        x2 += widths[i] + tracking


def draw_skyline(img, scale):
    d = ImageDraw.Draw(img, "RGBA")
    rng = random.Random(404)
    baseline = int(525 * scale)

    for i in range(40):
        x = int((335 + rng.random() * 350) * scale)
        bw = max(3, int(rng.randint(8, 34) * scale))
        bh = max(20, int(rng.randint(90, 310) * scale))
        y = baseline - bh

        if i % 3 == 0:
            col = (255, 43, 214, rng.randint(24, 58))
            edge = tint(MAGENTA, rng.randint(70, 115))
        else:
            col = (36, 246, 255, rng.randint(20, 52))
            edge = tint(CYAN, rng.randint(65, 110))

        d.rectangle((x, y, x + bw, baseline), fill=col)
        d.line((x + bw - 1, y, x + bw - 1, baseline), fill=edge, width=max(1, int(scale)))

        gap = max(7, int(18 * scale))
        wy = y + max(2, int(9 * scale))
        while wy < baseline - max(2, int(5 * scale)):
            if rng.random() > 0.45:
                wx = x + max(1, int(3 * scale))
                ww = max(1, int((bw - 6 * scale) * rng.uniform(0.35, 0.85)))
                d.rectangle((wx, wy, wx + ww, wy + max(1, int(2 * scale))), fill=tint(WHITE, rng.randint(35, 85)))
            wy += gap


def draw_orbit_city(img, scale):
    d = ImageDraw.Draw(img, "RGBA")

    cx = int(512 * scale)
    d.line((cx, int(44 * scale), cx, int(940 * scale)), fill=tint(MAGENTA, 62), width=max(1, int(scale)))
    d.line((int(142 * scale), int(366 * scale), int(890 * scale), int(366 * scale)), fill=tint(CYAN, 38), width=max(1, int(scale)))

    draw_glow_arc(img, sbox((160, 118, 875, 888), scale), 198, 344, tint(MAGENTA, 230), max(2, int(7 * scale)), max(6, int(22 * scale)), max(5, int(14 * scale)))
    draw_glow_arc(img, sbox((238, 216, 932, 934), scale), 19, 123, tint(CYAN, 225), max(2, int(8 * scale)), max(6, int(22 * scale)), max(5, int(14 * scale)))
    draw_glow_arc(img, sbox((210, 146, 858, 846), scale), 324, 360, tint(WHITE, 180), max(1, int(3 * scale)), max(3, int(10 * scale)), max(3, int(6 * scale)))

    draw_skyline(img, scale)


def draw_main_mark(img, scale, dark_cuts=True):
    z_top = [(142, 366), (510, 320), (548, 362), (205, 426), (118, 407)]
    z_diag = [(483, 358), (583, 391), (236, 736), (109, 777), (381, 486)]
    z_bottom = [(177, 681), (523, 635), (551, 711), (91, 798), (128, 736)]

    draw_glow_polygon(img, spoints(z_top, scale), tint(MAGENTA, 236), MAGENTA, int(22 * scale), 120)
    draw_glow_polygon(img, spoints(z_diag, scale), tint(MAGENTA, 242), MAGENTA, int(24 * scale), 125)
    draw_glow_polygon(img, spoints(z_bottom, scale), tint(MAGENTA, 236), MAGENTA, int(22 * scale), 110)

    d = ImageDraw.Draw(img, "RGBA")
    d.polygon(spoints([(168, 365), (438, 335), (410, 354), (188, 388)], scale), fill=tint(WHITE, 126))
    d.polygon(spoints([(170, 721), (410, 684), (390, 709), (132, 758)], scale), fill=tint(WHITE, 70))

    if dark_cuts:
        for cut in [
            [(254, 431), (360, 409), (330, 450), (228, 474)],
            [(338, 543), (430, 502), (397, 552), (300, 592)],
            [(130, 735), (230, 711), (205, 748), (106, 779)],
        ]:
            d.polygon(spoints(cut, scale), fill=(1, 2, 8, 150))

    obox = sbox((402, 426, 647, 674), scale)
    draw_glow_ellipse(img, obox, tint(CYAN, 175), max(8, int(30 * scale)), max(6, int(25 * scale)), max(4, int(16 * scale)), 95)
    draw_glow_arc(img, obox, 12, 318, CYAN, max(6, int(28 * scale)), max(4, int(14 * scale)), max(3, int(8 * scale)), 130)
    draw_glow_arc(img, obox, 180, 252, MAGENTA, max(4, int(22 * scale)), max(4, int(12 * scale)), max(3, int(8 * scale)), 120)
    draw_glow_arc(img, obox, 302, 360, WHITE, max(3, int(15 * scale)), max(3, int(8 * scale)), max(2, int(5 * scale)), 100)
    draw_glow_arc(img, obox, 0, 58, WHITE, max(3, int(15 * scale)), max(3, int(8 * scale)), max(2, int(5 * scale)), 100)

    w_path = spoints([(650, 705), (695, 472), (750, 676), (815, 430), (875, 700), (943, 514)], scale)
    draw_glow_line(img, w_path, CYAN, max(8, int(42 * scale)), max(8, int(28 * scale)), max(4, int(18 * scale)), 125)
    draw_glow_line(img, spoints([(670, 707), (704, 548), (743, 662), (804, 480), (852, 687)], scale), tint(MAGENTA, 150), max(2, int(9 * scale)), max(3, int(10 * scale)), max(2, int(6 * scale)), 70)

    draw_glow_polygon(img, spoints([(901, 500), (970, 428), (930, 548)], scale), tint(CYAN, 220), CYAN, int(18 * scale), 90)
    d.polygon(spoints([(714, 476), (735, 443), (717, 544)], scale), fill=tint(WHITE, 110))
    d.polygon(spoints([(828, 432), (852, 392), (834, 512)], scale), fill=tint(WHITE, 92))


def draw_glitches(img, scale):
    d = ImageDraw.Draw(img, "RGBA")
    rng = random.Random(1717)

    for _ in range(95):
        color = rng.choice([MAGENTA, CYAN, WHITE])
        x = int(rng.uniform(85, 940) * scale)
        y = int(rng.uniform(295, 805) * scale)
        length = max(2, int(rng.uniform(12, 86) * scale))
        height = max(1, int(rng.uniform(1, 5) * scale))
        alpha = rng.randint(38, 145)

        if rng.random() < 0.72:
            d.rectangle((x, y, x + length, y + height), fill=tint(color, alpha))
        else:
            draw_line(d, [(x, y), (x + length, y - int(rng.uniform(-8, 8) * scale))], tint(color, alpha), max(1, int(2 * scale)))

    for tri in [
        [(96, 452), (118, 435), (130, 463)],
        [(222, 297), (235, 283), (242, 310)],
        [(905, 352), (936, 333), (928, 371)],
        [(822, 785), (855, 757), (861, 806)],
    ]:
        d.polygon(spoints(tri, scale), fill=tint(rng.choice([MAGENTA, CYAN]), 150))


def draw_tagline(img, scale):
    font = load_font(max(12, int(30 * scale)), bold=False)
    text = "ZOWGAME"
    fills = [
        tint(WHITE, 230),
        tint(WHITE, 220),
        tint(WHITE, 220),
        tint(CYAN, 230),
        tint(CYAN, 230),
        tint(CYAN, 230),
        tint(CYAN, 230),
    ]
    draw_tracking_text(
        img,
        text,
        int(833 * scale),
        font,
        max(2, int(20 * scale)),
        fills,
        tint(MAGENTA, 150),
    )

    d = ImageDraw.Draw(img, "RGBA")
    y = int(884 * scale)
    d.line((int(397 * scale), y, int(626 * scale), y), fill=tint(MAGENTA, 120), width=max(1, int(2 * scale)))
    d.line((int(626 * scale), y, int(795 * scale), y), fill=tint(CYAN, 120), width=max(1, int(2 * scale)))
    d.polygon(spoints([(512, 909), (524, 889), (500, 889)], scale), fill=tint(MAGENTA, 225))


def render_logo(size=1024, background=True, tagline=True):
    img = make_background((size, size)) if background else Image.new("RGBA", (size, size), (0, 0, 0, 0))
    scale = size / 1024.0

    draw_orbit_city(img, scale)
    draw_main_mark(img, scale, dark_cuts=background)
    draw_glitches(img, scale)

    if tagline:
        draw_tagline(img, scale)

    return img


def render_icon_z(size=512, background=True):
    img = make_background((size, size)) if background else Image.new("RGBA", (size, size), (0, 0, 0, 0))
    scale = size / 1024.0

    draw_glow_arc(img, sbox((145, 145, 875, 875), scale), 204, 340, MAGENTA, max(2, int(11 * scale)), max(5, int(28 * scale)), max(4, int(16 * scale)))
    draw_glow_arc(img, sbox((190, 190, 900, 900), scale), 25, 130, CYAN, max(2, int(12 * scale)), max(5, int(28 * scale)), max(4, int(16 * scale)))

    z_top = [(226, 238), (782, 194), (735, 326), (304, 360), (210, 326)]
    z_diag = [(710, 303), (823, 344), (391, 806), (220, 832), (568, 450)]
    z_bottom = [(290, 688), (792, 630), (836, 768), (202, 842), (244, 724)]

    draw_glow_polygon(img, spoints(z_top, scale), tint(MAGENTA, 242), MAGENTA, int(36 * scale), 135)
    draw_glow_polygon(img, spoints(z_diag, scale), tint(MAGENTA, 246), MAGENTA, int(38 * scale), 140)
    draw_glow_polygon(img, spoints(z_bottom, scale), tint(MAGENTA, 240), MAGENTA, int(36 * scale), 130)

    draw_glow_line(img, spoints([(245, 794), (788, 224)], scale), tint(CYAN, 230), max(3, int(17 * scale)), max(5, int(26 * scale)), max(3, int(14 * scale)), 115)

    d = ImageDraw.Draw(img, "RGBA")
    d.polygon(spoints([(248, 250), (642, 218), (595, 244), (268, 289)], scale), fill=tint(WHITE, 112))
    d.polygon(spoints([(293, 724), (662, 674), (622, 708), (240, 775)], scale), fill=tint(WHITE, 72))

    rng = random.Random(88)
    for _ in range(32):
        color = rng.choice([MAGENTA, CYAN, WHITE])
        x = int(rng.uniform(160, 850) * scale)
        y = int(rng.uniform(205, 835) * scale)
        length = max(1, int(rng.uniform(16, 90) * scale))
        d.rectangle((x, y, x + length, y + max(1, int(4 * scale))), fill=tint(color, rng.randint(55, 145)))

    return img


def render_og():
    img = make_background((1200, 630))
    d = ImageDraw.Draw(img, "RGBA")

    logo = render_logo(560, background=False, tagline=False)
    img.alpha_composite(logo, (50, 35))

    font_big = load_font(92, bold=True)
    font_mid = load_font(38, bold=False)
    font_small = load_font(24, bold=False)

    draw_text_glow(img, (620, 178), "ZOWGAME", font_big, WHITE, tint(MAGENTA, 160), 14)
    draw_text_glow(img, (624, 300), "zowgame", font_mid, tint(CYAN, 235), tint(CYAN, 110), 10)

    d.line((624, 365, 1050, 365), fill=tint(MAGENTA, 130), width=3)
    d.line((624, 374, 940, 374), fill=tint(CYAN, 130), width=2)
    d.text((624, 415), "CYBERPUNK NEON GAME IDENTITY", font=font_small, fill=tint(WHITE, 185))

    return img


SVG_BASE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#17214b"/>
      <stop offset="45%" stop-color="#080a19"/>
      <stop offset="100%" stop-color="#02030a"/>
    </radialGradient>
    <linearGradient id="zgrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="16%" stop-color="#ff2bd6"/>
      <stop offset="100%" stop-color="#a300ff"/>
    </linearGradient>
    <linearGradient id="cgrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="28%" stop-color="#24f6ff"/>
      <stop offset="100%" stop-color="#008cff"/>
    </linearGradient>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="9" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  __BG__
  <g opacity=".42">
    <path d="M512 44V940" stroke="#ff2bd6"/>
    <path d="M142 366H890" stroke="#24f6ff"/>
    <path d="M160 505C220 130 690 75 875 285" fill="none" stroke="#ff2bd6" stroke-width="7"/>
    <path d="M610 800C810 785 912 630 932 500" fill="none" stroke="#24f6ff" stroke-width="8"/>
  </g>
  <g opacity=".5">
    <rect x="355" y="300" width="28" height="225" fill="#24f6ff"/>
    <rect x="395" y="245" width="45" height="280" fill="#ff2bd6"/>
    <rect x="462" y="205" width="34" height="320" fill="#24f6ff"/>
    <rect x="525" y="255" width="56" height="270" fill="#ff2bd6"/>
    <rect x="612" y="180" width="36" height="345" fill="#24f6ff"/>
    <rect x="670" y="295" width="42" height="230" fill="#ff2bd6"/>
  </g>
  <g filter="url(#glow)">
    <polygon points="142,366 510,320 548,362 205,426 118,407" fill="url(#zgrad)"/>
    <polygon points="483,358 583,391 236,736 109,777 381,486" fill="url(#zgrad)"/>
    <polygon points="177,681 523,635 551,711 91,798 128,736" fill="url(#zgrad)"/>
    <circle cx="525" cy="550" r="108" fill="none" stroke="#24f6ff" stroke-width="38"/>
    <path d="M650 705L695 472L750 676L815 430L875 700L943 514" fill="none" stroke="url(#cgrad)" stroke-width="48" stroke-linejoin="round" stroke-linecap="round"/>
    <polygon points="901,500 970,428 930,548" fill="#24f6ff"/>
  </g>
  <text x="512" y="870" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="36" letter-spacing="22" fill="#dffcff">ZOWGAME</text>
</svg>
"""

SVG_SYMBOL = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
  <defs>
    <radialGradient id="bg" cx="50%" cy="45%" r="70%">
      <stop offset="0%" stop-color="#17214b"/>
      <stop offset="100%" stop-color="#02030a"/>
    </radialGradient>
    <linearGradient id="zgrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="18%" stop-color="#ff2bd6"/>
      <stop offset="100%" stop-color="#9a00ff"/>
    </linearGradient>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="1024" height="1024" fill="url(#bg)"/>
  <path d="M145 520C185 210 630 90 875 325" fill="none" stroke="#ff2bd6" stroke-width="11"/>
  <path d="M190 735C480 875 760 775 900 500" fill="none" stroke="#24f6ff" stroke-width="12"/>
  <g filter="url(#glow)">
    <polygon points="226,238 782,194 735,326 304,360 210,326" fill="url(#zgrad)"/>
    <polygon points="710,303 823,344 391,806 220,832 568,450" fill="url(#zgrad)"/>
    <polygon points="290,688 792,630 836,768 202,842 244,724" fill="url(#zgrad)"/>
    <path d="M245 794L788 224" stroke="#24f6ff" stroke-width="17"/>
  </g>
</svg>
"""


def write_svg_assets():
    OUT.mkdir(parents=True, exist_ok=True)

    full_svg = SVG_BASE.replace("__BG__", '<rect width="1024" height="1024" fill="url(#bg)"/>')
    transparent_svg = SVG_BASE.replace("__BG__", "")
    OUT.joinpath("logo.svg").write_text(full_svg, encoding="utf-8")
    OUT.joinpath("logo-transparent.svg").write_text(transparent_svg, encoding="utf-8")
    OUT.joinpath("logo-symbol.svg").write_text(SVG_SYMBOL, encoding="utf-8")


def save_assets():
    OUT.mkdir(parents=True, exist_ok=True)

    render_logo(1024, background=True, tagline=True).save(OUT / "logo.png")
    render_logo(2048, background=True, tagline=True).save(OUT / "logo@2x.png")
    render_logo(1024, background=False, tagline=True).save(OUT / "logo-transparent.png")

    icon_dark = render_icon_z(512, background=True)
    icon_trans = render_icon_z(512, background=False)

    icon_trans.save(OUT / "logo-mark.png")
    icon_dark.save(OUT / "logo-mark-dark.png")

    icon_dark.resize((16, 16), RESAMPLE).save(OUT / "favicon-16x16.png")
    icon_dark.resize((32, 32), RESAMPLE).save(OUT / "favicon-32x32.png")
    icon_dark.resize((180, 180), RESAMPLE).save(OUT / "apple-touch-icon.png")
    icon_dark.resize((192, 192), RESAMPLE).save(OUT / "android-chrome-192x192.png")
    icon_dark.resize((512, 512), RESAMPLE).save(OUT / "android-chrome-512x512.png")
    icon_dark.save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])

    render_og().save(OUT / "og-image.png")

    manifest = {
        "name": "ZOWGAME",
        "short_name": "ZOW",
        "icons": [
            {"src": "android-chrome-192x192.png", "sizes": "192x192", "type": "image/png"},
            {"src": "android-chrome-512x512.png", "sizes": "512x512", "type": "image/png"}
        ],
        "theme_color": "#05060f",
        "background_color": "#05060f",
        "display": "standalone"
    }
    OUT.joinpath("site.webmanifest").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

    write_svg_assets()


if __name__ == "__main__":
    save_assets()
    print("Generated ZOWGAME cyberpunk logo assets in:", OUT.resolve())
