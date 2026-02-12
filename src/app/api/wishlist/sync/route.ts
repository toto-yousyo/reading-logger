import { NextResponse } from "next/server";
import { getAmazonWishlist } from "@/lib/getters";
import getPrisma from "@/lib/prisma";

export async function POST() {
  const items = await getAmazonWishlist();

  if (items.length === 0) {
    return NextResponse.json(
      { error: "スクレイピング結果が0件でした" },
      { status: 400 },
    );
  }

  const prisma = getPrisma();

  await prisma.wishlist_items.deleteMany();
  await prisma.wishlist_items.createMany({
    data: items.map((item) => ({
      title: item.title,
      image: item.image,
      amazonUrl: item.amazonUrl,
      price: item.price ?? null,
    })),
  });

  return NextResponse.json({ synced: items.length });
}
