/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

const moment = require("moment");
import _ from "underscore";
import React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import { scaleTime } from "d3-scale";
require("moment-timezone");

import Tick from "./Tick";
import durationFormatter from "./formatters/duration-format";
import timeFormatter from "./formatters/time-format";
import "./Axis.css";

const durationSecond = 1000;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;
const durationDecade = durationYear * 10;

const majors = {
    "second": "minute",
    "minute": "hour",
    "hour": "day",
    "day": "month",
    "week": "month",
    "month": "year",
    "year": "year"
};

const tickIntervals = [
    [      durationSecond, "second",  1],
    [  5 * durationSecond, "second",  5],
    [ 15 * durationSecond, "second", 15],
    [ 30 * durationSecond, "second", 30],
    [      durationMinute, "minute",  1],
    [  5 * durationMinute, "minute",  5],
    [ 15 * durationMinute, "minute", 15],
    [ 30 * durationMinute, "minute", 30],
    [      durationHour  ,   "hour",  1],
    [  3 * durationHour  ,   "hour",  3],
    [  6 * durationHour  ,   "hour",  6],
    [ 12 * durationHour  ,   "hour", 12],
    [      durationDay   ,    "day",  1],
    [  2 * durationDay   ,    "day",  2],
    [  3 * durationDay   ,    "day",  3],
    [  4 * durationDay   ,    "day",  4],
    [  5 * durationDay   ,    "day",  5],
    [      durationWeek  ,   "week",  1],
    [      durationMonth ,  "month",  1],
    [  3 * durationMonth ,  "month",  3],
    [      durationYear  ,   "year",  1],
    [      durationDecade,   "year",  10]
];

/**
 * A TimeAxis component rendered into SVG. The component can be aligned using the
 * `position` prop to the top or bottom.
 *
 * Scaling of the axis is done with the `beginTime` and `endTime` props. These
 * are Javascript Date objects.
 *
 * Overall size of the SVG component is done with `width` and `height`.
 *
 * The `TimeAxis` has support for rendering in any timezone using the `timezone`
 * props. It defaults to local time.
 *
 * For example:
 * ```
 *  <TimeAxis
 *      beginTime={beginTime}
 *      endTime={endTime}
 *      timezone="America/Chicago"
 *      position="bottom"
 *      width={800}
 *      height={50}
 *  />
 * ```
 *
 * The format of the axis labels has an appropiate default. However, you
 * can use the `format` props to gain additional control, either with
 * some built in formats or by supplying a function.
 *
 */
