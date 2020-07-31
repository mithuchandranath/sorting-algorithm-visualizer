const BubbleSort = (trace) => {

  let i = 0;
  while (i <= trace.arr.length - 1) {
    for (let j = 0; j < trace.arr.length - 1 - i; j++) {
      //Comparing
      trace.addStep(trace.getlastSortedidx(), [j, j + 1]);
      if (trace.arr[j] > trace.arr[j + 1]) {
        trace.swap(j, j + 1);
        //sorted comparing two elements
        trace.addStep(trace.getlastSortedidx(), [], [j, j + 1]);
      }

    }
    trace.addStep([...trace.getlastSortedidx(), trace.arr.length - 1 - i]);
    i++;
  }

  return trace;

}

export default BubbleSort;