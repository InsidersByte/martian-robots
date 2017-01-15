import robotNavigator from './robotNavigator';

describe('robotNavigator', () => {
    it('should return the final position of the robot', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 1, y: 1, orientation: 'E' }, instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'] },
        });

        expect(finalPosition).toEqual({ x: 1, y: 1, orientation: 'E' });
    });

    it('should return the final position of the robot', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 1, y: 1, orientation: 'E' }, instructions: ['F', 'F'] },
        });

        expect(finalPosition).toEqual({ x: 3, y: 1, orientation: 'E' });
    });
});
