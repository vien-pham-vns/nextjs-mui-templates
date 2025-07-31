import { authentication, createDirectus, rest } from '@directus/sdk';

const directusClient = createDirectus(process.env.DIRECTUS_URL || 'http://localhost:8055')
    .with(rest())
    .with(authentication('cookie', { credentials: 'include' }));

export default directusClient;
