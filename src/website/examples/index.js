/**
 *  Copyright (c) 2016-present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

//
// Export all of the examples
//

import basic from "./basic/Index";
import timezone from "./timezone/Index";
import duration from "./duration/Index";
import format from "./format/Index";

export default {
    ...basic,
    ...timezone,
    ...duration,
    ...format
};
