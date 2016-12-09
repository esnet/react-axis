const moment = require("moment");
require("moment-timezone");

const begin = moment();
const end = begin.clone().add(7, "days");

const TZ = "Australia/Perth";
const type = "day";

const beginInTimezone = begin.clone().tz(TZ);
const endInTimezone = end.clone().tz(TZ);

var fromd = beginInTimezone.startOf(type).add(1, "type");
var tod = endInTimezone.startOf(type);

console.log("  TZ, from:", fromd.format(), "to:", tod.format());
let d = fromd;
while(d.isBefore(tod)) {
    console.log("   -", d.format(), +d);
    d = d.add("1", type);
}
