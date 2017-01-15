import navigator from './navigator';

describe('navigator', () => {
    it('should parse the instructions return the robot final positions', () => {
        expect(navigator(`5 3
1 1 E
FF`))
            .toEqual([{ x: 3, y: 1, orientation: 'E' }]);
    });
});
