import type { Book, BookApi, Review } from "@/lib/types";

const API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export function createBook(book: BookApi): Book {
  const authors = book.volumeInfo?.authors;
  const price = book.saleInfo?.listPrice;
  const img = book.volumeInfo?.imageLinks;
  return {
    id: book.id,
    title: book.volumeInfo?.title ?? "",
    author: authors ? authors.join(",") : "",
    price: price ? price.amount : 0,
    publisher: book.volumeInfo?.publisher ?? "",
    published: book.volumeInfo?.publishedDate ?? "",
    image: img?.smallThumbnail ?? "/vercel.svg",
  };
}

export async function getBooksByKeyword(keyword: string): Promise<Book[]> {
  const res = await fetch(
    `${API_URL}?q=${keyword}&langRestrict=ja&maxResults=20&printType=books&key=${API_KEY}`,
    { cache: "no-store" },
  );
  const result = await res.json();
  const books = [];
  for (const b of result.items ?? []) {
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
  const res = await fetch(`${API_URL}/${id}?key=${API_KEY}`, { cache: "no-store" });
  const result = await res.json();
  return createBook(result);
}

export async function getReviewById(id: string): Promise<Review | null> {
  const getPrisma = (await import("@/lib/prisma")).default;
  return await getPrisma().reviews.findUnique({
    where: {
      id: id,
    },
  });
}
