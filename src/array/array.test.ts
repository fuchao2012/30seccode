import * as Array from './array';
import {expect} from 'chai';

describe('array', () => {
    describe.skip('done', function () {

        it('数组所有内容都满足', () => {
            const array = [4, 2, 3];
            const result = true;
            expect(Array.All(array, x => x > 1))
                .to
                .equal(result)
        });

        it('数组只要有一个满足', () => {
            const array = [0, 1, 2, 0];
            const result = true;
            expect(Array.Any(array, x => x > 1))
                .to
                .equal(result)
        });

        it('数组所有值都相等', () => {
            const array = [0, 1, 2, 0];
            const result = false;
            expect(Array.AllEqual(array))
                .to
                .equal(result)
        });

        it('二维数组转CSV', () => {
            const array = [['a', 'b'], ['c', 'd']];
            expect(Array.ArrayToCSV(array))
                .to
                .equal('"a","b"\n"c","d"')
        });

        it('将数组按照真假分为两类 ', function () {
            const array = ['beep', 'boop', 'foo', 'bar'];
            const filter = [true, true, false, true];
            const result = [['beep', 'boop', 'bar'], ['foo']];
            expect(Array.Bifurcate(array, filter))
                .to
                .eql(result)
        });

        it('将数组按照过滤器所指定分为两类', function () {
            const array = ['beep', 'boop', 'foo', 'bar'];
            const filter = x => x[0] === 'b';
            const result = [['beep', 'boop', 'bar'], ['foo']];
            expect(Array.BifurcateBy(array, filter))
                .to
                .eql(result)
        });

        it('将数组分块，每块size长度', function () {
            const array = [1, 2, 3, 4, 5];
            const size = 2;
            const result = [[1, 2], [3, 4], [5]];
            expect(Array.Chunk(array, size))
                .to
                .eql(result)
        });

        it('将数组内非真数据全部清除', function () {
            const array = [0, 1, false, 2, '', 3, 'a', NaN, 's', 34];
            const result = [1, 2, 3, 'a', 's', 34];
            expect(Array.Compact(array))
                .to
                .eql(result)
        });

        it('将数组数据根据过滤器分组，返回每一个组特征对应的个数 1', function () {
            // countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
            const array = [6.1, 4.2, 6.3];
            const filter = Math.floor;
            const result = {4: 1, 6: 2};
            expect(Array.CountBy(array, filter))
                .to
                .eql(result)
        });
        it('将数组数据根据过滤器分组，返回每一个组特征对应的个数 2', function () {
            // countBy(['one', 'two', 'three'], 'length'); // {3: 2, 5: 1}
            const array = ['one', 'two', 'three'];
            const filter = 'length';
            const result = {3: 2, 5: 1};
            expect(Array.CountBy(array, filter))
                .to
                .eql(result)
        });

        it('记录第二参数出现在数组中的次数', function () {
            // countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
            const array = [1, 1, 2, 1, 2, 3];
            const value = 1;
            const result = 3;
            expect(Array.CountOccurrences(array, value))
                .to
                .equal(result)
        });

        it('多维数组拓扑为一维数组', function () {
            // deepFlatten([1, [2], [[3], 4], 5]); // [1,2,3,4,5]
            const array = [1, [2], [[3], 4], 5];
            const result = [1, 2, 3, 4, 5];
            expect(Array.DeepFlatten(array))
                .to
                .eql(result)
        });

        it('源数组中存在，目标数组不存在的值', function () {
            // difference([1, 2, 3], [1, 2, 4]); // [3]
            const srcArray = [1, 2, 3];
            const disArray = [1, 2, 4];
            const result = [3];
            expect(Array.Difference(srcArray, disArray))
                .to
                .eql(result)
        });

        it('将源数组与目标数组统一格式化后，源数组中存在，目标数组不存在的值1', function () {
            // differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
            const srcArray = [2.1, 1.2];
            const disArray = [2.3, 3.4];
            const filter = Math.floor;
            const result = [1.2];
            expect(Array.DifferenceBy(srcArray, disArray, filter))
                .to
                .eql(result)
        });
        it('将源数组与目标数组统一格式化后，源数组中存在，目标数组不存在的值2', function () {
            // differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]
            const srcArray = [{x: 2}, {x: 1}];
            const disArray = [{x: 1}];
            const filter = v => v.x;
            const result = [{x: 2}];
            expect(Array.DifferenceBy(srcArray, disArray, filter))
                .to
                .eql(result)
        });

        it('比较源数组与目标数组的每一个值，保留比较函数返回true的项', function () {
            // differenceWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0], (a, b) => Math.round(a) === Math.round(b)); // [1, 1.2]
            const srcArray = [1, 1.2, 1.5, 3, 0];
            const disArray = [1.9, 3, 0];
            const filter = (a, b) => Math.round(a) === Math.round(b);
            const result = [1, 1.2];
            expect(Array.DifferenceWith(srcArray, disArray, filter))
                .to
                .eql(result)
        });

        it('删除数组前count项1', function () {
            // drop([1, 2, 3]); // [2,3]
            const array = [1, 2, 3];
            const result = [2, 3];
            expect(Array.Drop(array))
                .to
                .eql(result)
        });
        it('删除数组前count项2', function () {
            // drop([1, 2, 3], 2); // [3]
            const array = [1, 2, 3];
            const count = 2;
            const result = [3];
            expect(Array.Drop(array, count))
                .to
                .eql(result)
        });
        it('删除数组前count项3', function () {
            // drop([1, 2, 3], 42); // []
            const array = [1, 2, 3];
            const count = 42;
            const result = [];
            expect(Array.Drop(array, count))
                .to
                .eql(result)
        });

        it('从前向后删除数组中的项，直到满足filter条件为止，临界点不会删除', function () {
            // dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]
            const array = [1, 2, 3, 4];
            const filter = n => n >= 3;
            const result = [3, 4];
            const resultArray = Array.DropWhile(array, filter);
            expect(resultArray)
                .to
                .eql(result);
            // 函数不是脏的，不会修改原数组
            expect(array)
                .to
                .eql([1, 2, 3, 4]);
        });

        it('删除数组后count项1', function () {
            // dropRight([1, 2, 3]); // [1, 2]
            const array = [1, 2, 3];
            const result = [1, 2];
            expect(Array.DropRight(array))
                .to
                .eql(result)
        });
        it('删除数组后count项2', function () {
            // dropRight([1, 2, 3], 2); // [1]
            const array = [1, 2, 3];
            const count = 2;
            const result = [1];
            expect(Array.DropRight(array, count))
                .to
                .eql(result)
        });
        it('删除数组后count项3', function () {
            // dropRight([1, 2, 3], 42); // []
            const array = [1, 2, 3];
            const count = 42;
            const result = [];
            expect(Array.DropRight(array, count))
                .to
                .eql(result)
        });

        it('从后向前删除数组中的项，直到满足filter条件为止，临界点不会删除', function () {
            // dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]
            const array = [1, 2, 3, 4];
            const filter = n => n < 3;
            const result = [1, 2];
            const resultArray = Array.DropRightWhile(array, filter);
            expect(resultArray)
                .to
                .eql(result);
            // 函数不是脏的，不会修改原数组
            expect(array)
                .to
                .eql([1, 2, 3, 4]);
        });

        it('每过N取一次值', function () {
            // everyNth([1, 2, 3, 4, 5, 6], 3); // [ 3, 6 ]
            const array = [1, 2, 3, 4, 5, 6];
            const nth = 3;
            const result = [3, 6];
            expect(Array.EveryNth(array, nth))
                .to
                .eql(result);
        });

        it('剔除数组中重复项', function () {
            // filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1,3,5]
            const array = [1, 2, 2, 3, 4, 4, 5];
            const result = [1, 3, 5];
            expect(Array.FilterNonUnique(array))
                .to
                .eql(result);
        });

        it('根据filter剔除数组中重复项', function () {
            // filterNonUniqueBy(
            //   [
            //     { id: 0, value: 'a' },
            //     { id: 1, value: 'b' },
            //     { id: 2, value: 'c' },
            //     { id: 1, value: 'd' },
            //     { id: 0, value: 'e' }
            //   ],
            //   (a, b) => a.id == b.id
            // ); // [ { id: 2, value: 'c' } ]
            const array = [
                {id: 0, value: 'a'},
                {id: 1, value: 'b'},
                {id: 2, value: 'c'},
                {id: 1, value: 'd'},
                {id: 0, value: 'e'}
            ];
            const filter = (a, b) => a.id === b.id;
            const result = [{id: 2, value: 'c'}];
            expect(Array.FilterNonUniqueBy(array, filter))
                .to
                .eql(result);
        });


        it('从后向前第一个满足filter的item1', function () {
            // findLast([1, 2, 3, 4], n => n % 2 === 1); // 3
            const array = [1, 2, 3, 4];
            const filter = n => n % 2 === 1;
            const result = 3;
            expect(Array.FindLast(array, filter))
                .to
                .eql(result);
        });

        it('从后向前第一个满足filter的item2', function () {
            // findLast([1, 2, 3, 4], n => n % 2 === 1); // 3
            const array = [1, 2, 3, 4];
            const filter = n => n % 2 === 1;
            Array.FindLast(array, filter);
            // 不脏
            expect(array).to.eql([1, 2, 3, 4]);
        });

        it('从后向前第一个满足filter的item的游标', function () {
            // findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2
            const array = [1, 2, 3, 4];
            const filter = n => n % 2 === 1;
            const result = 2;
            expect(Array.FindLastIndex(array, filter))
                .to
                .equal(result);
        });

        it('将数组拓扑为指定的维度1', function () {
            // flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
            const array = [1, [2], 3, 4];
            const result = [1, 2, 3, 4];
            expect(Array.Flatten(array))
                .to
                .eql(result);
        });
        it('将数组拓扑为指定的维度2', function () {
            // flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]
            const array = [1, [2, [3, [4, 5], 6], 7], 8];
            const depth = 2;
            const result = [1, 2, 3, [4, 5], 6, 7, 8];
            expect(Array.Flatten(array, depth))
                .to
                .eql(result);
        });

        it('从右向左的ForEach', function () {
            // forEachRight([1, 2, 3, 4], val => console.log(val)); // '4', '3', '2', '1'
            const array = [1, 2, 3, 4];
            const each = val => console.log(val);
            Array.ForEachRight(array, each);

            expect(array).to.eql([1, 2, 3, 4])
        });


        it('根据过滤器对数组内元素进行分组1', function () {
            // groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
            const array = [6.1, 4.2, 6.3];
            const filter = Math.floor;
            const result = {4: [4.2], 6: [6.1, 6.3]};
            expect(Array.GroupBy(array, filter)).to.eql(result);
        });
        it('根据过滤器对数组内元素进行分组2', function () {
            // groupBy(['one', 'two', 'three'], 'length'); // {3: ['one', 'two'], 5: ['three']}
            const array = ['one', 'two', 'three'];
            const filter = 'length';
            const result = {3: ['one', 'two'], 5: ['three']};
            expect(Array.GroupBy(array, filter)).to.eql(result);
        });

        it('获取数组第一个数据', function () {
            // head([1, 2, 3]); // 1
            const array = [1, 2, 3];
            const result = 1;
            expect(Array.Head(array)).to.equal(result);
        });


        it('数组中所有与提供值相同的游标1', function () {
            // indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
            const array = [1, 2, 3, 1, 2, 3];
            const value = 1;
            const result = [0, 3];
            expect(Array.IndexOfAll(array, value)).to.eql(result);
        });
        it('数组中所有与提供值相同的游标2', function () {
            // indexOfAll([1, 2, 3], 4); // []
            const array = [1, 2, 3];
            const value = 4;
            const result = [];
            expect(Array.IndexOfAll(array, value)).to.eql(result);
        });

        it('返回除了最后一位的其他元素组成的数组', function () {
            // initial([1, 2, 3]); // [1,2]
            const array = [1, 2, 3];
            const result = [1, 2];
            expect(Array.Initial(array)).to.eql(result);
        });

        it('由给定的宽高生成二维数组，初始值为initial(null)', function () {
            // initialize2DArray(2, 2, 0); // [[0,0], [0,0]]
            const width = 2;
            const height = 2;
            const initial = 0;
            const result = [[0, 0], [0, 0]];
            expect(Array.Initialize2DArray(width, height, initial)).to.eql(result);
        });


        it('根据给定的范围和步长创建数字数组1', function () {
            // initializeArrayWithRange(5); // [0,1,2,3,4,5]
            const end = 6;
            const result = [0, 1, 2, 3, 4, 5, 6];
            expect(Array.InitializeArrayWithRange(end)).to.eql(result);
        });
        it('根据给定的范围和步长创建数字数组2', function () {
            // initializeArrayWithRange(7, 3); // [3,4,5,6,7]
            const end = 7;
            const start = 3;
            const result = [3, 4, 5, 6, 7];
            expect(Array.InitializeArrayWithRange(end, start)).to.eql(result);
        });
        it('根据给定的范围和步长创建数字数组3', function () {
            // initializeArrayWithRange(9, 0, 2); // [0,2,4,6,8]
            const end = 9;
            const start = 0;
            const step = 2;
            const result = [0, 2, 4, 6, 8];
            expect(Array.InitializeArrayWithRange(end, start, step)).to.eql(result);
        });


        it('从右向左根据给定的范围和步长创建数字数组1', function () {
            // initializeArrayWithRangeRight(5); // [5,4,3,2,1,0]
            const end = 5;
            const result = [5, 4, 3, 2, 1, 0];
            expect(Array.InitializeArrayWithRangeRight(end)).to.eql(result);
        });
        it('从右向左根据给定的范围和步长创建数字数组2', function () {
            // initializeArrayWithRangeRight(7, 3); // [7,6,5,4,3]
            const end = 7;
            const start = 3;
            const result = [7, 6, 5, 4, 3];
            expect(Array.InitializeArrayWithRangeRight(end, start)).to.eql(result);
        });
        it('从右向左根据给定的范围和步长创建数字数组3', function () {
            // initializeArrayWithRangeRight(9, 0, 2); // [8,6,4,2,0]
            const end = 9;
            const start = 0;
            const step = 2;
            const result = [8, 6, 4, 2, 0];
            expect(Array.InitializeArrayWithRangeRight(end, start, step)).to.eql(result);
        });


        it('使用长度和值初始化数组', function () {
            // initializeArrayWithValues(5, 2); // [2,2,2,2,2]
            const length = 5;
            const initial = 2;
            const result = [2, 2, 2, 2, 2];
            expect(Array.InitializeArrayWithValues(length, initial)).to.eql(result);
        });

        it('初始化一个N维数组1', function () {
            // initializeNDArray(1, 3); // [1,1,1]
            const initial = 1;
            const result = [1, 1, 1];
            expect(Array.InitializeNDArray(initial, 3)).to.eql(result);
        });
        it('初始化一个N维数组2', function () {
            // initializeNDArray(5, 2, 2, 2); // [[[5,5],[5,5]],[[5,5],[5,5]]]
            const initial = 5;
            const result = [[[5, 5], [5, 5]], [[5, 5], [5, 5]]];
            expect(Array.InitializeNDArray(initial, 2, 2, 2)).to.eql(result);
        });

        it('两个数组的交集', function () {
            // intersection([1, 2, 3], [4, 3, 2]); // [2,3]
            const srcArray = [1, 2, 3];
            const disArray = [4, 3, 2];
            const result = [2, 3];
            expect(Array.Intersection(srcArray, disArray)).to.eql(result);
        });

        it('两个数组先过filter，然后求交集', function () {
            // intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
            const srcArray = [2.1, 1.2];
            const disArray = [2.3, 3.4];
            const filter = Math.floor;
            const result = [2.1];
            expect(Array.IntersectionBy(srcArray, disArray, filter)).to.eql(result);
        });
        it('两个数组通过映射函数后求交集', function () {
            // intersectionWith([1, 1.2, 1.5, 3, 0], [1.9, 3, 0, 3.9], (a, b) => Math.round(a) === Math.round(b)); // [1.5, 3, 0]
            const srcArray = [1, 1.2, 1.5, 3, 0];
            const disArray = [1.9, 3, 0, 3.9];
            const comparer = (a, b) => Math.round(a) === Math.round(b);
            const result = [1.5, 3, 0];
            expect(Array.IntersectionWith(srcArray, disArray, comparer)).to.eql(result);
        });


        it('是否是有序数组1', function () {
            // isSorted([0, 1, 2, 2]); // 1
            const array = [0, 1, 2, 2];
            const result = 1;
            expect(Array.IsSorted(array)).to.equal(result);
        });
        it('是否是有序数组2', function () {
            // isSorted([4, 3, 2]); // -1
            const array = [4, 3, 2];
            const result = -1;
            expect(Array.IsSorted(array)).to.equal(result);
        });
        it('是否是有序数组3', function () {
            // isSorted([4, 3, 5]); // 0
            const array = [4, 3, 5];
            const result = 0;
            expect(Array.IsSorted(array)).to.equal(result);
        });


        it('将数组元素用分隔符串联起来1', function () {
            // join(['pen', 'pineapple', 'apple', 'pen'], ',', '&'); // "pen,pineapple,apple&pen"
            const array = ['pen', 'pineapple', 'apple', 'pen'];
            const separator = ',';
            const lastSeparator = '&';
            const result = "pen,pineapple,apple&pen";
            expect(Array.Join(array, separator, lastSeparator)).to.equal(result);
        });
        it('将数组元素用分隔符串联起来2', function () {
            // join(['pen', 'pineapple', 'apple', 'pen'], ','); // "pen,pineapple,apple,pen"
            const array = ['pen', 'pineapple', 'apple', 'pen'];
            const separator = ',';
            const result = "pen,pineapple,apple,pen";
            expect(Array.Join(array, separator)).to.equal(result);
        });
        it('将数组元素用分隔符串联起来3', function () {
            // join(['pen', 'pineapple', 'apple', 'pen']); // "pen,pineapple,apple,pen"
            const array = ['pen', 'pineapple', 'apple', 'pen'];
            const result = "pen,pineapple,apple,pen";
            expect(Array.Join(array)).to.equal(result);
        });


        it('JSON转CSV1', function () {
            // JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b']);
            // 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"'
            const array = [{a: 1, b: 2}, {a: 3, b: 4, c: 5}, {a: 6}, {b: 7}];
            const headers = ['a', 'b'];
            const result = 'a,b\n"1","2"\n"3","4"\n"6",""\n"","7"';
            expect(Array.JSONtoCSV(array, headers)).to.equal(result);
        });
        it('JSON转CSV2', function () {
            // JSONtoCSV([{ a: 1, b: 2 }, { a: 3, b: 4, c: 5 }, { a: 6 }, { b: 7 }], ['a', 'b'], ';');
            // 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"'
            const array = [{a: 1, b: 2}, {a: 3, b: 4, c: 5}, {a: 6}, {b: 7}];
            const headers = ['a', 'b'];
            const separator = ';';
            const result = 'a;b\n"1";"2"\n"3";"4"\n"6";""\n"";"7"';
            expect(Array.JSONtoCSV(array, headers, separator)).to.equal(result);
        });


        it('数组最后一个', function () {
            // join(['pen', 'pineapple', 'apple', 'pen'], ','); // "pen,pineapple,apple,pen"
            const array = [1, 2, 3];
            const result = 3;
            expect(Array.Last(array)).to.equal(result);
        });
    });
    it('提供参数中length最大的元素1', function () {
        // longestItem('this', 'is', 'a', 'testcase'); // 'testcase'
        expect(Array.LongestItem('this', 'is', 'a', 'testcase')).to.equal('testcase');
    });
    it('提供参数中length最大的元素2', function () {
        // longestItem(...['a', 'ab', 'abc']); // 'abc'
        expect(Array.LongestItem(...['a', 'ab', 'abc'])).to.equal('abc');
    });
    it('提供参数中length最大的元素3', function () {
        // longestItem(...['a', 'ab', 'abc'], 'abcd'); // 'abcd'
        expect(Array.LongestItem(...['a', 'ab', 'abc'], 'abcd')).to.equal('abcd');
    });
    it('提供参数中length最大的元素4', function () {
        // longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
        expect(Array.LongestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5])).to.eql([1, 2, 3, 4, 5]);
    });
    it('提供参数中length最大的元素5', function () {
        // longestItem([1, 2, 3], 'foobar'); // 'foobar'
        expect(Array.LongestItem([1, 2, 3], 'foobar')).to.equal('foobar');
    });

});
