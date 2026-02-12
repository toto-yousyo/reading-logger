"use server";

import { redirect } from "next/navigation";
import crypto from "crypto";
import getPrisma from "@/lib/prisma";
import { getBookById } from "@/lib/getters";
import { revalidatePath } from "next/cache";

export async function addReview(data: FormData) {
  const id = data.get("id") as string;
  const existing = await getPrisma().reviews.findUnique({ where: { id } });
  const book = await getBookById(id);
  const source = book.title ? book : existing;
  const input = {
    title: source?.title ?? "",
    author: source && "author" in source ? source.author : "",
    price: 0,
    publisher: source && "publisher" in source ? source.publisher : "",
    published: source && "published" in source ? source.published : "",
    image: source && "image" in source ? (source.image || "") : "",
    read: new Date(data.get("read") as string),
    memo: data.get("memo") as string,
  };

  await getPrisma().reviews.upsert({
    update: input,
    create: Object.assign({}, input, { id: data.get("id") as string }),
    where: {
      id: data.get("id") as string,
    },
  });
  revalidatePath("/");
  redirect("/");
}
export async function registerFromWishlist(data: FormData) {
  const title = data.get("title") as string;
  const image = data.get("image") as string;
  const id = crypto.createHash("md5").update(title).digest("hex").slice(0, 12);

  await getPrisma().reviews.upsert({
    where: { id },
    update: {},
    create: {
      id,
      title,
      author: "",
      price: 0,
      publisher: "",
      published: "",
      image: image || "",
      read: new Date(),
      memo: "",
    },
  });
  revalidatePath("/");
  redirect(`/edit/${id}`);
}

export async function removeReview(data: FormData) {
  await getPrisma().reviews.delete({
    where: {
      id: data.get("id") as string,
    },
  });
  revalidatePath("/");
  redirect("/");
}
