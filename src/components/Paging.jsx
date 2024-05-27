import React from "react";
import styled from "styled-components";
import Pagination from "react-js-pagination";

const PagingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .pagination {
    display: flex;
    align-items: center;
  }
  .pagination li {
    display: none; 
  }
  .pagination li.active, 
  .pagination li:first-child,
  .pagination li:last-child {
    display: inline;
    margin: 0 5px; 
  }
  .pagination li a {
    color: black;
    padding: 8px 12px;
    text-decoration: none;
    border: 1px solid #ddd;
    margin: 0 4px;
  }

`;

const Paging = ({
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  pageRangeDisplayed,
  onChange
}) => {
  return (
    <PagingContainer>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={pageRangeDisplayed}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={onChange}
        hideFirstLastPages
      />
    </PagingContainer>
  );
};

export default Paging;