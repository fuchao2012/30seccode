/**
 * 判断任意一个数据是不是JSON
 * @param obj 任意一个数据
 */
export const isValidJSON = (obj): boolean => {
    try {
        JSON.parse(obj);
        return true;
    } catch (error) {
        return false;
    }
}
/**
 * 判断任意一个数据是不是Promise
 * @param obj 数据
 */
export const isPromiseLike = (obj): boolean =>
    obj !== null && (typeof obj === 'object' || typeof obj === 'function')
    && typeof obj.then === 'function';