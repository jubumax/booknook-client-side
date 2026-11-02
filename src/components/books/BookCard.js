import Link from "next/link";
import BookCover from "./BookCover";


export default function BookCard({ book }) {

    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-base-300 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            
            <div className="aspect-[4/5] overflow-hidden bg-base-200">
                <BookCover
                    src={book.image}
                    alt={`Cover of ${book.title}`}
                    className="size-full transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <div className="flex flex-1 flex-col p-5">
                <span className="badge badge-soft badge-primary">{book.category}</span>

                <h3 className="mt-3 line-clamp-2 min-h-14 text-lg font-bold leading-7">
                    {book.title}
                </h3>

                <p className="mt-1 truncate text-sm text-base-content/70">
                    by {book.author}
                </p>

                <div className="mt-auto pt-5">
                    <Link
                        href={`/books/${book._id}`}
                        className="btn btn-primary btn-block rounded-full"
                    >
                        View Details
                    </Link>
                </div>
                
            </div>
            
        </article>
    );
}