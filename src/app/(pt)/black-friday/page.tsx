import { EventHubPage, getEventHubMetadata } from '@/components/sections/EventHubPage';

// /black-friday: a página fixa da Black Friday (content/home-events.json, hub "black-friday").
const HUB = 'black-friday';

export const revalidate = 300;

export function generateMetadata() {
  return getEventHubMetadata(HUB);
}

export default function BlackFridayPage() {
  return <EventHubPage hub={HUB} />;
}
