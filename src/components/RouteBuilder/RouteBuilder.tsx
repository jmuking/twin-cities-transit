import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SelectType } from "../../types/SelectTypes";
import TransitSelect from "../RouteSelect/TransitSelect";

function RouteBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedDirection, setSelectedDirection] = useState<string>("");
  const [selectedStop, setSelectedStop] = useState<string>("");

  function selectChanged(value: string, type: SelectType) {
    let route = searchParams.get("route") || "";
    let direction = searchParams.get("direction") || "";
    let stop = searchParams.get("stop") || "";

    switch (type) {
      case SelectType.ROUTE:
        route = value;
        direction = "";
        stop = "";
        break;
      case SelectType.DIRECTION:
        direction = value;
        stop = "";
        break;
      case SelectType.STOP:
        stop = value;
        break;
      default:
        route = "";
        direction = "";
        stop = "";
        break;
    }

    const queryParams = [];
    if (route) queryParams.push(`route=${route}`);
    if (direction) queryParams.push(`direction=${direction}`);
    if (stop) queryParams.push(`stop=${stop}`);

    navigate(`?${queryParams.join("&")}`);
  }

  useEffect(() => {
    const route = searchParams.get("route");
    if (!route) setSelectedRoute("");
    else if (route !== selectedRoute) setSelectedRoute(route);

    const direction = searchParams.get("direction");
    if (!direction) setSelectedDirection("");
    else if (direction !== selectedDirection) setSelectedDirection(direction);

    const stop = searchParams.get("stop");
    if (!stop) setSelectedStop("");
    else if (stop !== selectedStop) setSelectedStop(stop);
  }, [searchParams, selectedDirection, selectedRoute, selectedStop]);

  return (
    <>
      <TransitSelect
        type={SelectType.ROUTE}
        selected={selectedRoute}
        selectChanged={(route) => selectChanged(route, SelectType.ROUTE)}
      />
      {selectedRoute && (
        <TransitSelect
          type={SelectType.DIRECTION}
          selected={selectedDirection}
          requestParams={{
            route: selectedRoute,
          }}
          selectChanged={(direction) => {
            selectChanged(direction, SelectType.DIRECTION);
          }}
        />
      )}
      {selectedRoute && selectedDirection && (
        <TransitSelect
          type={SelectType.STOP}
          selected={selectedStop}
          requestParams={{ route: selectedRoute, direction: selectedDirection }}
          selectChanged={(stop) => {
            selectChanged(stop, SelectType.STOP);
          }}
        />
      )}
    </>
  );
}

export default RouteBuilder;
