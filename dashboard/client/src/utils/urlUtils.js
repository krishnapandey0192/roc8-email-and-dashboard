import dayjs from "dayjs";

export const parseUrlParams = (searchParams) => {
  if (!searchParams.has("startDate")) return null;

  return {
    startDate: dayjs(searchParams.get("startDate")),
    endDate: dayjs(searchParams.get("endDate")),
    ageRange: searchParams.get("ageRange"),
    gender: searchParams.get("gender"),
  };
};
