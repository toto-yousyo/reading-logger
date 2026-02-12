import BookDetails from "@/components/BookDetails";
import FormEdit from "@/components/FormEdit";
import { getBookById, getReviewById } from "@/lib/getters";
import type { EditPageProps } from "@/lib/types";

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const review = await getReviewById(id);
  const apiBook = await getBookById(id);
  const book = apiBook.title
    ? apiBook
    : review
      ? { id: review.id, title: review.title, author: review.author, price: review.price, publisher: review.publisher, published: review.published, image: review.image }
      : apiBook;

  const read = (review?.read || new Date()).toLocaleDateString("sv-SE");

  return (
    <div id="form">
      <BookDetails book={book} />
      <hr />
      <FormEdit src={{ id: book.id, read, memo: review?.memo }} />
    </div>
  );
}
