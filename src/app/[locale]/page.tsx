import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { Container } from "@/components/ui";

// Placeholder — the homepage agent replaces this file.
export default function HomePage() {
  return (
    <section className="relative overflow-hidden py-24">
      <PineapplePattern preset="hero" />
      <Container className="relative grid place-items-center">
        <CircleBadge size={220} />
      </Container>
    </section>
  );
}
