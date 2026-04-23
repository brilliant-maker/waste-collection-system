import Paginate from "./Paginate.jsx";

export default function WardSchedulesCollectionsFooter({
  currentPage,
  pages,
  hasNext,
  hasPrev,
  setPage,
  nextPage,
  prevPage,
}){
  
  return (
    <>
      <Paginate
        currentPage={currentPage}
        pages={pages}
        hasNext={hasNext}
        hasPrev={hasPrev}
        setPage={setPage}
        nextPage={nextPage}
        prevPage={prevPage}/>
    </>
  )
}
