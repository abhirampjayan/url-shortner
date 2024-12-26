import { Query } from "encore.dev/api";

export interface Response {
  status: number;
  message: string;
  data?: any;
}

export interface UrlRequest {
  filter: Query<string>;
}
