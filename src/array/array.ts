type Filter = (...args: any[]) => any;
/**
 * @name 数组所有内容都满足
 * @param array
 * @param predicate
 * @extends Array.every
 * @example all([4, 2, 3], x => x > 1); // true
 */
export const All = (array: any[], predicate: Filter = Boolean): boolean => {
    return array.every(predicate)
};
/**
 * @name 数组只要有一个满足
 * @param array
 * @param predicate
 * @extends Array.some
 * @example any([0, 1, 2, 0], x => x >= 2); // true
 */
export const Any = (array: any[], predicate: Filter = Boolean): boolean => {
    return array.some(predicate);
};
/**
 * @name 数组所有值都相等
 * @param array
 * @extends Array.every
 * @example allEqual([1, 2, 3, 4, 5, 6]); // false
 */
export const AllEqual = (array: any[]): boolean => {
    return array
        .every(val => val === array[0])
};
/**
 * @name 二维数组转CSV
 * @param array
 * @param separator
 * @extends Array.map
 * @example arrayToCSV([['a', 'b'], ['c', 'd']]); // '"a","b"\n"c","d"'
 */
export const ArrayToCSV = (array: any[][], separator?: string): string => {
    return array
        .map(row => row
            .map(item => `"${item}"`)
            .join(separator))
        .join('\n')
};
/**
 * @name 将数组按照真假分为两类
 * @param array
 * @param filter
 * @extends Array.reduce
 * @example bifurcate(['beep', 'boop', 'foo', 'bar'], [true, true, false, true]);
 * // [ ['beep', 'boop', 'bar'], ['foo'] ]
 */
export const Bifurcate = (array: any[], filter: boolean[]): any[][] => {
    return array
        .reduce(
            (acc, cur, idx) => (acc[filter[idx] ? 0 : 1].push(cur), acc),
            [[], []])
};
/**
 * @name 将数组按照过滤器所指定分为两类
 * @param array
 * @param filter(value, index):boolean 过滤器函数接受两个参数，
 * @extends Array.reduce
 * @example bifurcateBy(['beep', 'boop', 'foo', 'bar'], x => x[0] === 'b');
 * // [ ['beep', 'boop', 'bar'], ['foo'] ]
 */
export const BifurcateBy = (array: any[], filter: Filter): any[][] => {
    return array.reduce(
        (acc, cur) => ((acc[filter(cur) ? 0 : 1].push(cur), acc)),
        [[], []])
};
/**
 * @name 将数组分块，每块size长度
 * @param array
 * @param size
 * @info ~~(array.length / size) + 1 == Math.ceil(array.length /size)
 * @extends Array.from Array.slice
 * @example chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
 */
export const Chunk = (array: any[], size: number): any[][] => {
    return Array.from(
        {length: ~~(array.length / size) + 1},
        (value, index) => array.slice(index * size, index * size + size))
};
/**
 * @name 将数组内非真数据全部清除
 * @param array
 * @extends Array.filter
 * @example compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34]);
 * // [ 1, 2, 3, 'a', 's', 34 ]
 */
export const Compact = (array: any[]): any[] => {
    return array.filter(Boolean);
};
/**
 * @name 将数组数据根据过滤器分组，返回每一个组特征对应的个数
 * @param array
 * @param filter
 * @extends Array.map Array.reduce
 * @example countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
 * countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}
 */
export const CountBy = (array: any[], filter: Filter | string): any => {
    return array
        .map(typeof filter === 'function' ? filter : val => val[filter])
        .reduce((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1;
            return acc;
        }, {})
};
/**
 * @name 记录第二参数出现在数组中的次数
 * @param array
 * @param value
 * @extends Array.reduce
 * @example all([4, 2, 3], x => x > 1); // true
 */
export const CountOccurrences = (array: any[], value: any): number => {
    return array.reduce((acc, cur) => cur === value ? acc + 1 : acc, 0)
};
/**
 * @name 多维数组拓扑为一维数组
 * @param array
 * @extends Array.concat
 * @example deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
 */
