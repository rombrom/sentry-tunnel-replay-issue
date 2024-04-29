# Sentry Tunnel + Replay issue

With the `/tunnel` endpoint set up, Sentry doesn't appear to be able to save replays. Using compression on the replay payload
does not appear to make a difference.

Check it out:

1. Create `.env` file `cp .env.example .env`
2. Edit the newly created `.env` with values for a Sentry project under your control.
3. `npm run dev`
4. Navigate browser to [`http://localhost:5173/sentry-example-page`](http://localhost:5173/sentry-example-page)
5. Click the "Throw error!" button.
6. Open your Sentry dashboard and observe: error logged, no replay.
