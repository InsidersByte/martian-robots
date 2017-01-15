/* @flow */

type GridType = {
    x: number,
    y: number,
};

type RobotType = {
    position: {
        x: number,
        y: number,
        orientation: string,
    },
    instructions: string,
}

const parseGrid = (grid: string): GridType => {
    const [rawX, rawY] = grid.split(' ');

    const x = parseInt(rawX, 10);
    const y = parseInt(rawY, 10);

    return { x, y };
};

const parseRobots = (robots: Array<string>): Array<RobotType> => {
    const result = [];

    for (let i = 0; i < robots.length; i += 2) {
        const [rawX, rawY, orientation] = robots[i].split(' ');
        const instructions = robots[i + 1];

        const x = parseInt(rawX, 10);
        const y = parseInt(rawY, 10);

        result.push({ position: { x, y, orientation }, instructions });
    }

    return result;
};

const parse = (instructions: string): { grid: GridType, robots: Array<RobotType> } => {
    if (!instructions) {
        throw new Error('no instructions provided');
    }

    const instructionsArray = instructions.split('\n');

    const [rawGrid, ...rawRobots] = instructionsArray;

    const grid = parseGrid(rawGrid);
    const robots = parseRobots(rawRobots);

    return { grid, robots };
};

export default parse;
