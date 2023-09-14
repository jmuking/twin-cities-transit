// Place for API types

export interface Route {
  route_id?: string;
  agency_id: number;
  route_label?: string;
}

export interface Direction {
  direction_id: number;
  direction_name?: string;
}

export interface Stop {
  place_code: string;
  description?: string;
}

export interface Departure {
  actual: boolean;
  departure_text: string;
  departure_time: number;
  description: string;
  direction_id: number;
  direction_text: string;
  route_id: string;
  route_short_name: string;
  schedule_relationship: string;
  stop_id: number;
  trip_id: string;
}
