import type { Book, BookApi, Review } from "@/lib/types";

const API_URL = "https://openlibrary.org/search.json";

export function createBook(book: BookApi): Book {
  const id = book.key.replace("/works/", "");
  return {
    id,
    title: book.title ?? "",
    author: book.author_name ? book.author_name.join(", ") : "",
    price: 0,
    publisher: book.publisher ? book.publisher[0] : "",
    published: book.first_publish_year ? String(book.first_publish_year) : "",
    image: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "/vercel.svg",
  };
}

export async function getBooksByKeyword(keyword: string): Promise<Book[]> {
  const res = await fetch(
    `${API_URL}?q=${encodeURIComponent(keyword)}&limit=20`,
    { cache: "no-store" },
  );
  const result = await res.json();
  const books = [];
  for (const b of result.docs ?? []) {
    books.push(createBook(b));
  }
  return books;
}

export async function getAllReviews(): Promise<Review[]> {
  const getPrisma = (await import("@/lib/prisma")).default;
  return await getPrisma().reviews.findMany({
    orderBy: {
      read: "desc",
    },
  });
}

export async function getBookById(id: string): Promise<Book> {
  const res = await fetch(
    `${API_URL}?q=key:/works/${id}&limit=1`,
    { cache: "no-store" },
  );
  const result = await res.json();
  const docs = result.docs ?? [];
  if (docs.length === 0) {
    return { id, title: "", author: "", price: 0, publisher: "", published: "", image: "/vercel.svg" };
  }
  return createBook(docs[0]);
}

export async function getReviewById(id: string): Promise<Review | null> {
  const getPrisma = (await import("@/lib/prisma")).default;
  return await getPrisma().reviews.findUnique({
    where: {
      id: id,
    },
  });
}
