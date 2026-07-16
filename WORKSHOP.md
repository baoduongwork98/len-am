# WORKSHOP.md — Nhật ký dự án Landing Page `/scroll-word`

Trang landing "camera bay xuyên các khu vực trong shop khi scroll", kết thúc bằng form
đăng ký workshop đan len. Chỉ frontend — không lưu trữ form, không giá/thanh toán.
Bắt đầu: 15/07/2026. Route thật là `/scroll-word` (không phải `/workshop`) —
`src/app/scroll-word/page.tsx` + `WorkshopClient.tsx`; asset path (`public/workshop/`)
và tên component (`ScrollWorld`, `WorkshopSignupSection`) vẫn giữ tiền tố `workshop`.

---

## 1. Tổng quan & các quyết định đã chốt

| Hạng mục | Quyết định |
|---|---|
| Kiến trúc trang | Hero + `ScrollWorld` (scroll-scrub video) + `WorkshopSignupSection` tại scene 3 |
| Kiến trúc camera | B — dive-in từng scene + connector aerial nối các scene (5 dive + 4 connector) |
| Pipeline asset | Ban đầu: Gemini API trực tiếp → **key free tier bị quota 0 cho mọi model ảnh/video** → chuyển sang **generate thủ công trên UI miễn phí** (AI Studio cho ảnh, Flow cho video Veo), import vào `public/workshop/raw/` |
| Font | Giữ **Fraunces + Plus Jakarta Sans** (prompt gốc yêu cầu Karla nhưng Karla không có subset `vietnamese` — vỡ dấu tiếng Việt) |
| Palette | `--yarn-coral/sage/beige/cream/ink` là **alias** về token brand sẵn có (terracotta `#C17A56`, sage `#93A382`, beige `#F4EEE3`, cream `#FAF6EF`, ink `#2B2622`) — không tạo palette mới |
| Skill | `.claude/skills/scroll-world` = bản fork budget-gate (cth9191/scroll-world) thay bản upstream; design skill dùng `design-taste-frontend` + `high-end-visual-design` trong `.agents/skills/` |
| Design Read | Consumer workshop landing (scroll-cinematic) cho người yêu đan len VN, brand Len Ấm preserve, warm-artisan/editorial — dials VARIANCE 7 / MOTION 8 / DENSITY 3 |

## 2. Phase 0 — Setup (✅ xong, build pass)

- shadcn/ui init (base radix, preset nova) + add `card` `button` `input` `label` `select`.
  Init đã ghi đè token brand và tiêm font Geist (latin-only) → **đã sửa tay**: gỡ Geist
  khỏi `layout.tsx`, remap token shadcn (`primary/ring/accent/muted/...`) về palette
  Len Ấm trong `globals.css`, xoá block `.dark` (site khoá light theme).
- Thêm CSS vars `--yarn-*` + mapping `@theme` (`bg-yarn-coral`, ...).
- Cài ffmpeg 8.1.2 (winget) + Pillow 12.3.0. `.env.local` chứa `GEMINI_API_KEY`
  (API bị quota-0, giữ lại cho giai đoạn sau nếu nâng paid tier).

## 3. Quy ước file asset

```
public/workshop/raw/
  scene-1..5.jpeg        # still 16:9 (đã import, đã duyệt cohesion ✅)
  dive-1..5.mp4          # 720p/24fps, dive-1 dài 10s, còn lại 8s (đã import ✅)
  connector-1-2..4-5.mp4 # đang chờ user generate
  frames/                # frame biên do ffmpeg extract (nguyên liệu connector)
    dive-N-first.png / dive-N-last.png
```

5 scene cố định: 1 Mặt tiền → 2 Kệ len gradient → 3 Góc workshop (CTA, clip dài/orbit)
→ 4 Góc dụng cụ đan móc (đổi từ "bàn may", bỏ máy khâu theo yêu cầu) → 5 Thành phẩm học viên.

## 4. Prompt tạo ẢNH (AI Studio, Nano Banana, 16:9)

### Style-lock — đứng đầu MỌI prompt ảnh

