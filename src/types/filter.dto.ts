export type filterDTO = {
  term: string;
  modelType: string;
  driveType: string;
  stockSpecs: string;
  price: {
    min: string;
    max: string;
  };
  speed: {
    min: string;
    max: string;
  };
  handling: {
    min: string;
    max: string;
  };
  acceleration: {
    min: string;
    max: string;
  };
  launch: {
    min: string;
    max: string;
  };
  braking: {
    min: string;
    max: string;
  };
  offroad: {
    min: string;
    max: string;
  };
};