export const DeepFlatten = (array: any[]): any[] => {
    return [].concat(...array.map(item => Array.isArray(item)
        ? DeepFlatten(item)
        : item))
};
/**
 * @name 两个数组的差集， src - dis
 * @param srcArray
 * @param disArray
 * @info !~disArray.indexOf(item)) == !(new Set(disArray)).has(item)
 * @extends Array.filter
 * @example difference([1, 2, 3], [1, 2, 4]); // [3]
 */
export const Difference = (srcArray: any[], disArray: any[]): any[] => {
    return srcArray.filter(item => !~disArray.indexOf(item))
};
/**
 * @name 将源数组与目标数组统一格式化后，源数组中存在，目标数组不存在的值
 * @param srcArray
 * @param disArray
 * @param filter(item):any
 * @extends Array.filter
 * @example differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
 * differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]
 */
export const DifferenceBy = (srcArray: any[], disArray: any[], filter: Filter): any[] => {
    return srcArray.filter(item => !~disArray
        .map(filter)
        .indexOf(filter(item)))
};
/**
 * @name 比较源数组与目标数组的每一个值，保留比较函数返回true的项
 * @param srcArray
 * @param disArray
 * @param comparer(srcItem, disItem):boolean
 * @info indexOf(value) vs includes(value) vs findIndex(fn)
 * @extends Array.filter
 * @example differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b));
 * // [1, 1.2]
 */
export const DifferenceWith = (srcArray: any[], disArray: any[], comparer: Filter): any[] => {
    return srcArray.filter(srcItem => disArray
        .findIndex(disItem => comparer(srcItem, disItem)) === -1)
};
/**
 * @name 删除数组前count项
 * @param array
 * @param count = 1
 * @extends Array.slice
 * @example drop([1, 2, 3]); // [2,3]
 * drop([1, 2, 3], 2); // [3]
 * drop([1, 2, 3], 42); // []
 */
export const Drop = (array: any[], count = 1): any[] => {
    return array.slice(count)
};
/**
 * @name 从前向后删除数组中的项，直到满足filter条件为止，临界点不会删除
 * @param array
 * @param filter(item):boolean
 * @info 不能用shift，是脏函数，会污染原数组
 * @extends Array.slice
 * @example dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]
 */
export const DropWhile = (array: any[], filter: Filter): any[] => {
    while (array.length > 0 && !filter(array[0])) array = array.slice(1);
    return array;
};
/**
 * @name 删除数组后count项
 * @param array
 * @param count = 1
 * @extends Array.slice
 * @example dropRight([1, 2, 3]); // [1,2]
 * dropRight([1, 2, 3], 2); // [1]
 * dropRight([1, 2, 3], 42); // []
 */
export const DropRight = (array: any[], count = 1): any[] => {
    return array.slice(0, -count);
};
/**
 * @name 从后向前删除数组中的项，直到满足filter条件为止，临界点不会删除
 * @param array
 * @param filter(item):boolean
 * @info 不能用shift，是脏函数，会污染原数组
 * @extends Array.slice
 * @example dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]
 */
export const DropRightWhile = (array: any[], filter: Filter): any[] => {
    while (array.length > 0 && !filter(array[array.length - 1])) array = array.slice(0, -1);
    return array;
};
/**
 * @name 每过N取一次值
 * @param array
 * @param nth
 * @info idx % nth === nth - 1 每N取一次
 * @extends Array.filter
 * @example everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]
 */
export const EveryNth = (array: any[], nth: number): any[] => {
    return array.filter((item, idx) => idx % nth === nth - 1)
};
/**
 * @name 剔除数组中重复项
 * @param array
 * @extends Array.filter
 * @example filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1,3,5]
 */
export const FilterNonUnique = (array: any[]): any[] => {
    return array
        .filter(item => array.indexOf(item) === array.lastIndexOf(item))
};
/**
 * @name 根据filter剔除数组中重复项，剔除对象数组中的重复项
 * @param array
 * @param filter(value1, value2, index1?, index2?)
 * @info (idx === i) === filter(value, v, idx, i))) filter返回的过滤函数与游标相同
 * @extends Array.filter Array.every
 * @example filterNonUniqueBy([
 * { id: 0, value: 'a' },
 * { id: 1, value: 'b' },
 * { id: 2, value: 'c' },
 * { id: 1, value: 'd' },
 * { id: 0, value: 'e' }
 * ],
 * (a, b) => a.id == b.id);
 * // [ { id: 2, value: 'c' } ]
 */
