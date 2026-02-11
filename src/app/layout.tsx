import Link from "next/link";
import { Inconsolata } from "next/font/google";
import type { Metadata } from "next";
import type { LayoutProps } from "@/lib/types";
import "./globals.css";

const fnt = Inconsolata({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reading Recorder",
  description: "自分が読んだ書籍の記録を残すためのアプリ",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="ja">
      <body className={fnt.className}>
        <h1 className="text-4xl text-indigo-800 font-light my-2 ml-6">
          Reading Recorder
        </h1>
        <nav>
          <ul className="flex bg-blue-600 mb-4 pl-2">
            <li className="block px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <Link className="no-underline text-blue-300" href="/">
                HOME
              </Link>
            </li>
            <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <Link className="no-underline text-blue-300" href="/books">
                Serach
              </Link>
            </li>
            <li className="block text-blue-300 px-4 py-2 my-1 hover:bg-gray-100 rounded">
              <Link className="no-underline text-blue-300" href="/wishlist">
                Amazon
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex gap-lg">
          <div>task</div>
          <div className="ml-2">{children}</div>
        </div>
      </body>
    </html>
  );
}
