import { httpRequest } from "../../utils/http";
import type { HomeVisitRecord } from "../../types/domain";

export interface HomeVisitListQuery {
  pageNum?: number;
  pageSize?: number;
  keyword?: string;
}

export interface HomeVisitListResponse {
  list: HomeVisitRecord[];
  total: number;
}

export function fetchHomeVisitList(params: HomeVisitListQuery) {
  return httpRequest<HomeVisitListResponse, HomeVisitListQuery>({
    url: "/home-visits",
    method: "GET",
    data: params
  });
}