export const FilterNonUniqueBy = (array: any[], filter: Filter): any[] => {
    return array
        .filter((value, idx) => array
            .every((v, i) => (idx === i) === filter(value, v, idx, i)))
};
/**
 * @name 从后向前第一个满足filter的item
 * @param array
 * @param filter
 * @extends Array.filter
 * @example findLast([1, 2, 3, 4], n => n % 2 === 1); // 3
 */
export const FindLast = (array: any[], filter: Filter): any => {
    return array.filter(filter).pop();
};
/**
 * @name 从后向前第一个满足filter的item的游标
 * @param array
 * @param filter(value, index, array)
 * @info Array.reverse()是一个脏函数，需要slice(0)来做副本，通过将游标和值组为数组，源数组映射为二维数组，过滤器中结构出数组的值用于判断
 * @extends Array.filter
 * @example findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2
 */
export const FindLastIndex = (array: any[], filter: Filter): number => {
    return array
        .map((value, index) => [index, value])
        .filter(([index, value]) => filter(value, index, array))
        .pop()[0]
};
/**
 * @name 将数组拓扑为指定的维度
 * @param array
 * @param depth = 1
 * @extends Array.reduce Array.concat
 * @example flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
 * flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]
 */
export const Flatten = (array: any[], depth = 1): any[] => {
    return array.reduce(
        (acc, cur) => acc.concat(depth > 1 && Array.isArray(cur) ? Flatten(cur, depth - 1) : cur),
        [])
};
/**
 * @name 从右向左的ForEach
 * @param array
 * @param each
 * @info Array.reverse()是一个脏函数，需要slice(0)来做副本
 * @extends Array.every
 * @example forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'
 */
export const ForEachRight = (array: any[], each: Filter): void => {
    return array.slice(0).reverse().forEach(each)
};
/**
 * @name 根据过滤器对数组内元素进行分组
 * @param array
 * @param filter
 * @extends Array.map Array.reduce Array.concat
 * @example groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
 * groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}
 */
export const GroupBy = (array: any[], filter: Filter | string): any => {
    return array
        .map(typeof filter === 'function' ? filter : val => val[filter])
        .reduce((acc, cur, idx) => {
            acc[cur] = (acc[cur] || []).concat(array[idx]);
            return acc;
        }, {})
};
/**
 * @name 获取数组第一个数据
 * @param array
 * @extends Array[0]
 * @example head([1, 2, 3]); // 1
 */
export const Head = (array: any[]): any => {
    return array[0]
};
/**
 * @name 数组中所有与提供值相同的游标
 * @param array
 * @param value
 * @info cur === value ? [...acc, idx] : acc > cur===value && acc.push(idx)
 * @extends Array.reduce
 * @example indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
 * indexOfAll([1, 2, 3], 4); // []
 */
export const IndexOfAll = (array: any[], value: any): any[] => {
    return array.reduce((acc, cur, idx) => cur === value ? [...acc, idx] : acc, []);
};
/**
 * @name 返回除了最后一位的其他元素组成的数组
 * @param array
 * @extends Array.slice
 * @example initial([1, 2, 3]); // [1,2]
 */
export const Initial = (array: any[]): any[] => {
    return array.slice(0, -1);
};
/**
 * @name 由给定的宽高生成二维数组，初始值为initial(null)
 * @param width
 * @param height
 * @param initial=null
 * @extends Array.from Array.map Array.fill
 * @example initialize2DArray(2, 2, 0); // [[0,0], [0,0]]
 */