```
isometric diorama photo, 45-degree top-down angle, warm coral/beige/sage color palette,
soft natural window light, cozy handcraft yarn shop, PBR-style soft shadows, minimal
clean composition, no text, no letters, no logos, no people. Color palette: coral
terracotta #C17A56, soft beige #F4EEE3, sage green #93A382, warm cream #FAF6EF, dark
ink #2B2622. Focal subject centered, composition safe for portrait center-crop.
```

### Scene 2–5: đính kèm `scene-1` làm reference + thêm dòng này trước style-lock

```
Match the exact art style, color palette, lighting, camera angle and miniature scale
of the attached reference image. Same world, different room.
```

### Subject từng scene

**Scene 1 — anchor (mặt tiền):**
```
Subject: the charming street facade of a small artisan yarn shop seen from outside —
cream plaster walls, a coral-terracotta awning over a large warm-lit display window
filled with stacked balls of yarn in gradient colors, a wooden door slightly ajar,
potted sage-green plants by the entrance, a small bicycle with a basket of yarn
leaning against the wall, a blank wooden sign board.
```

**Scene 2 — kệ len gradient:**
```
Subject: interior of the yarn shop — tall wooden shelves lining the walls, filled with
hundreds of yarn balls arranged in a smooth color gradient flowing from coral through
beige to sage, a rolling wooden ladder, woven baskets of chunky wool on the floor,
warm light washing across the shelves from a side window.
```

**Scene 3 — góc workshop (scene chủ đạo):**
```
Subject: the workshop corner of the yarn shop — one long rustic wooden table in the
center with six chairs, knitting needles, crochet hooks and half-finished knitting
projects laid out at each seat, small baskets of yarn on the table, pendant lamps
hanging low with warm glow, a pinboard with fabric swatches on the wall, big window
with soft daylight.
```

**Scene 4 — góc dụng cụ (bản sửa, không máy khâu):**
```
Subject: a small craft prep corner at the back of the yarn shop — a compact wooden
desk with crochet hooks and knitting needles arranged in ceramic jars by size, a
wooden yarn swift and a ball winder on the desk, skeins of yarn being wound, stitch
markers and scissors in small trays, a wall rack of yarn spools sorted by color, a
dress form wearing a half-finished knitted cardigan, a pegboard with hanging measuring
tapes and pom-pom makers, cozy clutter kept tidy, warm task lamp light.
```

**Scene 5 — thành phẩm học viên:**
```
Subject: a gallery nook displaying handmade student work — knitted sweaters and
cardigans on wooden hangers along a rail, folded scarves stacked by color on a low
shelf, amigurumi animals and beanies on floating shelves, small paper tags (blank) on
each piece, a soft armchair with a knitted throw, string lights giving a warm glow.
```

## 5. Prompt tạo VIDEO DIVE (Flow, Frames to Video, CHỈ ô first frame = still tương ứng, 16:9, 8s)

Câu chốt "In the final second the camera settles into a slow, steady forward drift"
là bắt buộc — đảm bảo frame cuối là cú trôi thẳng đều để connector nối không khựng.

**dive-1** (với `scene-1`):
```
Single continuous cinematic camera move, no cuts. Begin high and far, looking at the
whole miniature yarn shop facade from outside, then slowly descend and glide forward
inside toward the glowing display window and the wooden door, revealing the interior
details. Smooth graceful slow motion, soft warm light, isometric diorama world. In the
final second the camera settles into a slow, steady forward drift. No text, no people.
```

**dive-2** (với `scene-2`):
```
Single continuous cinematic camera move, no cuts. Begin high and far, looking at the
whole miniature yarn shop shelf room from outside, then slowly descend and glide
forward inside toward the tall wooden shelves filled with yarn balls arranged in a
smooth color gradient, revealing the woven baskets and the rolling ladder. Smooth
graceful slow motion, soft warm light, isometric diorama world. In the final second
the camera settles into a slow, steady forward drift. No text, no people.
```

**dive-3** (với `scene-3` — camera orbit quanh bàn, scene đặt CTA):
```
Single continuous cinematic camera move, no cuts. Begin high and far, looking at the
whole miniature workshop corner from outside, then slowly descend toward the long
rustic wooden table, then slowly orbit halfway around the table, lingering on the
knitting needles, yarn baskets and half-finished knitting projects under the warm
pendant lamps. Smooth graceful slow motion, soft warm light, isometric diorama world.
In the final second the camera settles into a slow, steady forward drift. No text,
no people.
```

