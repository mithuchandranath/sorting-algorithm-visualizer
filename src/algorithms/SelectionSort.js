const SelectionSort = (trace) => {

	let minIndex, len = trace.arr.length;

	for (let i = 0; i < len; i++) {
		minIndex = i;

		for (let j = i + 1; j < len; j++) {
			trace.addStep(trace.getlastSortedidx(), [], [], [minIndex], [j]); //show current minimum and current item
			trace.addStep(trace.getlastSortedidx(), [minIndex, j]); //compare

			if (trace.arr[j] < trace.arr[minIndex]) minIndex = j;

			trace.addStep(trace.getlastSortedidx(), [], [], [minIndex]);
		}

		if (i !== minIndex) {
			trace.swap(i, minIndex);
			trace.addStep(trace.getlastSortedidx(), [], [i, minIndex]);
		}

		trace.addStep([...trace.getlastSortedidx(), i])
	}

	return trace;
}

export default SelectionSort;