export const Initialize2DArray = (width: number, height: number, initial: any): any[][] => {
    return Array.from({length: height})
        .map(() => Array.from({length: width}).fill(initial))

};
/**
 * @name 根据给定的范围和步长创建数字数组
 * @param start
 * @param end
 * @param step
 * @info Array.from(length, (value, index))  ~~((end - start + 1) / step) = Math.ceil((end-start+1/step)
 * @extends Array.from
 * @example initializeArrayWithRange(5); // [0,1,2,3,4,5]
 * initializeArrayWithRange(7, 3); // [3,4,5,6,7]
 * initializeArrayWithRange(9, 0, 2); // [0,2,4,6,8]
 */
export const InitializeArrayWithRange = (end: number, start = 0, step = 1): number[] => {
    return Array.from({length: ~~((end - start + 1) / step)}, (value, index) => index * step + start)
};
/**
 * @name 从右向左根据给定的范围和步长创建数字数组
 * @param end
 * @param start
 * @param step
 * @extends Array.from and Array.slice(0).reverse(), array.from mapFn do not have array as param
 * @example initializeArrayWithRangeRight(5); // [5,4,3,2,1,0]
 * initializeArrayWithRangeRight(7, 3); // [7,6,5,4,3]
 * initializeArrayWithRangeRight(9, 0, 2); // [8,6,4,2,0]
 */
export const InitializeArrayWithRangeRight = (end: number, start = 0, step = 1): number[] => {
    // return Array.from({length: ~~((end - start + 1) / step)}, (value, index) => index * step + start)
    //     .slice(0)
    //     .reverse()
    return Array.from({length: ~~((end - start + 1) / step)})
        .map((value, index, array) => (array.length - index - 1) * step + start)
};
/**
 * @name 使用长度和值初始化数组
 * @param length
 * @param initial
 * @extends Array.constructor, fill
 * @example initializeArrayWithValues(5, 2); // [2,2,2,2,2]
 */
export const InitializeArrayWithValues = (length: number, initial: any): any[] => {
    return Array(length).fill(initial)
};
/**
 * @name 初始化一个N维数组
 * @param initial
 * @param args(长宽高...)
 * @extends Array.from args.slice(1)
 * @example initializeNDArray(1, 3); // [1,1,1]
 * initializeNDArray(5, 2, 2, 2); // [[[5,5],[5,5]],[[5,5],[5,5]]]
 */
export const InitializeNDArray = (initial: any, ...args: any[]): any => {
    return args.length === 0
        ? initial
        : Array.from({length: args[0]})
            .map(() => InitializeNDArray(initial, ...args.slice(1)))
};
/**
 * @name 两个数组的交集
 * @param srcArray
 * @param disArray
 * @extends Array.filter Array.includes
 * @example intersection([1, 2, 3], [4, 3, 2]); // [2,3]
 */
export const Intersection = (srcArray: any[], disArray: any[]): any[] => {
    return srcArray.filter(srcItem => disArray.includes(srcItem))
};
/**
 * @name 两个数组先过filter，然后求交集
 * @param srcArray
 * @param disArray
 * @param filter
 * @extends Array.filter set.has
 * @example intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
 */
export const IntersectionBy = (srcArray: any[], disArray: any[], filter: Filter): any[] => {
    return srcArray.filter(srcItem => (
        new Set(disArray.map(filter)))
        .has(filter(srcItem)))
};
/**
 * @name 两个数组通过映射函数后求交集
 * @param srcArray
 * @param disArray
 * @param comparer(srcItem, disItem)
 * @extends Array.filter Array.findIndex
 * @example intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b));
 * // [1.5, 3, 0]
 */
export const IntersectionWith = (srcArray: any[], disArray: any[], comparer: Filter): any[] => {
    return srcArray.filter(srcItem => disArray.findIndex(disItem => comparer(srcItem, disItem)) !== -1)
};
/**
 * @name 是否是有序数组
 * @param array
 * @extends Array.every
 * @example
 * isSorted([0, 1, 2, 2]); // 1
 * isSorted([4, 3, 2]); // -1
 * isSorted([4, 3, 5]); // 0
 */
