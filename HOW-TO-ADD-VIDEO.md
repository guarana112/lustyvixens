# How to add a video

Videos live on Doodstream (or similar). The site embeds them via `videos.json`.

## Steps

1. **Upload video to Doodstream.**
2. **Get the embed link.** On Doodstream: open the video → **Embed** tab → copy the URL.
   It looks like: `https://dood.to/e/abc123xyz` (the `/e/` version = embed).
3. **Open `videos.json`.** Add one block inside the `"videos": [ ... ]` list:

```json
{
  "id": "v3",
  "title": "My Video Title",
  "category": "amateur",
  "creator": "Creator Name",
  "thumb": "https://link-to-thumbnail.jpg",
  "embed": "https://dood.to/e/abc123xyz",
  "added": "2026-07-22"
}
```

   - `id` — any unique text (v3, v4, ...).
   - `category` — used for the filter buttons (amateur, solo, couples, asian, featured, ...).
   - `thumb` — optional. Leave `""` for a placeholder tile. Doodstream also gives a splash/thumbnail image URL you can paste here.
   - `embed` — MUST be the `/e/` embed URL, not the normal watch page.
   - Put a comma between blocks. No comma after the last block.

4. **Save.** Then publish (push to GitHub) — the video appears in **Watch**.

## Rules

- Only add content you are licensed to distribute.
- Placeholder entries with `REPLACE_WITH_CODE` in the embed are hidden automatically.
- Keep the JSON valid — one bad comma breaks the whole gallery. Paste into jsonlint.com if unsure.
