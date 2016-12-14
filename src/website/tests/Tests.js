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
import Tick from "../../components/Tick";
import Tick1 from "../../test_components/Tick1";

const NUM_TESTS = 10;

const svgBorder = {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#f3f3f3"
};

export default React.createClass({
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>Tick tests</h2>
                    
                    {[...Array(NUM_TESTS)].map((_ ,i) => (
                        <div key={i}>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        {`Tick test ${i}`}
                                    </td>
                                    <td style={{paddingLeft: 20}}>
                                        <svg style={svgBorder} height="40px">
                                            <Tick1 test={i}/>
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
            </div>
        );
    }
});
