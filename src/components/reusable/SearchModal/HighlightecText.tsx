const HighlightedText = ({
  text,
  queryToHighlight,
}: {
  text: string;
  queryToHighlight: string;
}) => {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${queryToHighlight})`, "gi"));
  return (
    <span>
      {" "}
      {parts.map((part, i) => (
        <span
          key={i}
          className={
            part.toLowerCase() === queryToHighlight.toLowerCase()
              ? "font-bold text-red-300"
              : ""
          }
        >
          {part}
        </span>
      ))}{" "}
    </span>
  );
};

export default HighlightedText;
