import Image from "next/image";
import Link from "next/link";
import { getAmazonWishlist } from "@/lib/getters";

export default async function WishlistPage() {
  const items = await getAmazonWishlist();

  return (
    <div>
      <h2 className="text-2xl font-light text-indigo-800 mb-4">
        読みたい本リスト
      </h2>
      {items.length === 0 ? (
        <p>ほしい物リストを取得できませんでした。</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="flex gap-4 items-start border-b pb-4">
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={120}
                className="object-contain"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                {item.price && (
                  <p className="text-sm text-gray-600">{item.price}</p>
                )}
                <div className="flex gap-3 mt-2 text-sm">
                  {item.amazonUrl && (
                    <a
                      href={item.amazonUrl}
                      target="_blank"
                      className="text-blue-600 hover:underline"
                    >
                      Amazonで見る
                    </a>
                  )}
                  <Link
                    href={`/books/${encodeURIComponent(item.title)}`}
                    className="text-green-600 hover:underline"
                  >
                    この本を検索
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