**dive-4** (với `scene-4`, bản sửa theo scene 4 mới):
```
Single continuous cinematic camera move, no cuts. Begin high and far, looking at the
whole miniature craft prep corner from outside, then slowly descend and glide forward
inside toward the wooden desk with crochet hooks in ceramic jars and the yarn swift
winding a skein, revealing the pegboard of tools and the dress form wearing a
half-finished knitted cardigan. Smooth graceful slow motion, soft warm light,
isometric diorama world. In the final second the camera settles into a slow, steady
forward drift. No text, no people.
```

**dive-5** (với `scene-5`):
```
Single continuous cinematic camera move, no cuts. Begin high and far, looking at the
whole miniature gallery nook from outside, then slowly descend and glide forward
inside toward the knitted sweaters on wooden hangers and the floating shelves of
amigurumi animals, revealing the soft armchair with a knitted throw under the warm
string lights. Smooth graceful slow motion, soft warm light, isometric diorama world.
In the final second the camera settles into a slow, steady forward drift. No text,
no people.
```

## 6. Prompt tạo CONNECTOR (Flow, Frames to Video, dùng CẢ 2 ô ảnh — đang chờ)

Nguyên tắc seam (quan trọng nhất toàn pipeline): endpoint của connector phải là
**frame thật trích từ video dive** (ffmpeg), tuyệt đối không dùng ảnh scene gốc —
mỗi lần model render lại sẽ khác nhau, dùng ảnh gốc là bị "pop" tại điểm nối.

| File | First frame | Last frame |
|---|---|---|
| `connector-1-2.mp4` | `frames/dive-1-last.png` | `frames/dive-2-first.png` |
| `connector-2-3.mp4` | `frames/dive-2-last.png` | `frames/dive-3-first.png` |
| `connector-3-4.mp4` | `frames/dive-3-last.png` | `frames/dive-4-first.png` |
| `connector-4-5.mp4` | `frames/dive-4-last.png` | `frames/dive-5-first.png` |

**World-lock** (đoạn mô tả môi trường bên ngoài, giữ NGUYÊN VĂN trong cả 4 prompt —
nếu thiếu, mỗi connector sẽ tự bịa một thế giới bên ngoài khác nhau; bối cảnh lấy
theo đúng scene-1):

```
revealing the same miniature diorama world below: a cozy village street of cream
plaster houses with terracotta tiled roofs, cobblestone lanes, green ivy on the walls,
and the yarn shop with its coral-terracotta awning, all under soft warm afternoon light
```

**connector-1-2:**
```
Single continuous camera move, no cuts. Pull up and back out of the miniature yarn
shop interior, rise up through the opening roof into the air, revealing the same
miniature diorama world below: a cozy village street of cream plaster houses with
terracotta tiled roofs, cobblestone lanes, green ivy on the walls, and the yarn shop
with its coral-terracotta awning, all under soft warm afternoon light. Glide smoothly
across the tiled rooftops of this same street, and arrive above the miniature shelf
room filled with gradient yarn walls, its roof opening as the camera begins to descend
inside. Seamless flowing aerial transition, isometric diorama world, soft warm light.
No text, no people.
```

**connector-2-3:**
```
Single continuous camera move, no cuts. Pull up and back out of the miniature yarn
shelf room, rise up through the opening roof into the air, revealing the same
miniature diorama world below: a cozy village street of cream plaster houses with
terracotta tiled roofs, cobblestone lanes, green ivy on the walls, and the yarn shop
with its coral-terracotta awning, all under soft warm afternoon light. Glide smoothly
across the tiled rooftops of this same street, and arrive above the miniature workshop
corner with its long rustic wooden table and chairs, its roof opening as the camera
begins to descend inside. Seamless flowing aerial transition, isometric diorama world,
soft warm light. No text, no people.
```

**connector-3-4:**
```
Single continuous camera move, no cuts. Pull up and back out of the miniature workshop
corner with the long wooden table, rise up through the opening roof into the air,
revealing the same miniature diorama world below: a cozy village street of cream
plaster houses with terracotta tiled roofs, cobblestone lanes, green ivy on the walls,
and the yarn shop with its coral-terracotta awning, all under soft warm afternoon
light. Glide smoothly across the tiled rooftops of this same street, and arrive above
the miniature craft prep corner with crochet hooks in ceramic jars and a wooden yarn
swift, its roof opening as the camera begins to descend inside. Seamless flowing
aerial transition, isometric diorama world, soft warm light. No text, no people.
```

