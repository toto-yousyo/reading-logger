import BookDetails from "@/components/BookDetails";
import FormEdit from "@/components/FormEdit";
import { getBookById, getReviewById } from "@/lib/getters";
import type { EditPageProps } from "@/lib/types";

export default async function EditPage({ params }: EditPageProps) {
  const { id } = await params;
  const book = await getBookById(id);
  const review = await getReviewById(id);

  const read = (review?.read || new Date()).toLocaleDateString("sv-SE");

  return (
    <div id="form">
      <BookDetails book={book} />
      <hr />
      <FormEdit src={{ id: book.id, read, memo: review?.memo }} />
    </div>
  );
}
