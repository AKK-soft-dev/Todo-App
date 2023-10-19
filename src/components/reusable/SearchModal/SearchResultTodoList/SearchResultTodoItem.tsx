import { HiChevronRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { TodoType } from "../../../../redux/features/featureTypes";
import HighlightedText from "../highlightText";

const SearchResultTodoItem = ({
  data: { id, title, description },
  query,
}: {
  data: TodoType;
  query: string;
}) => {
  return (
    <article className="relative flex p-5 space-x-2 bg-default rounded hover:bg-slate-200 duration-200 cursor-pointer">
      <div className="flex-1 relative">
        <h2 className="font-semibold">
          <span className=" truncate w-[50%] block">
            <HighlightedText text={title} queryToHighlight={query} />
          </span>
        </h2>
        <p className="text-black/60 block text-sm font-semibold truncate max-w-[150px] md:max-w-[250px]">
          <HighlightedText text={description} queryToHighlight={query} />
        </p>
        <Link
          to={`/todo/${id}`}
          className="absolute top-0 left-0 right-0 bottom-0"
        ></Link>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-5 flex space-x-1">
        <HiChevronRight />
      </div>
    </article>
  );
};

export default SearchResultTodoItem;