**connector-4-5:**
```
Single continuous camera move, no cuts. Pull up and back out of the miniature craft
prep corner, rise up through the opening roof into the air, revealing the same
miniature diorama world below: a cozy village street of cream plaster houses with
terracotta tiled roofs, cobblestone lanes, green ivy on the walls, and the yarn shop
with its coral-terracotta awning, all under soft warm afternoon light. Glide smoothly
across the tiled rooftops of this same street, and arrive above the miniature gallery
nook with knitted sweaters on hangers and amigurumi shelves, its roof opening as the
camera begins to descend inside. Seamless flowing aerial transition, isometric diorama
world, soft warm light. No text, no people.
```

## 7. Trạng thái & việc còn lại

- [x] Phase 0 — setup, Design Read, shadcn, token, font, tooling
- [x] 5 still — generate, import, duyệt cohesion
- [x] 5 dive — generate, import, extract frame biên
- [ ] 4 connector — user generate trên Flow theo bảng mục 6 (chưa có; scene ghép trực
      tiếp dive→dive bằng crossfade null-slot trong `ScrollWorld`, sẽ thay bằng connector
      thật khi có)
- [x] Encode 5 dive: crf 20, `-g 8`, strip audio, faststart (`public/workshop/vid/scene-N.mp4`)
      — **đã đổi ý so với ghi chú cũ**: có thêm bản mobile riêng `scene-N-m.mp4` +
      poster `scene-N-poster-m.jpg` (dùng khi `matchMedia("(max-width: 600px)")`), vì
      bản gốc 720p vẫn nặng hơn cần thiết trên mobile data
- [x] Extract poster từ clip đã encode (`public/workshop/posters/scene-N-poster.jpg` +
      `-poster-m.jpg`)
- [ ] SSIM seam-check tự động — chưa chạy được vì thiếu connector; sẽ chạy sau khi có
      đủ 4 connector (script trong skill `references/pipeline.md` §5c)
- [x] Phase 2 — `src/app/scroll-word/page.tsx` (server, metadata) + `WorkshopClient.tsx`
      (hero + lắp `ScrollWorld`), `src/components/workshop/ScrollWorld.tsx` (Motion
      `useScroll` + `position: sticky`, currentTime scrub theo scroll, crossfade seam,
      `prefers-reduced-motion` fallback dạng stack tĩnh, iOS priming, rail nav bên phải
      để nhảy thẳng tới scene, SEO copy mirror `sr-only`),
      `src/components/workshop/WorkshopSignupSection.tsx` (form client-only, tái dùng
      validation + Zustand store của `WorkshopModal`, không API) — build pass,
      smoke-test qua Chrome DevTools: scroll qua cả 5 scene, crossfade mượt, submit form
      thành công (toast + badge giỏ hàng), mobile 390px crop-safe ổn
- [x] Fix `WorkshopModal.tsx` input `text-xs` → `text-base` (< 16px làm Safari iOS tự
      zoom khi focus input)
- [x] Phase 3 (a11y) — `WorkshopSignupSection` dropdown "Chọn buổi học" ban đầu tự chế
      (`<ul role="listbox">` + `<li onClick>`, không bàn phím thao tác được, `<select>`
      thật bị giấu `tabIndex={-1}`) → thay bằng đúng pattern `<select>` +
      `appearance-none` mà `WorkshopModal.tsx` đã dùng cho cùng field này — native, gõ
      bàn phím/đọc màn hình dùng được ngay, ít code hơn (xoá `isOpen` state,
      `dropdownRef`, click-outside effect). Verify: build pass, DevTools a11y-tree lộ
      đúng `combobox` + `option`, điền form + submit ở 375px chạy trọn luồng.
- [ ] Phase 3 (còn lại) — audit anti-slop, kiểm tra tương phản rail dots (số + line khi
      không active, `text-surface/40` / `bg-surface/30` đè lên video) trên thiết bị thật
      trước khi báo xong
