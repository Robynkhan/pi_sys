/*
 * 小堆
 * 支持删除和更新
 */

// ============================== 导出

/**
 * 小堆
 */
export class Heap<T> {

	private array: T[] = [];                // 堆的实际数组，用来表示完全二叉树
	private cmp: (a: T, b: T) => number;    // 比较函数

	constructor(cmp: (a: T, b: T) => number) {
		this.cmp = cmp;
	}

	/**
	 * 判空
	 */
	public empty() {
		return this.array.length === 0;
	}

	/**
	 * 返回内部数组
	 */
	public getImpl() {
		return this.array;
	}

	/**
	 * 插入元素
	 */
	public insert(value: T) {
		this.array.push(value);
		this.up(this.array.length - 1);
	}

	/**
	 * 查找指定元素的位置
	 */
	public findIndex(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any) {
		return this.array.findIndex(predicate, thisArg);
	}
	/**
	 * 删除元素
	 */
	public remove(value: T) {
		this.removeByIndex(this.array.indexOf(value));
	}
	/**
	 * 删除指定位置的元素
	 */
	public removeByIndex(index: number) {
		// 把最后的叶子赋值给index位置
		const len = this.array.length - 1;
		if (index < 0 || index > len) return;
		this.array[index] = this.array[len];
		this.array.length = len;
		this.down(index);
	}
	/**
	 * 用过滤函数清除不要的元素， 过滤函数返回true表示保留
	 */
	public filter(f: (e: T) => boolean) {
		for(let i = this.array.length - 1; i >= 0; i--) {
			if(!f(this.array[i])) {
				this.removeByIndex(i);
			};
		}
	}

	/**
	 * 获得但不弹出堆顶元素
	 */
	public get() {
		return this.array[0];
	}

	/**
	 * 删除堆顶元素并返回
	 */
	public pop() {
		const r = this.array[0];
		this.array[0] = this.array[this.array.length - 1];
		--this.array.length;
		this.down(0);

		return r;
	}

	/**
	 * 清空
	 */
	public clear() {
		this.array.length = 0;
	}

	/**
	 * 下沉
	 */
	private down(index: number) {
		const arr = this.array;
		if (arr.length <= index) return;

		const element = arr[index];

		let curr = index;
		let left = curr * 2 + 1;
		let right = left + 1;

		while (left < arr.length) {
			// 选择左右孩子的最小值作为比较
			let child = left;
			if (right < arr.length && this.cmp(arr[right], arr[left]) < 0) {
				child = right;
			}

			// 待选择的值比孩子大，则将孩子移到当前的槽
			if (this.cmp(element, arr[child]) <= 0) {
				break;
			} else {
				arr[curr] = arr[child];

				// 往下迭代
				curr = child;
				left = curr * 2 + 1;
				right = left + 1;
			}
		}
		arr[curr] = element;
	}

	/**
	 * 上朔
	 */
	private up(index: number) {
		const arr = this.array;
		if (arr.length <= index) return;

		const element = arr[index];

		let curr = index;
		let parent = Math.floor((curr - 1) / 2);
		while (parent >= 0 && this.cmp(element, arr[parent]) < 0) {
			arr[curr] = arr[parent];

			// 往上迭代
			curr = parent;
			parent = Math.floor((curr - 1) / 2);
		}
		arr[curr] = element;
	}
}