import * as cheerio from "cheerio";
import type { Book, BookApi, Review, Task, WishlistItem } from "@/lib/types";

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

const WISHLIST_URL = "https://www.amazon.jp/hz/wishlist/ls/1HGK6C5A6Q1LY";

export async function getAmazonWishlist(): Promise<WishlistItem[]> {
  const res = await fetch(WISHLIST_URL, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Accept-Language": "ja-JP,ja;q=0.9",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("Failed to fetch wishlist:", res.status);
    return [];
  }

  const html = await res.text();
  const $ = cheerio.load(html);
  const items: WishlistItem[] = [];

  $("li[data-id]").each((_, el) => {
    const $el = $(el);
    const title =
      $el.find("a[id^='itemName_']").text().trim() ||
      $el.find("h2 a, h3 a").first().text().trim();
    if (!title) return;

    const linkHref =
      $el.find("a[id^='itemName_']").attr("href") ||
      $el.find("h2 a, h3 a").first().attr("href") ||
      "";
    const amazonUrl = linkHref.startsWith("http")
      ? linkHref
      : linkHref
        ? `https://www.amazon.jp${linkHref}`
        : "";

    const image =
      $el.find("img").first().attr("src") || "/vercel.svg";

    const price =
      $el.find("span[id^='itemPrice_']").text().trim() ||
      $el.find(".a-price .a-offscreen").first().text().trim() ||
      undefined;

    items.push({ title, image, amazonUrl, price });
  });

  return items;
}

export async function getWishlistFromDB(): Promise<WishlistItem[]> {
  const getPrisma = (await import("@/lib/prisma")).default;
  return await getPrisma().wishlist_items.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getReviewById(id: string): Promise<Review | null> {
  const getPrisma = (await import("@/lib/prisma")).default;
  return await getPrisma().reviews.findUnique({
    where: {
      id: id,
    },
  });
}

export async function getAllTasks(): Promise<Task[]> {
  const getPrisma = (await import("@/lib/prisma")).default;
  return await getPrisma().tasks.findMany({
    orderBy: [
      { createdAt: "desc" },
    ],
  });
}

export async function getTaskById(id: string): Promise<Task | null> {
  const getPrisma = (await import("@/lib/prisma")).default;
  return await getPrisma().tasks.findUnique({
    where: { id },
  });
}
