/**
 * 页面的底边是否出现在视窗中
 */
export const bottomVisible = (): boolean =>
    document.documentElement.clientHeight + window.scrollY
    >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)

/**
 * 拷贝页面内容到粘贴板
 * @param val 
 */
export const copyToClipboard = (val: string): void => {
    // 准备工作1、创建DOM
    const el = document.createElement('textarea');
    el.value = val;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    // 准备工作2、保存选中状态
    const selected = document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    // 选中、拷贝
    el.select();
    document.execCommand('copy');
    // 清理工作 1、清除DOM，2、恢复选中状态
    document.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
}

/**
 * 事件中心
 */
export const createEventHub = () => ({
    hub: Object.create(null),
    on(event, handler) {
        if (!this.hub[event]) this.hub[event] = [];
        this.hub[event].push(handler);
    },
    off(event, handler) {
        const idx = (this.hub[event] || []).findIndex(h => h === handler);
        if (idx > -1) this.hub[event].splice(idx, 1)
    },
    emit(event, data) {
        (this.hub[event] || []).forEach(h => h(data))
    }
})

/**
 * 元素是否在视窗中
 * @param element 元素
 * @param partially 部分可见
 */
export const elementIsVisibleInViewport = (element: Element, partially = false): boolean => {
    const { top, left, right, bottom } = element.getBoundingClientRect();
    const { innerWidth, innerHeight } = window;
    return partially
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight))
        && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}

/**
 * 获取该元素所在的滚动位置
 * @param element 元素
 */
export const getScrollPosition = (element: any = window): WebKitPoint => ({
    x: element.pageXOffset !== undefined ? element.pageXOffset : element.scrollLeft,
    y: element.pageYOffset !== undefined ? element.pageYOffset : element.scrollTop
})

/**
 * 监听元素变更
 * @param element 需要监听的元素
 * @param callback 回调函数（log)
 * @param options 监听元素的哪些属性，默认 childList/attributes/~OldValue/chracterData/~OldValue/subtree
 */
export const observeMutations = (element, callback, options) => {
    return new MutationObserver(mutations => mutations.forEach(m => callback(m)))
        .observe(
            element,
            {
                childList: true,
                attributes: true,
                attributeOldValue: true,
                characterData: true,
                characterDataOldValue: true,
                subtree: true,
                ...options
            }
        )
}
/**
 * 将函数扔到worker中运行
 * @param fn 需要运行在worker中的函数
 */
export const runAsync = fn => {
    const worker = new Worker(URL.createObjectURL(new Blob([`postMessage((${fn})());`])));
    return new Promise((resolve, reject) => {
        worker.onmessage = ({ data }) => (resolve(data), worker.terminate())
        worker.onerror = err => (reject(err), worker.terminate())
    })
}

/**
 * 缓慢回到顶部
 */
export const scrollToTop = () => {
    const toTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (toTop > 0) {
        window.requestAnimationFrame(scrollToTop)
        window.scrollTo(0, toTop - toTop / 8)
    }
}
/**
 * 将元素移入视角！
 * @extends scrollToView({ behavior: 'smooth' })
 * @param element 需要移入视角的元素
 */
export const smoothScroll = element => document
    .querySelector(element)
    .scrollToView({ behavior: 'smooth' })