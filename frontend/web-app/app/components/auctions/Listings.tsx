"use client";

import { Auction, PagedResult } from "@/types";
import AuctionCard from "./AuctionCard";
import { Fragment, useState, useEffect } from "react";
import AppPagination from "../extra/AppPagination";
import { getData } from "@/app/actions/auctionActions";
import Filters from "./Filters";
import { useParamsStore } from "@/app/hooks/useParamsStore";
import { useShallow } from "zustand/shallow";
import qs from "query-string";
import EmptyFilter from "../extra/EmptyFilter";

const Listings = () => {
  const [data, setData] = useState<PagedResult<Auction>>();

  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      filterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    }))
  );

  const setParams = useParamsStore((state) => state.setParams);

  const url = qs.stringifyUrl({
    url: "",
    query: params,
  });

  function setPageNumber(pageNumber: number) {
    setParams({ pageNumber });
  }

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) {
    return <h3>Loading...</h3>;
  }

  return (
    <Fragment>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter showReset />
      ) : (
        <Fragment>
          <div className="grid grid-cols-4 gap-6">
            {data.results &&
              data.results.map((auction: Auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
          </div>
          <div className="flex justify-center mt-4">
            <AppPagination
              currentPage={params.pageNumber}
              pageCount={data.pageCount}
              pageChanged={setPageNumber}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Listings;
