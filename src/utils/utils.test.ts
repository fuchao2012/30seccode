import * as Utils from './utils';
import {expect} from 'chai';

describe('utils', () => {
    it('将八进制转为RGBa表达方式', ()=>{
        expect(Utils.hexToRGB('#27ae60ff')).to.equal('rgba(39,174,96,255)')
    })
});
