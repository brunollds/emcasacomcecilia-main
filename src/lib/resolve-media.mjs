import mappings from './generated/media-delivery-map.json' with { type: 'json' };
import { createMediaResolver } from './media-delivery.mjs';

// Only explicitly activated, independently verified assets are delivered remotely.
export const resolveMediaUrl = createMediaResolver(mappings);
