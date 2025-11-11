"use server";

import { Auction, PagedResult } from "@/types";
import { fetchWrapper } from "../lib/fetchWrapper";
import { FieldValues } from "react-hook-form";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  return fetchWrapper.get(`search${query}`);
}

export async function updateAuctionTest() {
  try {
    const data = {
      mileage: Math.floor(Math.random() * 100000) + 1,
    };

    const result = await fetchWrapper.put(
      "auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
      data
    );

    // fetchWrapper.handleResponse returns either data or error object
    if (result && typeof result === "object" && "status" in result) {
      // It's an error response
      return {
        status: result.status,
        message: result.message,
        debug: "Request made via fetchWrapper",
        response: result,
      };
    }

    // It's a successful response
    return {
      status: 200,
      message: "Success",
      debug: "Request successful via fetchWrapper",
      response: result,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error",
      debug: `Error type: ${
        error instanceof Error ? error.constructor.name : typeof error
      }`,
      error: error instanceof Error ? error.stack : String(error),
    };
  }
}

export async function createAuction(data: FieldValues) {
  return await fetchWrapper.post("auctions", data);
}

export async function getDetailedViewData(id: string): Promise<Auction> {
  return await fetchWrapper.get(`auctions/${id}`);
}

export async function updateAuction(data: FieldValues, id: string) {
  return await fetchWrapper.put(`auctions/${id}`, data);
}

export async function deleteAuction(id: string) {
  return await fetchWrapper.del(`auctions/${id}`);
}
