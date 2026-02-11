import LinkedBookDetails from "@/components/LinkedBookDetails";
import { getBooksByKeyword } from "@/lib/getters";
import type { BookResultProps } from "@/lib/types";

export default async function BookResult({ params }: BookResultProps) {
  const { keyword = ["React"] } = await params;
  let books;
  let debug = "";
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${keyword[0]}&langRestrict=ja&maxResults=20&printType=books`,
      { cache: "no-store" },
    );
    debug = `status: ${res.status}, `;
    const result = await res.json();
    debug += `totalItems: ${result.totalItems}, items: ${result.items?.length ?? 0}, error: ${JSON.stringify(result.error ?? null)}`;
    books = await getBooksByKeyword(keyword[0]);
  } catch (e) {
    return <p>エラーが発生しました: {String(e)}</p>;
  }

  if (books.length === 0) {
    return <p>検索結果がありません（キーワード: {keyword[0]}）<br/>DEBUG: {debug}</p>;
  }

  return books.map((b, i) => (
    <LinkedBookDetails book={b} index={i + 1} key={b.id} />
  ));
}
