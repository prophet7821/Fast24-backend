export type Filter = {
  term: string;
  modelType: string[];
  driveType: string[];
  stockSpecs: string[];
  price: {
    min: number;
    max: number;
  };
  speed: {
    min: number;
    max: number;
  };
  handling: {
    min: number;
    max: number;
  };
  acceleration: {
    min: number;
    max: number;
  };
  launch: {
    min: number;
    max: number;
  };
  braking: {
    min: number;
    max: number;
  };
  offroad: {
    min: number;
    max: number;
  };
  [key: string]: any;
};
