import LinkedBookDetails from "@/components/LinkedBookDetails";
import { getBooksByKeyword } from "@/lib/getters";
import type { BookResultProps } from "@/lib/types";

export default async function BookResult({ params }: BookResultProps) {
  const { keyword = ["React"] } = await params;
  const books = await getBooksByKeyword(keyword[0]);

  if (books.length === 0) {
    return <p>検索結果がありません（キーワード: {keyword[0]}）</p>;
  }

  return books.map((b, i) => (
    <LinkedBookDetails book={b} index={i + 1} key={b.id} />
  ));
}
