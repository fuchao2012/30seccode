import * as Utils from './utils';
import {expect} from 'chai';

describe('utils', () => {
    it('多个函数返回效率最高的一个', () => {
        const fn1 = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, '10'].every(el => typeof el === 'number');
        const fn2 = () => [1, '2', 3, 4, 5, 6, 7, 8, 9, 10].every(el => typeof el === 'number');
        expect(Utils.mostPerformance([fn1, fn2],10)).to.equal(1)
    });
});
