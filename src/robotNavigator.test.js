import robotNavigator from './robotNavigator';

describe('robotNavigator', () => {
    it('should return the final position of the robot', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 1, y: 1, orientation: 'E' }, instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'] },
            lostPositions: [],
        });

        expect(finalPosition).toEqual({ x: 1, y: 1, orientation: 'E' });
    });

    it('should return the final position of the robot', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 1, y: 1, orientation: 'E' }, instructions: ['F', 'F'] },
            lostPositions: [],
        });

        expect(finalPosition).toEqual({ x: 3, y: 1, orientation: 'E' });
    });

    it('should say the robot is lost if it goes off the grid', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 3, y: 2, orientation: 'N' }, instructions: ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L'] },
            lostPositions: [],
        });

        expect(finalPosition).toEqual({ x: 3, y: 3, orientation: 'N', lost: true });
    });

    it('should ignore move command if it will result in a known lost robot', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 3, y: 3, orientation: 'N' }, instructions: ['F'] },
            lostPositions: ['33N'],
        });

        expect(finalPosition).toEqual({ x: 3, y: 3, orientation: 'N' });
    });
});
