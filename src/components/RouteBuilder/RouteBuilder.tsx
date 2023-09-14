import React, { useEffect, useState } from "react";
import "./RouteBuilder.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SelectType } from "../../types/SelectTypes";
import TransitSelect from "../RouteSelect/TransitSelect";
import trainGif from "../../images/train.gif";
import { buildDeparturesRequest, fetchResults } from "../../utils/APIUtils";
import { Departure } from "../../types/APITypes";

function RouteBuilder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [selectedDirection, setSelectedDirection] = useState<string>("");
  const [selectedStop, setSelectedStop] = useState<string>("");

  const [departures, setDepartures] = useState<Departure[]>([]);

  function selectChanged(value: string, type: SelectType) {
    setDepartures([]);

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
    async function fetchDepartures() {
      const request = buildDeparturesRequest(
        selectedRoute,
        selectedDirection,
        selectedStop
      );

      const data = await fetchResults(request);
      if (data?.departures) setDepartures(data.departures);
    }

    const route = searchParams.get("route");
    if (!route) setSelectedRoute("");
    else if (route !== selectedRoute) setSelectedRoute(route);

    const direction = searchParams.get("direction");
    if (!direction) setSelectedDirection("");
    else if (direction !== selectedDirection) setSelectedDirection(direction);

    const stop = searchParams.get("stop");
    if (!stop) setSelectedStop("");
    else if (stop !== selectedStop) setSelectedStop(stop);
    else if (selectedRoute && selectedDirection && selectedStop) {
      fetchDepartures().catch(console.error);
    }
  }, [searchParams, selectedDirection, selectedRoute, selectedStop]);

  useEffect(() => {
    console.log(departures);
  }, [departures]);

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
      {departures.length > 0 && (
        <div className="departures-container">
          <ul>
            <li className="departure-item header">
              <p>Time to Depart</p>
              <p>Where</p>
            </li>
            {departures?.map((departure) => {
              return (
                <li className="departure-item">
                  <p>{departure.departure_text}</p>
                  <p>{departure.description}</p>
                </li>
              );
            })}
          </ul>
          <img src={trainGif} alt="train-gif" />
        </div>
      )}
    </>
  );
}

export default RouteBuilder;
