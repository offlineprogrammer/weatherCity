interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
}
interface Prediction {
  description: string;
  predictions: string;
  place_id: string;
  types: string[];
  structured_formatting: StructuredFormatting;
}

export interface PlacesResponse {
  status: string;
  predictions: Prediction[]
}