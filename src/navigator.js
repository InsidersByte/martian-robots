/* @flow */

import instructionsParser from './instructionsParser';
import robotNavigator from './robotNavigator';
import type { FinalPositionType } from './types';

const navigate = (instructions: string): Array<FinalPositionType> => {
    const { grid, robots } = instructionsParser(instructions);

    const finalPositions = [];
    const lostPositions = [];

    for (const robot of robots) {
        const finalPosition = robotNavigator({ grid, robot, lostPositions });

        if (finalPosition.lost) {
            lostPositions.push(`${finalPosition.x}${finalPosition.y}${finalPosition.orientation}`);
        }

        finalPositions.push(finalPosition);
    }

    return finalPositions;
};

export default navigate;
