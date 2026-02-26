import { fetchHomeVisitList } from "../api/modules/homeVisit";

export async function getHomeVisitList(pageNum = 1, pageSize = 10) {
  const response = await fetchHomeVisitList({ pageNum, pageSize });
  return response.list;
}
