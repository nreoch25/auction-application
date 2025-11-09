"use server";

import { Auction, PagedResult } from "@/types";
import { getSession } from "./authActions";

export async function getData(query: string): Promise<PagedResult<Auction>> {
  const res = await fetch(`http://localhost:6001/search${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function updateAuctionTest() {
  try {
    const data = {
      mileage: Math.floor(Math.random() * 100000) + 1,
    };

    const session = await getSession();

    if (!session) {
      return {
        status: 401,
        message: "Unauthorized - No session found",
        debug: "Session is null",
      };
    }

    if (!session.accessToken) {
      return {
        status: 401,
        message: "Unauthorized - No access token in session",
        debug: `Session keys: ${Object.keys(session).join(", ")}`,
      };
    }

    const url = `http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    };

    const res = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    });

    const responseText = await res.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    if (!res.ok) {
      return {
        status: res.status,
        message: res.statusText,
        debug: `Request made to ${url}`,
        response: responseData,
      };
    }

    return {
      status: res.status,
      message: res.statusText,
      debug: `Request successful to ${url}`,
      response: responseData,
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
