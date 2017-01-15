import instructionsParser from './instructionsParser';

describe('instructionsParser', () => {
    it('should error if there were no instructions provided', () => {
        expect(() => instructionsParser('')).toThrowError('no instructions provided');
    });

    it('should return grid size and robots', () => {
        expect(instructionsParser(`5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`))
            .toEqual({
                grid: { x: 5, y: 3 },
                robots: [
                    { position: { x: 1, y: 1, orientation: 'E' }, instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'] },
                    { position: { x: 3, y: 2, orientation: 'N' }, instructions: ['F', 'R', 'R', 'F', 'L', 'L', 'F', 'F', 'R', 'R', 'F', 'L', 'L'] },
                    { position: { x: 0, y: 3, orientation: 'W' }, instructions: ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L'] },
                ],
            });
    });
});
