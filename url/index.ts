import { api } from "encore.dev/api";
import { UrlRequest, Response } from "./type";

const url = api<UrlRequest, Response>(
  {
    method: "POST",
    path: "/url",
    expose: true,
  },
  async ({ filter }) => {
    return {
      status: 200,
      message: "Success",
    };
  }
);
