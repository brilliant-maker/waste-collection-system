import Div from "./Div.jsx";
import Button from "./Button.jsx";
import Span from "./Span.jsx";
import "../styles/Paginate.css";

export default function Paginate({
  currentPage,
  pages,
  hasNext,
  hasPrev,
  setPage,
  nextPage,
  prevPage,
}) {
  if (!pages || pages.length <= 1) return null;

  return (
    <Div className="paginate">
      <Button
        className="button paginate-button paginate-prev"
        onClick={prevPage}
        disabled={!hasPrev}>
        Prev
      </Button>
      
      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <Span
              key={index}
              className="paginate-ellipsis">
              ...
            </Span>
          );
        }
      const isActive = page === currentPage;
      
      return (
        <Button
          key={page}
          onClick={() => setPage(page)}
          disabled={isActive}
          className={`button paginate-button ${
          isActive ? "paginate-button-active" : ""
        }`}>
          {page}
        </Button>);
      })}
      
      <Button
        className="button paginate-button paginate-next"
        onClick={nextPage}
        disabled={!hasNext}>
        Next
      </Button>
    </Div>
  );
}
