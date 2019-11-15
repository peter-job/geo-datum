const proj = require("proj4");
const geodist = require("geodist");
const { AGD66toWGS84, GDA94toWGS84, ANGtoWGS84 } = require("./data/test.js");

const date = new Date();
const epoch =
  Math.round(100 * (date.getFullYear() + date.getDay() / 365)) / 100;
console.log(`\nepoch: ${epoch}`);

/*https://d28rz98at9flks.cloudfront.net/71433/71433.pdf*/
const driftRate = [
  -0.00466,
  0.00355,
  0.01124,
  0.000249,
  0.0017454,
  0.0014868,
  0.001224
];

const addDrift = (driftRate, params) =>
  driftRate
    .map((d, i) => (d * (epoch - 2000) + params[i]).toFixed(3))
    .toString();

let AGD66params = [-117.808, -51.536, 137.784, 0.303, 0.446, 0.234, -0.29];
let GDA94params = [0, 0, 0, 0, 0, 0, 0];
const ANGparams = [9940, -5396, 7101, -131.8, 63.9, -95, 2084.7];

proj.defs(
  "AGD66",
  `+proj=longlat +ellps=aust_SA +towgs84=${addDrift(
    driftRate,
    AGD66params
  )} +no_defs +datum=none`
);

proj.defs(
  "GDA94",
  `+proj=longlat +ellps=GRS80 +towgs84=${addDrift(
    driftRate,
    GDA94params
  )} +no_defs +datum=none`
);

proj.defs(
  "ANG",
  `+proj=tmerc +x_0=4915813.467 +y_0=400000 +ellps=clrk58 +towgs84=${addDrift(
    driftRate,
    ANGparams
  )} +no_defs +units=yards`
);

const getAccuracy = (from, to, original, expected) => {
  let actual = proj(from, to, original);
  const longSign = actual[0] > expected[0] ? 1 : -1;
  const latSign = actual[1] > expected[1] ? 1 : -1;
  return {
    total: geodist(
      { lon: actual[0], lat: actual[1] },
      { lon: expected[0], lat: expected[1] },
      { exact: true, unit: "meters" }
    ),
    lat:
      latSign *
      geodist(
        { lon: actual[0], lat: actual[1] },
        { lon: actual[0], lat: expected[1] },
        { exact: true, unit: "meters" }
      ),
    lon:
      longSign *
      geodist(
        { lon: actual[0], lat: actual[1] },
        { lon: expected[0], lat: actual[1] },
        { exact: true, unit: "meters" }
      )
  };
};

const test = (from, to, cases) => {
  console.log(`\nTesting ${from} to ${to}:\n`);
  cases.forEach(test => {
    const accuracy =
      from !== "WGS84"
        ? getAccuracy(from, to, test.original, test.expected)
        : getAccuracy(from, to, test.expected, test.original);
    console.log(
      ` *${test.name.padStart(9, " ")}: ${accuracy.total.toFixed(2)}m,` +
        ` lat: ${accuracy.lat.toFixed(2)}m, lon: ${accuracy.lon.toFixed(2)}m`
    );
  });
  console.log();
};

test("AGD66", "WGS84", AGD66toWGS84);
test("GDA94", "WGS84", GDA94toWGS84);
test("WGS84", "AGD66", AGD66toWGS84);
test("WGS84", "GDA94", GDA94toWGS84);
