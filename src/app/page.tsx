import { getAllReviews } from "@/lib/getters";
import LinkedBookDetails from "@/components/LinkedBookDetails";

export default async function Home() {
  "use cache";
  const reviews = await getAllReviews();
  return reviews.map((b, i) => (
    <LinkedBookDetails book={b} index={i + 1} key={b.id} />
  ));
}
