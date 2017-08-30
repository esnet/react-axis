/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React from "react";
import moment from "moment";

import TimeAxis from "../../../components/TimeAxis";

const format = React.createClass({
    renderAxis() {
        const rowStyle = {
            border: 1,
            borderStyle: "solid",
            borderRadius: 5,
            borderColor: "#DDD",
            padding: 2,
            margin: 5
        };

        return (
            <div className="row">

                <div className="col-md-2">
                    Year
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        format="year"
                        standalone={true}
                        position="bottom"
                        beginTime={new Date("October 13, 2012")}
                        endTime={new Date("October 17, 2017")}
                        width={800}
                        height={50} />
                </div>

                <div className="col-md-2">
                    Month
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        format="month"
                        standalone={true}
                        position="bottom"
                        beginTime={new Date("October 13, 2014")}
                        endTime={new Date("October 17, 2015")}
                        width={800}
                        height={50} />
                </div>

                <div className="col-md-2">
                    Day
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        format="day"
                        standalone={true}
                        position="bottom"
                        beginTime={new Date("August 29, 2017")}
                        endTime={new Date("September 5, 2017")}
                        width={800}
                        height={50} />
                </div>

                <div className="col-md-2">
                    Hour
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        format="hour"
                        standalone={true}
                        position="bottom"
                        beginTime={new Date("October 13, 2014 11:00:00")}
                        endTime={new Date("October 13, 2014 23:00:00")}
                        width={800}
                        height={50} />
                </div>

                <div className="col-md-2">
                    Decade
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        format="decade"
                        standalone={true}
                        position="bottom"
                        beginTime={new Date("October 13, 1957")}
                        endTime={new Date("October 14, 2007")}
                        width={800}
                        height={50} />
                </div>

                <div className="col-md-2">
                    Custom Function
                </div>
                <div className="col-md-10" style={rowStyle}>
                    <TimeAxis
                        format= {(d) => ({
                            label: moment(d).format("MMM `YY"),
                            size: 15,
                            labelAlign: "adjacent"
                        })}
                        standalone={true}
                        position="bottom"
                        beginTime={new Date("October 13, 2014")}
                        endTime={new Date("October 13, 2015")}
                        width={800}
                        height={50} />
                </div>
            </div>
        );
    },

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        {this.renderAxis()}
                    </div>
                </div>
            </div>
        );
    }
});

// Export example
import format_docs from "./format_docs.md";
export default {format, format_docs};
