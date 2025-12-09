// apps/web/src/app/[slug]/page.tsx
import { notFound } from 'next/navigation';

type Props = {
  params: { slug: string };
};

export default function UnknownSlugPage(_props: Props) {
  // Semua path /apa-pun di lamman.app akan dilempar ke 404
  notFound();
}
