import robotNavigator from './robotNavigator';

describe('robotNavigator', () => {
    it('should error if there is an invalid orientation when turning left', () => {
        expect(() => robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 1, y: 1, orientation: 'Z' }, instructions: ['L'] },
            lostPositions: [],
        }))
            .toThrowError('Orientation \'Z\' is not supported');
    });

    it('should error if there is an invalid orientation when turning right', () => {
        expect(() => robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 1, y: 1, orientation: 'Z' }, instructions: ['R'] },
            lostPositions: [],
        }))
            .toThrowError('Orientation \'Z\' is not supported');
    });

    it('should error if there is an invalid orientation when moving forward', () => {
        expect(() => robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 1, y: 1, orientation: 'Z' }, instructions: ['F'] },
            lostPositions: [],
        }))
            .toThrowError('Orientation \'Z\' is not supported');
    });

    it('should error if there is an invalid instruction', () => {
        expect(() => robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 1, y: 1, orientation: 'E' }, instructions: ['Z'] },
            lostPositions: [],
        }))
            .toThrowError('Instruction \'Z\' is not supported');
    });

    it('should return the final position of the robot', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 1, y: 1, orientation: 'E' }, instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'] },
            lostPositions: [],
        });

        expect(finalPosition).toEqual({ x: 1, y: 1, orientation: 'E' });
    });

    it('should say the robot is lost if it goes below 0 on the x axis', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 0, y: 0, orientation: 'W' }, instructions: ['F'] },
            lostPositions: [],
        });

        expect(finalPosition).toEqual({ x: 0, y: 0, orientation: 'W', lost: true });
    });

    it('should say the robot is lost if it goes outside of the grid on the x axis', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 5, y: 0, orientation: 'E' }, instructions: ['F'] },
            lostPositions: [],
        });

        expect(finalPosition).toEqual({ x: 5, y: 0, orientation: 'E', lost: true });
    });

    it('should say the robot is lost if it goes below 0 on the y axis', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 0, y: 0, orientation: 'S' }, instructions: ['F'] },
            lostPositions: [],
        });

        expect(finalPosition).toEqual({ x: 0, y: 0, orientation: 'S', lost: true });
    });

    it('should say the robot is lost if it goes outside of the grid on the y axis', () => {
        const finalPosition = robotNavigator({
            grid: { x: 5, y: 3 },
            robot: { position: { x: 0, y: 3, orientation: 'N' }, instructions: ['F'] },
            lostPositions: [],
        });

        expect(finalPosition).toEqual({ x: 0, y: 3, orientation: 'N', lost: true });
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