export const IsSorted = (array: any[]): number => {
    return array.every((value, index) => !index || (value >= array[index - 1]))
        ? 1 : array.every((value, index) => !index || (value <= array[index - 1]))
            ? -1 : 0;
};
/**
 * @name 将数组元素用分隔符串联起来
 * @param array
 * @param separator
 * @param lastSeparator
 * @extends Array.reduce
 * @example
 * join(['pen', 'pineapple', 'apple', 'pen'], ',', '&'); // "pen,pineapple,apple&pen"
 * join(['pen', 'pineapple', 'apple', 'pen'], ','); // "pen,pineapple,apple,pen"
 * join(['pen', 'pineapple', 'apple', 'pen']); // "pen,pineapple,apple,pen"
 */
export const Join = (array: any[], separator = ',', lastSeparator = separator): string => {
    return array.reduce(
        (acc, cur, idx) => idx === array.length - 2
            ? acc + cur + lastSeparator
            : idx === array.length - 1
                ? acc + cur
                : acc + cur + separator,
        '')
};
/**
 * @name JSON转CSV
 * @param array
 * @param headers
 * @param separator
 * @extends Array.every
 * @example
 * JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']); // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
 * JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';'); // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
 */
export const JSONtoCSV = (array: any[], headers: any[], separator = ','): string => {
    // headers = Object.keys(array[0])
    return [headers.join(separator), ...array.map(item =>
        headers.reduce(
            (acc, cur) => `${acc}${!acc.length ? '' : separator}"${!item[cur] ? '' : item[cur]}"`,
            '')
    )].join('\n');
};
/**
 * @name 数组最后一个
 * @param array
 * @extends Array[]
 * @example last([1, 2, 3]); // 3
 */
export const Last = (array: any[]): any => {
    return array[array.length - 1]
};
/**
 * @name 提供的参数中length最大的元素
 * @param args
 * @extends Array.reduce
 * @example
 * longestItem('this', 'is', 'a', 'testcase'); // 'testcase'
 * longestItem(...['a', 'ab', 'abc']); // 'abc'
 * longestItem(...['a', 'ab', 'abc'], 'abcd'); // 'abcd'
 * longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
 * longestItem([1, 2, 3], 'foobar'); // 'foobar'
 */
export const LongestItem = (...args: any[]): any => {
    return args.reduce((acc, cur) => cur.length > acc.length ? cur : acc)
};

/**
 * @name 最大的N个值，如果N大于1，则返回逆序排列的N个值组成的数组
 * @param array
 * @param n
 * @extends Array.sort
 * @example
 * maxN([1, 2, 3]); // [3]
 * maxN([1, 2, 3], 2); // [3,2]
 */
export const MaxN = (array: any[], n = 1): any[] => {
    return [...array].sort((pre, next) => next - pre).slice(0, n)
};

/**
 * @name 最小的N个值，如果N大于1，则返回逆序排列的N个值组成的数组
 * @param array
 * @param n
 * @extends Array.sort
 * @example
 * maxN([1, 2, 3]); // [3]
 * maxN([1, 2, 3], 2); // [3,2]
 */
export const MinN = (array: any[], n = 1): any[] => {
    return [...array].sort((pre, next) => pre - next).slice(0, n)
};

/**
 * @name 如果过滤器函数对于数组中所有数据都返回false，则本函数返回true，否则返回false
 * @param array
 * @param filter
 * @extends Array.some
 * @example
 * none([0, 1, 3, 0], x => x == 2); // true
 * none([0, 0, 0]); // true
 */
export const None = (array: any[], filter: Filter = Boolean): boolean => {
    return !array.some(filter)
};

/**
 * @name 返回第N个值，如果N取负数则从尾部开始计算
 * @param array
 * @param n
 * @info 使用slice绕过越界和负数问题，需要处理n+1导致的0 问题
 * @extends Array.slice
 * @example
 * nthElement(['a', 'b', 'c'], 1); // 'b'
 * nthElement(['a', 'b', 'b'], -3); // 'a'
 */
export const NthElement = (array: any[], n = 0): any => {
    return (n === -1 ? array.slice(n) : array.slice(n, n + 1))[0];
};