export default React.createClass({

    displayName: "TimeAxis",

    getDefaultProps() {
        return {
            width: 100,
            height: 100,
            tickCount: 10,
            tickMajor: 20,
            tickMinor: 14,
            tickExtend: 0,
            margin: 10,
            standalone: false,
            labelPosition: 50,
            labelStyle: {
                fill: "grey",
                stroke: "none",
                pointerEvents: "none"
            },
            absolute: false,
        };
    },

    propTypes: {

        align: React.PropTypes.oneOf(["center", "left"]),

        /**
         * The title of the axis to render.
         */
        label: React.PropTypes.string,

        /**
         * The width of the rectangle to render into.
         */
        width: React.PropTypes.number,

        /**
         * The height of the rectangle to render into.
         */
        height: React.PropTypes.number,

        /**
         * The format for the tick labels.
         *
         * The default it to compute this automatically. You can also specify this
         * as a string or function.
         *
         * Six special options exist, specified as a string: setting format to:
         *  * "second",
         *  * "hour"
         *  * "day"
         *  * "month"
         *  * "year"
         *
         * will show only ticks on those, and every one of those intervals.
         *
         * For example maybe you are showing a bar chart for October 2014 then setting
         * the format to "day" will insure that a label is placed for each and every day,
         * all 31 of them. Be careful though, it's easy to add too many labels this way.
         *
         * The last string option is:
         *  * "duration".
         *
         * This interprets the time as a duration. This is good for data that is
         * specified relative to its start time, rather than as an actual date/time.
         *
         * Finally, format can also be a function. The function will be passed the date
         * it is rendering. It expects the return result to be a an object describing
         * the resulting tick. For example:
         *
         * ```js
         *     format = (d) => ({
         *         label: moment(d).format(h:mm a),
         *         size: 15,
         *         labelAlign: "adjacent"
         *     });
         * ```
         */
        format: React.PropTypes.oneOfType([
            React.PropTypes.oneOf([
                "second",
                "minute",
                "hour",
                "day",
                "month",
                "year",
                "decade",
                "duration"
            ]),
            React.PropTypes.func
        ]),

        /**
         * The size of each minor tick mark.
         */
        tickMinor: React.PropTypes.number,

        /**
         * The size of each major tick mark.
         */
        tickMajor: React.PropTypes.number,

        /**
         * Extend the tick marks away from the tick label
         * by this amount. This can be used to provide a grid
         * line for each tick.
         */
        tickExtend: React.PropTypes.number,
    },

    renderAxisLabel() {
        const { width, height, position, labelPosition, labelStyle } = this.props;
        let translate;
        let rotate = `rotate(0)`;
        let anchor = "start";
        switch (position) {
            case "left":
                translate = `translate(${width - labelPosition},5)`;
                rotate = `rotate(-90)`;
                anchor = "end";
                break;
            case "right":
                translate = `translate(${labelPosition},5)`;
                rotate = `rotate(-90)`;
                anchor = "end";
                break;
            case "top":
                translate = `translate(5, ${height - labelPosition})`;
                break;
            case "bottom":
                translate = `translate(5, ${labelPosition})`;
                break;
            default:
                //pass
        }
        return (
            <g transform={translate}>
                <text
                    transform={rotate}
                    textAnchor={anchor}
                    style={labelStyle}>
                    {this.props.label}
                </text>
            </g>
        );
    },
 
    renderAxisLine() {
        const p = this.props.position;
        return (
            <line
                key="axis"
                className="axis"
                style={{stroke: "#AAA", strokeWidth: 2}}
                x1={this.props.margin}
                y1={p === "bottom" ? 0 : this.props.height}
                x2={this.props.width - this.props.margin}
                y2={p === "bottom" ? 0 : this.props.height} />
        );
    },

    renderAxisTicks() {
        let formatter = this.props.format;
        let timezone = this.props.timezone;

        // A duration format is relative to UTC for the purposes
        // of tick alignment
        const formatAsDuration = (this.props.format === "duration");
        if (formatAsDuration) {
            timezone = "Etc/UTC";
        }

        const interval = 5; //this.props.interval

        const scale = scaleTime()
            .domain([this.props.beginTime, this.props.endTime])
            .range([this.props.margin, this.props.width - this.props.margin * 2]);
        
        const start = +this.props.beginTime;
        const stop = +this.props.endTime;
        const target = Math.abs(stop - start) / interval;

        // Determine the time unit of the spacing of ticks,
        // either because it's explicitly defined as the format
        // (day, month, year, etc), or using our tickInterval
        // lookup
        let type, num;
        if (_.isString(formatter) && !(formatter == "duration" || formatter == "decade")){
            type = formatter;
            num = 1;
        } else {
            for (const [d, t, n] of tickIntervals) {
                if (target < d) break;
                type = t;
                num = n;
            }
        }

        // Formatter will be a function (date) => string, or
        // a string format type. In the case of the string type
        // that might be "duration", or "minutes", "day", etc.
        if (typeof this.props.format === 'function') {
            formatter = this.props.format;
        } else if (formatAsDuration) {
            formatter = durationFormatter();
        } else {
            formatter = timeFormatter(type, timezone);
        }
        
        const starttz = timezone ? moment(start).tz(timezone) : moment(start); // begin time
        const stoptz = timezone ? moment(stop).tz(timezone) : moment(stop); // end time

        // We want to align our minor ticks to our major ones.
        // For instance if we are showing 3 hour minor ticks then we
        // want to them to be 12am, 3am, etc (not 11pm, 2am, etc)
        let startd;
        let stopd;
        if (this.props.format === "decade") {
            // sets start and stop closest to the nearest 100
            // example : 1981 would set to 1980, 2009 would set to 2010
            startd = starttz.set('year', Math.floor(starttz.year()/10)*10);
            stopd = stoptz.set('year', Math.ceil(stoptz.year()/10)*10);
        } else {
            startd = starttz.startOf(majors[type]).add(num, "type");
            stopd = stoptz.endOf(type);
        }

        let i = 0;
        let d = startd;
        let ticks = [];
        while (d.isBefore(stopd)) {
            const date = d.toDate();
            const pos = scale(date);
            const { label, size, labelAlign } = formatter(date);
            if (d >= start && d < stop) {
                ticks.push(
                    <Tick
                        key={+d}
                        id={i}
                        align={this.props.position}
                        label={label}
                        size={size}
                        position={pos}
                        extend={this.props.tickExtend}
                        labelAlign={labelAlign}
                        width={this.props.width}
                        height={this.props.height} />
                );
            }
            d = d.add(num, type);
            i++;
        }
        return ticks;
    },

    renderAxis() {
        return (
            <g>
                {this.renderAxisLine()}
                <ReactCSSTransitionGroup
                    component="g"
                    transitionName="ticks"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                    {this.renderAxisTicks()}
                </ReactCSSTransitionGroup>
                {this.renderAxisLabel()}
            </g>
        );
    },

    render() {
        if (this.props.standalone) {
            return (
                <svg height={this.props.height} width={this.props.width} style={{shapeRendering: "crispEdges"}}>
                    {this.renderAxis()}
                </svg>
            );
        } else {
            return this.renderAxis()
        }
    }
});
