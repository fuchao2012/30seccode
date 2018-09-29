/**
 * 将数据映射为数组
 * @param value
 * @example
 * castArray('foo'); // ['foo']
 * castArray([1]); // [1]
 */
export const castArray = (value: any): any[] => (Array.isArray(value) ? value : [value]);

/**
 * 深克隆一个新的正则表达式
 * @param regExp
 * @example
 * const regExp = /lorem ipsum/gi;
 * const regExp2 = cloneRegExp(regExp); // /lorem ipsum/gi
 */
export const cloneRegExp = (regExp: RegExp): RegExp => new RegExp(regExp.source, regExp.flags);

/**
 * 将3位的八进制转为6位的八进制
 * @param hex
 * @example
 * extendHex('#03f'); // '#0033ff'
 * extendHex('05a'); // '#0055aa'
 */
export const extendHex = (hex: string): string => '#' + hex
    .slice(hex.startsWith('#') ? 1 : 0)
    .split('')
    .map(c => c + c)
    .join('');

/**
 * 获取URL参数
 * @param url
 * params = new URLSearchParams(location.search) // URLSearchParams can use as map
 * params.forEach((v,k)=>console.log(k,v))
 */
export const getURLParameters = (url: string): any => (url.match(/([^?=&]+)(=(^&)*)/g) || [])
    .reduce(
        (acc, cur) => ((acc[cur.slice(0, cur.indexOf('='))] = cur.slice(cur.indexOf('=') + 1)), acc)
        , <string>{}
    );

/**
 * 将八进制转为RGBa表达方式
 * @param hex
 * @example
 * hexToRGB('#27ae60ff'); // 'rgba(39, 174, 96, 255)'
 * hexToRGB('27ae60'); // 'rgb(39, 174, 96)'
 * hexToRGB('#fff'); // 'rgb(255, 255, 255)'
 */
export const hexToRGB = (hex: string): string => {
    let alpha = hex.length > 6;
    let formattedHex = parseInt(hex.length === 3
        ? hex.slice(hex.startsWith('#') ? 1 : 0).split('').map(c => c + c).join('')
        : hex
        , 16);
    return `rgb${alpha ? 'a' : ''}(${formattedHex >>> (alpha ? 24 : 16)},\
     ${(formattedHex & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)},\
     ${((formattedHex & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0))}\
     ${alpha ? (', ' + (formattedHex & 0x000000ff)) : ''})`;
};

/**
 * 多个函数哪个效率最高
 * @param fns
 * @param iterations
 */
export const mostPerformance = (fns: any[], iterations = 10000) => {
    const times = fns.map(fn => {
        const before = new Date().getTime();
        while (iterations--) fn();
        return new Date().getTime() - before;
    });
    return times.indexOf(Math.min(...times))
};


export const isPromise = (obj: any): boolean => obj !== null
    && (typeof obj === 'object' || typeof obj === 'function')
    && typeof obj.then === 'function'