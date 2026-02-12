import Image from "next/image";
import Link from "next/link";
import { getWishlistFromDB } from "@/lib/getters";
import { registerFromWishlist } from "@/lib/actions";

export default async function WishlistPage() {
  const items = await getWishlistFromDB();

  return (
    <div>
      <h2 className="text-2xl font-light text-indigo-800 mb-4">
        読みたい本リスト
      </h2>
      {items.length === 0 ? (
        <p>データがありません。ローカルで同期を実行してください。</p>
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
                <div className="flex flex-col gap-4">
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
                  <form action={registerFromWishlist}>
                    <input type="hidden" name="title" value={item.title} />
                    <input type="hidden" name="image" value={item.image} />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white rounded px-4 py-2 mr-2 hover:bg-blue-500"
                    >
                      登録
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
