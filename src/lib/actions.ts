"use server";

import { redirect } from "next/navigation";
import getPrisma from "@/lib/prisma";
import { getBookById } from "@/lib/getters";
import { revalidatePath } from "next/cache";

export async function addReview(data: FormData) {
  const book = await getBookById(data.get("id") as string);
  const input = {
    title: book.title,
    author: book.author,
    price: 0,
    publisher: book.publisher,
    published: book.published,
    image: book.image || "",
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
export async function removeReview(data: FormData) {
  await getPrisma().reviews.delete({
    where: {
      id: data.get("id") as string,
    },
  });
  revalidatePath("/");
  redirect("/");
}
