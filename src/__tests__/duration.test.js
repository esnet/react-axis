import formatter from '../formatters/duration-format.js';
import moment from "moment";

it('has moment durations available and functional', () => {
    const d = moment.duration(2, 'days');
    const human = d.humanize();
    expect(human).toEqual("2 days");
});

it('can format a duration', () => {
    const d = moment.duration(123, "minutes");
    const fmt = formatter();
    expect(fmt(d).label).toEqual("2:03");
});

