import { Batch } from "./models";

export const batches: Batch[] = [
  {
    id: "1",
    name: "Grape Wine",
    description:
      "Grape Wine is a type of wine made from grapes. It is a dry wine with a fruity aroma and a slight sweetness.",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    archived: false,
    abv: 12,
    volume: 100,
    initialVolume: 100,
    rating: 4.5,
    logEntries: [
      {
        id: "1",
        batchId: "1",
        date: "2025-01-01",
        notes: "Initial log entry",
        ingredients: [
          { id: "sugar", name: "Sugar", unit: "g", value: 100 },
          {
            id: "fruit",
            name: "Fruit",
            sugarPercentage: 15,
            unit: "g",
            value: 100,
          },
          {
            id: "yeast",
            name: "Yeast",
            strain: "EC-1118",
            unit: "g",
            value: 100,
          },
        ],
        measurements: [
          { id: "density", name: "Density", unit: "g/L", value: 100 },
          { id: "temperature", name: "Temperature", unit: "°C", value: 100 },
          { id: "ph", name: "PH", unit: "pH", value: 100 },
        ],
      },
      {
        id: "2",
        batchId: "1",
        date: "2025-01-02",
        notes: "Second log entry",
        ingredients: [],
        measurements: [],
      },
    ],
  },
  {
    id: "2",
    name: "Skogsbär",
    description:
      "Skogsbär is a type of wine made from skogsbär. It is a dry wine with a fruity aroma and a slight sweetness.Skogsbär is a type of wine made from skogsbär. It is a dry wine with a fruity aroma and a slight sweetness.",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    archived: false,
    abv: 12,
    volume: 100,
    rating: 3.8,
    initialVolume: 100,
    logEntries: [
      {
        id: "3",
        batchId: "2",
        date: "2025-01-03",
        notes: "Initial log entry for Skogsbär",
        ingredients: [
          { id: "sugar", name: "Sugar", unit: "g", value: 100 },
          {
            id: "fruit",
            name: "Fruit",
            sugarPercentage: 12,
            unit: "g",
            value: 100,
          },
          { id: "yeast", name: "Yeast", strain: "D47", unit: "g", value: 100 },
        ],
        measurements: [
          { id: "density", name: "Density", unit: "g/L", value: 100 },
          { id: "temperature", name: "Temperature", unit: "°C", value: 100 },
          { id: "ph", name: "PH", unit: "pH", value: 100 },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Cranberry Wine",
    description:
      "Cranberry Wine is a type of wine made from cranberries. It is a dry wine with a fruity aroma and a slight sweetness.",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    archived: true,
    abv: 12,
    volume: 100,
    rating: 4.2,
    initialVolume: 100,
    logEntries: [
      {
        id: "4",
        batchId: "3",
        date: "2025-01-04",
        notes: "Initial log entry for Cranberry Wine",
        ingredients: [
          { id: "sugar", name: "Sugar", unit: "g", value: 100 },
          {
            id: "fruit",
            name: "Fruit",
            sugarPercentage: 18,
            unit: "g",
            value: 100,
          },
          { id: "yeast", name: "Yeast", strain: "71B", unit: "g", value: 100 },
        ],
        measurements: [
          { id: "density", name: "Density", unit: "g/L", value: 100 },
          { id: "temperature", name: "Temperature", unit: "°C", value: 100 },
          { id: "ph", name: "PH", unit: "pH", value: 100 },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Mead",
    description:
      "Mead is a type of wine made from honey. It is a sweet wine with a fruity aroma and a slight sweetness.",
    image:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    archived: true,
    abv: 12,
    volume: 100,
    rating: 4.7,
    initialVolume: 100,
    logEntries: [
      {
        id: "5",
        batchId: "4",
        date: "2025-01-05",
        notes: "Initial log entry for Mead",
        ingredients: [
          { id: "sugar", name: "Sugar", unit: "g", value: 100 },
          {
            id: "fruit",
            name: "Fruit",
            sugarPercentage: 0,
            unit: "g",
            value: 100,
          },
          { id: "yeast", name: "Yeast", strain: "D47", unit: "g", value: 100 },
          {
            id: "other",
            name: "Other",
            description: "Honey",
            unit: "g",
            value: 100,
          },
        ],
        measurements: [
          { id: "density", name: "Density", unit: "g/L", value: 100 },
          { id: "temperature", name: "Temperature", unit: "°C", value: 100 },
          { id: "ph", name: "PH", unit: "pH", value: 100 },
        ],
      },
    ],
  },
];
