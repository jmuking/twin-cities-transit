import { Direction, Route, Stop } from "../types/APITypes";
import { RequestParams, SelectType, Option } from "../types/SelectTypes";

export const BASEURL = "https://svc.metrotransit.org/nextripv2";

export async function fetchResults(request: string) {
  const response = await fetch(request);
  return await response.json();
}

export function buildDeparturesRequest(
  route: string,
  direction: string,
  stop: string
) {
  return `${BASEURL}/${route}/${direction}/${stop}`;
}

export function buildRequest(type: SelectType, requestParams?: RequestParams) {
  switch (type) {
    case SelectType.ROUTE:
      return `${BASEURL}/routes`;
    case SelectType.DIRECTION:
      if (requestParams?.route)
        return `${BASEURL}/directions/${requestParams?.route}`;

      break;
    case SelectType.STOP:
      if (requestParams?.direction && requestParams?.route)
        return `${BASEURL}/stops/${requestParams?.route}/${requestParams?.direction}`;

      break;
    default:
      return null;
  }

  return null;
}

export function buildOptions(
  data: any[] /* This data will be mapped to the correct type below */,
  type: SelectType
): Option[] {
  let defaultData = [
    {
      value: "",
      label: "",
    },
  ];

  switch (type) {
    case SelectType.ROUTE:
      return [
        ...defaultData,
        ...data.map((r: Route) => {
          return {
            value: r?.route_id || "",
            label: r.route_label || "",
          };
        }),
      ];
    case SelectType.DIRECTION:
      return [
        ...defaultData,
        ...data.map((d: Direction) => {
          return {
            value: d?.direction_id?.toString() || "",
            label: d?.direction_name || "",
          };
        }),
      ];
    case SelectType.STOP:
      return [
        ...defaultData,
        ...data.map((s: Stop) => {
          return {
            value: s?.place_code || "",
            label: s?.description || "",
          };
        }),
      ];
    default:
      return [...defaultData, ...data];
  }
}

export function compareRequestParams(rp1?: RequestParams, rp2?: RequestParams) {
  return rp1?.route === rp2?.route && rp1?.direction === rp2?.direction;
}

export function convertToDate(time: number) {
  return new Date(time);
}
