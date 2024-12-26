import { Query } from "encore.dev/api";

export interface Response {
  status: number;
  message: string;
  data?: any;
}

export interface UrlRequest {
  url: Query<string>;
}
