# LustyVixens Upload and GitHub Deploy Guide

This guide explains two things:

1. How to test video submissions on the current site.
2. What to upload to GitHub so your website changes go live.

## Current Important Limit

Right now, this is a free static website.

That means:

- The creator form works as a demo.
- Submissions are saved only in your browser.
- The site does not actually download videos yet.
- The site does not actually upload videos to Voe yet.
- The admin panel only shows submissions saved on the same browser/computer.

To receive real creator submissions online, the next step is connecting a backend like Formspree, Supabase, or a Node API.

## How To Test A Video Submission

1. Open `index.html`.
2. Click `Open Creator Form`.
3. Choose one upload option:
   - `Paste Link`
   - `Upload File`
4. Fill in:
   - Creator name
   - Creator email
   - Video title
   - Category
   - Video link or video file
   - Notes, if needed
5. Check the rights confirmation box.
6. Click `Save Submission`.
7. Open `Admin`.
8. You should see the submission in the review queue.

## Option 1: Paste Video Link

Use this when a creator gives you a legal video URL.

Only use links where:

- The creator owns the video.
- You have permission to use the video.
- All performers are 18+.
- You have the required records, releases, or proof of permission.

Do not use this for stolen videos, random tube-site videos, or videos you do not have rights to use.

## Option 2: Upload File From PC

Use this when the video file is already downloaded on your computer.

Steps:

1. Open `creator.html`.
2. Click `Upload File`.
3. Select the video file from your computer.
4. Fill in the title, category, creator info, and notes.
5. Confirm rights.
6. Save the submission.

In the current free version, the browser stores only the file name in the demo queue. It does not upload the real video file anywhere yet.

## How To Export A Backup

1. Open `admin.html`.
2. Click `Export JSON Backup`.
3. Save the downloaded `.json` file somewhere safe.

This backup contains the local demo submission data.

## What To Upload To GitHub

Upload the full contents of this folder:

```text
C:\Users\wolfm\LustyVixens\website
```

Make sure these files and folders are included:

```text
index.html
creator.html
admin.html
analytics.html
README.md
UPLOAD-AND-DEPLOY-GUIDE.md
PORTABILITY.md
assets/
assets/app.js
assets/styles.css
assets/lusty-vixens-logo.png
legal/
legal/terms.html
legal/privacy.html
legal/dmca.html
email/
email/sequences.md
api/
api/README.md
.github/
.github/workflows/backup-reminder.yml
```

Do not upload only `index.html`. The site needs the `assets`, `legal`, `email`, and `api` folders too.

## GitHub Upload Method

Use this if you do not want to use command line.

1. Go to GitHub.
2. Create a new repository.
3. Name it something like:

```text
lustyvixens-website
```

4. Open the repository.
5. Click `Add file`.
6. Click `Upload files`.
7. Drag everything inside:

```text
C:\Users\wolfm\LustyVixens\website
```

8. Wait for all files to finish uploading.
9. Commit the files.

## Make It Live With GitHub Pages

1. Open your GitHub repository.
2. Go to `Settings`.
3. Click `Pages`.
4. Under `Build and deployment`, choose:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

5. Click `Save`.
6. Wait a few minutes.
7. GitHub will show your live website URL.

It will look similar to:

```text
https://yourusername.github.io/lustyvixens-website/
```

## How To Update The Live Site Later

When I make changes to your website:

1. Upload the changed files to GitHub.
2. Commit the changes.
3. Wait 1-3 minutes.
4. Refresh your live GitHub Pages link.

If the change is CSS or JavaScript, refresh hard:

```text
Ctrl + F5
```

## Best Free Hosting Options

GitHub Pages:

- Best for simple static sites.
- Free.
- Good for this current version.

Cloudflare Pages:

- Also free.
- Better if you later connect a custom domain.
- Good security and CDN.

Netlify:

- Free.
- Very easy drag-and-drop deploy.

Vercel:

- Free.
- Good if the site later becomes a React/Next.js app.

## What Is Not Live Yet

These features need a real backend before they work online:

- Real file uploads.
- Real video downloading from links.
- Auto-watermarking.
- Auto-upload to Voe.
- Creator login.
- Admin login.
- Real database.
- Email notifications.

## Next Upgrade Path

Free next step:

1. Connect the creator form to Formspree.
2. Send submissions to your email.
3. Keep GitHub Pages as the live website.

Better next step:

1. Connect Supabase.
2. Store creator submissions in a real database.
3. Add admin login.
4. Add real catalog management.

Full automation step:

1. Add Node.js API.
2. Add link downloader.
3. Add file upload handling.
4. Add FFmpeg watermarking.
5. Add Voe upload integration.

## Safety Rule

Only upload or process content you own, licensed, or have written permission to distribute. DMCA protection works best when the site has clear rules, takedown handling, and proof that submitted content is authorized.
