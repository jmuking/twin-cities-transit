import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import "./TransitSelect.scss";
import {
  TransitSelectParams,
  Option,
  RequestParams,
  SelectType,
} from "../../types/SelectTypes";
import {
  buildOptions,
  buildRequest,
  compareRequestParams,
} from "../../utils/APIUtils";

function TransitSelect({
  type,
  requestParams,
  selected,
  selectChanged,
}: TransitSelectParams) {
  const [options, setOptions] = useState<Option[]>([]);
  const [lastRequestParams, setLastRequestParams] = useState<RequestParams>();

  function change(event: BaseSyntheticEvent) {
    const value = event.target?.value;
    const option = options.find((option: Option) => {
      return option.value === value;
    });

    if (selectChanged && option) selectChanged(option.value);
  }

  useEffect(() => {
    async function fetchData() {
      const request = buildRequest(type, requestParams);

      if (request) {
        const response = await fetch(request);
        const data = await response.json();

        const _options = buildOptions(data, type);
        setOptions(_options);
        setLastRequestParams(requestParams);
      }
    }

    if (
      (type === SelectType.ROUTE && options.length === 0) ||
      !compareRequestParams(requestParams, lastRequestParams)
    )
      fetchData().catch(console.error);
  }, [lastRequestParams, options.length, requestParams, type]);

  return (
    <div className="select-container">
      <label htmlFor={`transit-select-${type}`} className="select-label">
        Select a {type}
      </label>
      <select
        id={`transit-select-${type}`}
        className="select"
        value={selected}
        onChange={change}
      >
        {options.map((option: any) => {
          return (
            <option
              key={`${option.label}-${option.value}`}
              value={option.value}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default TransitSelect;
