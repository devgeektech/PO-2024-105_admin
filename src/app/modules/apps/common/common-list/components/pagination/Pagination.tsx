import { FC } from "react";
import ReactPaginate from "react-paginate";
import "./style.scss";
import { useDispatch } from "react-redux";
import { setSelectedPage } from "../../../../../../../redux/features/shared/sharedSlice";

const Pagination : FC<any>= ({totalRecord,handleClick}) => {
  const limit = 10
  const dispatch: any = useDispatch();
  const handlePaginationClick = (e: any) => {
    const selectedPage:any = ++e.selected;
    dispatch(setSelectedPage(selectedPage))
    handleClick(selectedPage);
  };

  return (
    <div className="mt-5 justify-content-end d-flex">
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel={"..."}
        pageCount={Math.ceil(totalRecord / limit)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={handlePaginationClick}
        containerClassName={"pagination justify-content-end flex-wrap"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export { Pagination };
