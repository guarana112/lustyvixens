# Free API Upgrade Path

The current site is static and free. It saves demo submissions in browser `localStorage`.

When you are ready to connect a backend, keep the same field names:

- `creatorName`
- `creatorEmail`
- `title`
- `category`
- `source` = `link` or `file`
- `videoUrl`
- `videoFile`
- `rightsConfirmed`
- `notes`

## Safe production flow

1. Validate creator account and API key.
2. Require explicit rights confirmation and store the timestamp.
3. Accept either a direct licensed video URL or a file upload.
4. Scan and process the file.
5. Watermark with FFmpeg.
6. Upload to your licensed host.
7. Save metadata to Supabase.
8. Notify creator by email.

Do not download or republish third-party videos unless the creator owns the content or gives written permission.
