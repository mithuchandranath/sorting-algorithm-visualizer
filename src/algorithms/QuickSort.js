const QuickSort = (trace) => {

	const sort = (left, right) => {

		if (left >= right) {
			if (left === right) {
				trace.addStep([...trace.getlastSortedidx(), left]);
			}
			return null;
		}

		let partitionIndex = partition(left, right);
		trace.addStep([...trace.getlastSortedidx(), partitionIndex]);
		sort(left, partitionIndex - 1);
		sort(partitionIndex + 1, right);

	}

	const partition = (left, right) => {
		let pivotIndex = right;
		let pivotValue = trace.arr[pivotIndex];
		let partitionIndex = left;

		for (let i = left; i < right; i++) {
			trace.addStep(trace.getlastSortedidx(), [], [], [partitionIndex], [pivotIndex]);
			trace.addStep(trace.getlastSortedidx(), [i, pivotIndex], [], [partitionIndex], [pivotIndex]);

			if (trace.arr[i] < pivotValue) {

				if (i !== partitionIndex) { // if current comparing index and partition index is same, don't need to swap as because it swaps between itself
					trace.swap(i, partitionIndex);
					trace.addStep(trace.getlastSortedidx(), [], [i, partitionIndex], [partitionIndex + 1], [pivotIndex]);
				}
				partitionIndex++;
			}
		}

		if (pivotIndex !== partitionIndex) { //same case as above
			trace.swap(pivotIndex, partitionIndex);
			trace.addStep(trace.getlastSortedidx(), [], [pivotIndex, partitionIndex]);
		}

		return partitionIndex;

	}

	sort(0, trace.arr.length - 1);
	return trace;
}

export default QuickSort;