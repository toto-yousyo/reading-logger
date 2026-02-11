import type { ReactNode } from "react";

export type BookApi = {
  key: string;
  title: string;
  author_name?: string[];
  publisher?: string[];
  first_publish_year?: number;
  cover_i?: number;
};

export type Review = Book & {
  read: Date;
  memo: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  publisher: string;
  published: string;
  image: string;
};

export type LayoutProps = Readonly<{
  children: ReactNode;
}>;

export type BookResultProps = Readonly<{
  params: Promise<{
    keyword?: string[];
  }>;
}>;

export type EditPageProps = Readonly<{
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    key?: string;
  }>;
}>;

export type FormEditProps = Readonly<{
  src: {
    id: string;
    read: string;
    memo?: string;
  };
}>;

export type BookDetailsProps = Readonly<{
  index?: number;
  book: Book;
}>;

export type WishlistItem = {
  title: string;
  image: string;
  amazonUrl: string;
  price?: string;
};
