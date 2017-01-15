/* @flow */

import { GRID_ORIGIN_X, GRID_ORIGIN_Y, ORIENTATION_NORTH, ORIENTATION_EAST, ORIENTATION_SOUTH, ORIENTATION_WEST } from './constants';
import type { GridType, RobotType, InstructionType, PositionType, OrientationType, FinalPositionType } from './types';

type NavigateRobotParamsType = {
    grid: GridType,
    robot: RobotType,
    lostPositions: Array<string>,
};

type MoveParamsType = {
    position: PositionType,
    instruction: InstructionType,
    lostPositions: Array<string>,
};

const turnLeft = (position: PositionType): OrientationType => {
    const { orientation } = position;

    switch (orientation) {
        case ORIENTATION_NORTH:
            return ORIENTATION_WEST;
        case ORIENTATION_EAST:
            return ORIENTATION_NORTH;
        case ORIENTATION_SOUTH:
            return ORIENTATION_EAST;
        case ORIENTATION_WEST:
            return ORIENTATION_SOUTH;
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

const moveForward = (position: PositionType, lostPositions: Array<string>) => {
    const { x, y, orientation } = position;

    if (lostPositions.includes(`${x}${y}${orientation}`)) {
        return position;
    }

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

const move = ({ position, instruction, lostPositions }: MoveParamsType): PositionType => {
    switch (instruction) {
        case 'L':
            return Object.assign({}, position, { orientation: turnLeft(position) });
        case 'R':
            return Object.assign({}, position, { orientation: turnRight(position) });
        case 'F':
            return Object.assign({}, position, moveForward(position, lostPositions));
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

const navigateRobot = ({ grid, robot, lostPositions }: NavigateRobotParamsType): FinalPositionType => {
    const { x, y } = grid;
    const { position, instructions } = robot;

    let finalPosition = Object.assign({}, position);

    for (const instruction of instructions) {
        const updatedPosition = move({ position: finalPosition, instruction, lostPositions });
        const lost = isLost({ x, y, position: updatedPosition });

        if (lost) {
            return Object.assign({}, finalPosition, { lost });
        }

        finalPosition = updatedPosition;
    }

    return finalPosition;
};

export default navigateRobot;
