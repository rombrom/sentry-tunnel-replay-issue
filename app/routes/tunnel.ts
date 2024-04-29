import { type ActionFunctionArgs, json } from '@remix-run/node';

const SENTRY_HOST = 'o4507168685883392.ingest.de.sentry.io';
const SENTRY_PROJECT_ID = '4507168687980624';

export async function action({ request }: ActionFunctionArgs) {
  try {
    const body = await request.text();
    const [piece] = body.split('\n');
    const header = JSON.parse(piece) as { dsn: string };
    const dsn = new URL(header.dsn);
    const project_id = dsn.pathname.replace('/', '');

    if (dsn.hostname !== SENTRY_HOST) {
      throw new Response(`Invalid sentry hostname: ${dsn.hostname}`, {
        status: 400,
        statusText: 'Bad Request',
      });
    }

    if (project_id !== SENTRY_PROJECT_ID) {
      throw new Error(`Invalid sentry project id: ${project_id}`);
    }

    console.log('body:', body);

    await fetch(`https://${SENTRY_HOST}/api/${project_id}/envelope/`, {
      method: 'POST',
      body,
    });
    return json({ ok: true });
  } catch (e) {
    return json({ error: 'Error tunneling to Sentry.' }, { status: 500 });
  }
}
