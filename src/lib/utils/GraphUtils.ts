// Graph: Year -> Months -> Day: Clicks count
// Example: 2019 -> 1 -> 1: 10 US
//          2019 -> 1 -> 2: 5 US
//          2019 -> 2 -> 1: 3 FR
//          2019 -> 2 -> 2: 1 FR
//          2020 -> 1 -> 1: 2 BE
//          2020 -> 1 -> 2: 1 BE
//          2020 -> 2 -> 1: 1 US
//          2020 -> 2 -> 2: 1 FR

export type GraphData = {
  [year: number]: {
    [month: number]: {
      [day: number]: {
        [clicks: number]: number;
        [country: string]: number;
      }
    }[];
  }[];
};

export let GraphicData: GraphData = {
  2019: [{
      1: [{ 1: { US: 10 } }, { 2: { US: 5 } }]
    }, {
      2: [{ 1: { FR: 3 } }, { 2: { FR: 1 } }]
    }
  ],
  2020: [{
      1: [{ 1: { BE: 2 } }, { 2: { BE: 1 } }]
    }, {
      2: [{ 1: { US: 1 } }, { 2: { FR: 1 } }]
    }
  ]
};