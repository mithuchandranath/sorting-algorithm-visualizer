import { sequenceGenerator } from './helpers/helpers';

const MergeSort = (trace) => {

	const sort = (arr, start, end) => {
		const length = end - start;
		if (length < 2) {
			return true;
		}

		const mid = Math.floor((start + end) / 2);
		trace.addStep([], [], [], [], sequenceGenerator(start, mid));
		sort(arr, start, mid);

		trace.addStep([], [], [], [], sequenceGenerator(mid, end));
		sort(arr, mid, end);

		merge(arr, start, mid, end);

	}

	const merge = (arr, start, mid, end) => {
		const leftChunkLen = mid - start;
		const rightChunkLen = end - mid;
		let l = 0, r = 0;

		while (l < leftChunkLen && r < rightChunkLen) {
			trace.addStep([], [start + r + l, mid + r]);
			if (arr[start + l + r] <= arr[mid + r]) {
				l++;
			} else {

				arr.splice(start + l + r, 0, arr[mid + r]);
				arr.splice(mid + r + 1, 1);
				trace.setArr(arr);
				trace.addStep([], [], [start + r + l, start + r + l + 1]);
				r++;
			}
		}

		while (l < leftChunkLen) {
			trace.addStep([], [], [], [start + r + l]);
			l++;
		}

		while (r < rightChunkLen) {
			trace.addStep([], [], [], [mid + r]);
			r++;
		}
	}

	sort([...trace.arr], 0, trace.arr.length);

	trace.addStep(sequenceGenerator(0, trace.arr.length));

	return trace;
}

export default MergeSort;