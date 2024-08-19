import { Answer } from "@/types/questionForAnswerPage.type";
import Icon from "../Icon/Icon";

interface PaginationProps {
  answers: Answer[];
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
  answersPerPage: number;
}

function Pagination({
  answers,
  currentPage,
  setCurrentPage,
  answersPerPage,
}: PaginationProps) {
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(answers.length / answersPerPage);

  console.log(totalPages);

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}>
        <Icon name="arrow-left-small" width="20" />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => handlePageChange(index + 1)}>
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}>
        <Icon name="arrow-right-small" width="20" />
      </button>
    </div>
  );
}

export default Pagination;

