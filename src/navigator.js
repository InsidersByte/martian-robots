/* @flow */

import instructionsParser from './instructionsParser';
import robotNavigator from './robotNavigator';

const navigate = (instructions: string) => {
    const { robots } = instructionsParser(instructions);

    return robots.map(robot => robotNavigator({ robot }));
};

export default navigate;
