# GambianTour admin setup

The website includes Vercel Functions for the booking API and uses a private Vercel Blob store in production. Local development falls back to a JSON Lines file.

## Local setup

1. Copy `.env.example` to `.env`.
2. Replace `ADMIN_USERNAME`, `ADMIN_PASSWORD` and `SESSION_SECRET` with private values.
3. Start the website with `npm start`.
4. Open `http://localhost:3000/admin`.

Generate a suitable session secret with:

```sh
openssl rand -hex 32
```

The `.env` file and stored submissions are ignored by Git and must never be committed.

## Vercel setup

1. Open the Vercel project and select **Storage**.
2. Create a **Blob** store and set its access to **Private**.
3. Connect it to this project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
4. In **Settings > Environment Variables**, add `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `SESSION_SECRET` and `FORM_RECIPIENT_EMAIL` for Production, Preview and Development as needed.
5. Redeploy the latest commit after adding the variables.

Every accepted form is saved as a private JSON record before email forwarding is attempted. The admin panel is available at `/admin`, and sessions expire after eight hours.

The local JSON Lines file is intended only for local development. Vercel deployments refuse to accept forms until the private Blob store is connected, preventing requests from appearing successful without persistent storage.
