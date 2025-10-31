export interface Ingredient {
    id: string;
    name: string;
    unit: string | null;
    description?: string;
    value: number;
}

export interface Sugar extends Ingredient {
    name: "Sugar";
    unit: "g";
    id: "sugar";
}

export interface Fruit extends Ingredient {
    name: "Fruit";
    sugarPercentage: number;
    unit: "g";
    id: "fruit";
}

export interface Yeast extends Ingredient {
    name: "Yeast";
    strain: string | null;
    unit: "g";
    id: "yeast";
}

export interface Other extends Ingredient {
    name: "Other";
    description: string;
    unit: string | null;
    id: "other";
}

export interface Measurement {
    id: string;
    name: string;
    unit: string | null;
    value: number;
}

export interface DensityMeasurement extends Measurement {
    name: "Density";
    unit: "g/L";
    id: "density";
}

export interface TemperatureMeasurement extends Measurement {
    name: "Temperature";
    unit: "°C";
    id: "temperature";
}

export interface PHMeasurement extends Measurement {
    name: "PH";
    unit: "pH";
    id: "ph";
}

export interface LogEntry {
    id: string;
    batchId: string;
    date: string;
    notes: string;
    ingredients: Ingredient[];
    measurements: Measurement[];
}

export interface InitialLogEntry extends LogEntry {
    ingredients: [Sugar, Fruit, Yeast, ...Ingredient[]];
}

export interface Batch {
    id: string;
    name: string;
    description: string;
    image: string;
    archived: boolean;
    abv: number;
    volume: number;
    rating: number;
    initialVolume: number;
    logEntries: [InitialLogEntry, ...LogEntry[]];
  }