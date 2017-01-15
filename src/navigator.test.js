import navigator from './navigator';

describe('navigator', () => {
    it('should parse the instructions and return the robot final positions', () => {
        expect(navigator(`5 3
1 1 E
RFRFRFRF`))
            .toEqual([{ x: 1, y: 1, orientation: 'E' }]);
    });

    it('should return lost robots', () => {
        expect(navigator(`5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL`))
            .toEqual([{ x: 1, y: 1, orientation: 'E' }, { x: 3, y: 3, orientation: 'N', lost: true }]);
    });

    it('should remember the scent of lost robots', () => {
        expect(navigator(`5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`))
            .toEqual([
                { x: 1, y: 1, orientation: 'E' },
                { x: 3, y: 3, orientation: 'N', lost: true },
                { x: 2, y: 3, orientation: 'S' },
            ]);
    });
});
