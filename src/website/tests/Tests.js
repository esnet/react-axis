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
import TickTest from "../../test_components/Tick";

const svgStyle = {
    background: "#f3f3f3",
    margin: 10
};

export default React.createClass({
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>Tick - Bottom</h2>
                    
                    {[0, 1, 2, 3, 4].map((_ ,i) => (
                        <div key={i}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        {`Tick test ${i}`}
                                    </td>
                                    <td style={{paddingLeft: 20}}>
                                        <svg style={svgStyle} height="40px">
                                            <TickTest test={i}/>
                                        </svg>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <hr />
                        </div>
                    ))}
                    <hr />
                </div>
                <div className="col-md-12">
                    <h2>Tick - Top</h2>
                    
                    {[5, 6, 7, 8, 9].map(i => (
                        <div key={i}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        {`Tick test ${i}`}
                                    </td>
                                    <td style={{paddingLeft: 20}}>
                                        <svg style={svgStyle} height="40px">
                                            <TickTest test={i}/>
                                        </svg>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <hr />
                        </div>
                    ))}
                    <hr />
                </div>

                <div className="col-md-12">
                    <h2>Tick - Left</h2>
                    
                    <table>
                        <tbody>
                        <tr>
                            {[10, 11].map(i => (
                                <td key={i}>
                                    <svg style={svgStyle} height="100px" width="40px">
                                        <TickTest test={i}/>
                                    </svg>
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>

                </div>

                <div className="col-md-12">
                    <h2>Tick - Right</h2>
                    
                    <table>
                        <tbody>
                        <tr>
                            {[12, 13].map(i => (
                                <td key={i}>
                                    <svg style={svgStyle} height="100px" width="40px">
                                        <TickTest test={i}/>
                                    </svg>
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }
});
