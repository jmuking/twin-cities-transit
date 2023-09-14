import {
  buildRequest,
  buildOptions,
  compareRequestParams,
  BASEURL,
} from "./APIUtils";
import { SelectType } from "../types/SelectTypes";
import { Direction, Route, Stop } from "../types/APITypes";

test("Build Request", () => {
  const routeRequest = buildRequest(SelectType.ROUTE);
  expect(routeRequest).toBe(`${BASEURL}/nextrip/routes`);

  const directionRequest = buildRequest(SelectType.DIRECTION, { route: "902" });
  expect(directionRequest).toBe(`${BASEURL}/nextrip/directions/902`);

  const stopRequest = buildRequest(SelectType.STOP, {
    route: "902",
    direction: "0",
  });
  expect(stopRequest).toBe(`${BASEURL}/nextrip/stops/902/0`);
});

test("Build Options", () => {
  const sampleRouteData: Route[] = [
    {
      route_id: "901",
      agency_id: 0,
      route_label: "METRO Blue Line",
    },
    {
      route_id: "902",
      agency_id: 0,
      route_label: "METRO Green Line",
    },
    {
      route_id: "904",
      agency_id: 0,
      route_label: "METRO Orange Line",
    },
  ];

  const routeOptions = buildOptions(sampleRouteData, SelectType.ROUTE);
  expect(routeOptions).toStrictEqual([
    {
      value: "",
      label: "",
    },
    {
      value: "901",
      label: "METRO Blue Line",
    },
    {
      value: "902",
      label: "METRO Green Line",
    },
    {
      value: "904",
      label: "METRO Orange Line",
    },
  ]);

  const sampleDirectionData: Direction[] = [
    {
      direction_id: 0,
      direction_name: "Northbound",
    },
    {
      direction_id: 1,
      direction_name: "Southbound",
    },
  ];

  const directionOptions = buildOptions(
    sampleDirectionData,
    SelectType.DIRECTION
  );
  expect(directionOptions).toStrictEqual([
    {
      value: "",
      label: "",
    },
    {
      value: "0",
      label: "Northbound",
    },
    { value: "1", label: "Southbound" },
  ]);

  const sampleStopData: Stop[] = [
    {
      place_code: "MAAM",
      description: "Mall of America Station",
    },
    {
      place_code: "30AV",
      description: "30th Ave Station",
    },
    {
      place_code: "BLCT",
      description: "Bloomington Central Station",
    },
  ];

  const stopOptions = buildOptions(sampleStopData, SelectType.STOP);
  expect(stopOptions).toStrictEqual([
    {
      value: "",
      label: "",
    },
    {
      value: "MAAM",
      label: "Mall of America Station",
    },
    { value: "30AV", label: "30th Ave Station" },
    { value: "BLCT", label: "Bloomington Central Station" },
  ]);
});

test("Compare Request Params", () => {
  const rp1 = {
    route: "902",
    direction: "0",
  };

  const rp2 = {
    route: "902",
    direction: "0",
  };

  const rp3 = {
    route: "",
  };

  const rp4 = {
    route: "903",
    direction: "0",
  };

  const rp5 = {
    route: "903",
    direction: "1",
  };

  expect(compareRequestParams(rp1, rp2)).toBeTruthy();
  expect(compareRequestParams(rp1, rp3)).toBeFalsy();
  expect(compareRequestParams(rp1, rp4)).toBeFalsy();
  expect(compareRequestParams(rp1, rp5)).toBeFalsy();
});
