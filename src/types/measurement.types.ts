export interface IMeasurementUnits {
  g: string;
  kg: string;
  ml: string;
  tbs: string;
  tsp: string;
  unit: string;
  Liter: string;
  pinch: string;
  sprigs: string;
}

// Любой язык может присутствовать, но если есть — он должен соответствовать IMeasurementUnits
export interface IMeasurements {
  [lang: string]: IMeasurementUnits;
}


// export interface IMeasurementDataDynamic {
//   [langCode: string]: IMeasurementUnits;
// }