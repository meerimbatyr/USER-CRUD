import { Pagination } from "react-bootstrap";

function Pagination1({
  itemPerPage,
  totalUsers,
  maxPages,
  currentPage,
  setCurrentPage,
  pagination,
}) {
  const maxPageNumberVisible = 5;

  const nextPage = () => {
    if (currentPage < maxPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const arrayOfPages = [];
  for (let i = 1; i <= Math.ceil(totalUsers / itemPerPage); i++) {
    arrayOfPages.push(
      <Pagination.Item
        key={`key-${i}`}
        active={i === currentPage}
        onClick={() => pagination(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Pagination>
        <Pagination.First
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          disabled={currentPage === 1}
          onClick={() => prevPage()}
        />

        {arrayOfPages}

        <Pagination.Next
          disabled={currentPage === maxPages}
          onClick={() => nextPage()}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(maxPages)}
          disabled={currentPage === maxPages}
        />
      </Pagination>
    </>
  );
}

export default Pagination1;
