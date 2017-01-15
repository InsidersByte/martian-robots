/* @flow */

import instructionsParser from './instructionsParser';
import robotNavigator from './robotNavigator';
import type { FinalPositionType } from './types';

const navigate = (instructions: string): Array<FinalPositionType> => {
    const { grid, robots } = instructionsParser(instructions);

    return robots.map(robot => robotNavigator({ grid, robot }));
};

export default navigate;
