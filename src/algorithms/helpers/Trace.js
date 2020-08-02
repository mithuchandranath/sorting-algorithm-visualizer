class Trace {
  steps = [];
  constructor(arr) {
    this.originalArr = [...arr];
    this.arr = [...arr];
    //initial step
    this.steps.push({
      arr,
      sortedIdx: [],
      stateA: [],
      stateB: [],
      stateC: [],
      stateD: []
    })
  }

  setArr(arr) {
    this.arr = [...arr];
  }

  getStepsLen() {
    return this.steps.length;
  }

  getSteps() {
    return this.steps
  }

  getStepByIdx(id) {
    return this.steps[id];
  }

  addStep(sortedIdx = [], stateA = [], stateB = [], stateC = [], stateD = []) {


    this.steps.push({
      arr: [...this.arr],
      sortedIdx,
      stateA,
      stateB,
      stateC,
      stateD
    });

  }

  swap(i, j) {
    let tmp = this.arr[i];
    this.arr[i] = this.arr[j];
    this.arr[j] = tmp
  }

  getlastSortedidx() {
    return this.steps[this.getStepsLen() - 1].sortedIdx;
  }



}

export default Trace;