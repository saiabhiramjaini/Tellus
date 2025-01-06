// app/embed/[code]/page.tsx
import TestimonialWidget from '@/components/TestimonialWidget';

export default function EmbedPage({ params }: { params: { code: string } }) {
  return <TestimonialWidget code={params.code} />;
}