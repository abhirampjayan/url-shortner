import { api, APIError } from "encore.dev/api";
import { UrlRequest, Response } from "./type";
import { randomBytes } from "node:crypto";
import { SQLDatabase } from "encore.dev/storage/sqldb";

const db = new SQLDatabase("url", { migrations: "./migrations" });

export const url = api<UrlRequest, Response>(
  {
    method: "POST",
    path: "/url",
    expose: true,
  },
  async ({ url }) => {
    const id = randomBytes(6).toString("base64url");
    await db.exec`
        INSERT INTO url (id, original_url)
        VALUES (${id}, ${url})
    `;
    return {
      status: 200,
      message: "Success",
      data: { id, url },
    };
  }
);

export const get = api<{ id: string }, Response>(
  {
    method: "GET",
    path: "/url/:id",
    expose: true,
  },
  async ({ id }: { id: string }): Promise<Response> => {
    const row = await db.queryRow`
        SELECT original_url FROM url WHERE id = ${id}
    `;
    if (!row) throw APIError.notFound("url not found");
    return {
      status: 200,
      message: "Success",
      data: { id, url: row.original_url },
    };
  }
);

interface URL {
  id: string;
  url: string;
}

interface ListResponse {
  urls: URL[];
}

export const list = api(
  { expose: false, method: "GET", path: "/url" },
  async (): Promise<ListResponse> => {
    const rows = db.query`
          SELECT id, original_url
          FROM url
      `;
    const urls: URL[] = [];
    for await (const row of rows) {
      urls.push({ id: row.id, url: row.original_url });
    }
    return { urls };
  }
);
