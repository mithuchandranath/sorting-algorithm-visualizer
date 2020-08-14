import { sequenceGenerator } from './helpers/helpers'
const InsertionSort = (trace) => {
	const len = trace.arr.length;

	for (let i = 1; i < len; i++) {
		let j = i;
		while (j > 0 && trace.arr[j - 1] > trace.arr[j]) {
			trace.addStep([], [j, j - 1], [], sequenceGenerator(1, len), sequenceGenerator(0, i));
			trace.swap(j, j - 1);
			trace.addStep([], [], [j, j - 1], sequenceGenerator(1, len), sequenceGenerator(0, i));
			j--;
		}
	}
	
	trace.addStep(sequenceGenerator(0, len));
	return trace;
}

export default InsertionSort;