/* @flow */

import { GRID_ORIGIN_X, GRID_ORIGIN_Y } from './constants';
import type { GridType, RobotType, InstructionType, PositionType, OrientationType, FinalPositionType } from './types';

const ORIENTATION_NORTH = 'N';
const ORIENTATION_EAST = 'E';
const ORIENTATION_SOUTH = 'S';
const ORIENTATION_WEST = 'W';

const turnLeft = (position: PositionType): OrientationType => {
    const { orientation } = position;

    switch (orientation) {
        case ORIENTATION_NORTH:
            return ORIENTATION_EAST;
        case ORIENTATION_EAST:
            return ORIENTATION_SOUTH;
        case ORIENTATION_SOUTH:
            return ORIENTATION_WEST;
        case ORIENTATION_WEST:
            return ORIENTATION_NORTH;
        default:
            throw new Error(`Orientation '${orientation} is not supported`);
    }
};

const turnRight = (position: PositionType): OrientationType => {
    const { orientation } = position;

    switch (orientation) {
        case ORIENTATION_NORTH:
            return ORIENTATION_EAST;
        case ORIENTATION_EAST:
            return ORIENTATION_SOUTH;
        case ORIENTATION_SOUTH:
            return ORIENTATION_WEST;
        case ORIENTATION_WEST:
            return ORIENTATION_NORTH;
        default:
            throw new Error(`Orientation '${orientation} is not supported`);
    }
};

const moveForward = (position: PositionType) => {
    const { x, y, orientation } = position;

    switch (orientation) {
        case ORIENTATION_NORTH:
            return { x, y: y + 1 };
        case ORIENTATION_EAST:
            return { x: x + 1, y };
        case ORIENTATION_SOUTH:
            return { x, y: y - 1 };
        case ORIENTATION_WEST:
            return { x: x - 1, y };
        default:
            throw new Error(`Orientation '${orientation} is not supported`);
    }
};

const move = ({ position, instruction }: { position: PositionType, instruction: InstructionType }): PositionType => {
    switch (instruction) {
        case 'L':
            return Object.assign({}, position, { orientation: turnLeft(position) });
        case 'R':
            return Object.assign({}, position, { orientation: turnRight(position) });
        case 'F':
            return Object.assign({}, position, moveForward(position));
        default:
            throw new Error(`Instruction '${instruction}' is not supported`);
    }
};

const isLost = ({ x, y, position }: { x: number, y: number, position: PositionType }): boolean => {
    if (position.x < GRID_ORIGIN_X) {
        return true;
    }

    if (position.x > x) {
        return true;
    }

    if (position.y < GRID_ORIGIN_Y) {
        return true;
    }

    if (position.y > y) {
        return true;
    }

    return false;
};

const navigateRobot = ({ grid, robot }: { grid: GridType, robot: RobotType }): FinalPositionType => {
    const { x, y } = grid;
    const { position, instructions } = robot;

    let finalPosition = Object.assign({}, position);

    for (const instruction of instructions) {
        const updatedPosition = move({ position: finalPosition, instruction });
        const lost = isLost({ x, y, position: updatedPosition });

        if (lost) {
            return Object.assign({}, finalPosition, { lost });
        }

        finalPosition = updatedPosition;
    }

    return finalPosition;
};

export default navigateRobot;
