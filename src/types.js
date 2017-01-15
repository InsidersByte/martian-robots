/* @flow */

export type GridType = {
    x: number,
    y: number,
};

export type OrientationType = string;

export type PositionType = {
    x: number,
    y: number,
    orientation: OrientationType,
};

export type InstructionType = string;

export type RobotType = {
    position: PositionType,
    instructions: Array<InstructionType>,
}
