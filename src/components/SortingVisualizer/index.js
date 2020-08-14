import React, { useReducer, useEffect } from 'react';
import './style.css';
import BarChart from './BarChart';
import VisualizerControllers from './VisualizerControllers';
import Trace from '../../algorithms/helpers/Trace';
import BubbleSort from '../../algorithms/BubbleSort';
import MergeSort from '../../algorithms/MergeSort';
import QuickSort from '../../algorithms/QuickSort';
import SelectionSort from '../../algorithms/SelectionSort';
import StateColor from './StateColor';

const ALGORITHM = {
  'BubbleSort': BubbleSort,
  'MergeSort': MergeSort,
  'QuickSort': QuickSort,
  'SelectionSort': SelectionSort
};

const visualizerStateInit = (playload) => {
  let trace = new Trace(playload.sortingElements);
  if (playload.algorithm) {
    const sort = ALGORITHM[playload.algorithm];
    if (sort) trace = sort(trace);
    // console.log(trace);
  }

  const visualizerInitState = {
    currentStep: trace.steps[0],
    trace,
    playSpeed: 1,
    algorithm: playload.algorithm,
    step: 0,
    timeoutIds: []
  }
  return visualizerInitState;
}

const visualizerReducer = (state, action) => {

  switch (action.type) {
    case "play":
    case "forward":
    case "backward":
      const step = state.step + action.value;
      return { ...state, step: step, currentStep: state.trace.getStepByIdx(step) }

    case "repeat":
      return { ...state, step: action.value, currentStep: state.trace.getStepByIdx(action.value) }

    case "playSpeed":
      return { ...state, playSpeed: action.value }

    case "updateTimeoutIds":
      return { ...state, timeoutIds: [...action.value] }

    case "updateInitState":
      return visualizerStateInit(action.value);

    default:
      return state;
  }

}



const SortingVisualizer = (props) => {

  const [visualizer, dispatchVisualizer] = useReducer(visualizerReducer, props, visualizerStateInit);

  const clearTimeOuts = () => {
    visualizer.timeoutIds.forEach((timeOutId) => clearTimeout(timeOutId));
    dispatchVisualizer({ type: "updateTimeoutIds", value: [] });
  }

  useEffect(() => {
    clearTimeOuts();
    dispatchVisualizer({ type: 'updateInitState', value: props });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const disabledControllersHandler = () => {

    let totalSteps = visualizer.trace.getStepsLen() - 1;
    let isAlgoSelected = visualizer.algorithm ? true : false;
    const disabledControllers = {};
    disabledControllers.play = !isAlgoSelected || (totalSteps !== 0 && totalSteps === visualizer.step);
    disabledControllers.backward = !isAlgoSelected || visualizer.step === 0;
    disabledControllers.forward = !isAlgoSelected || visualizer.step === totalSteps;
    disabledControllers.repeat = !isAlgoSelected || visualizer.step === 0;
    return disabledControllers;

  }

  const dispatchControllers = (action) => {
    let timeoutIds = [];
    const stepsLen = visualizer.trace.getStepsLen() - 1;
    const playing = visualizer.timeoutIds.length > 0;
    let defaultTimer = 250;
    let timer = defaultTimer / visualizer.playSpeed;

    switch (action.type) {

      case "play":

        let forwardOrBackwardStep = 0;
        let unfinishedStepsLen = stepsLen - visualizer.step;

        //Check whether it's call for forward/backward/repeat/playspeed and then play
        if (('subType' in action)) {

          if (['backwardThenPlay', 'forwardThenPlay'].includes(action.subType)) forwardOrBackwardStep = action.value

          /*
            If BackwardthenPlay, total processing's steps need to go two step back.
            First step to go back to the previous step and second one to start playing from there.
            So, unfinishedStepsLen have got to increment by 2 
          */

          if (action.subType === 'backwardThenPlay') unfinishedStepsLen += 2;

          /*
           If RepeatThenPlay, total processing's steps have got to start from first. 
           So, unfinishedStepLen is supposed to be as same as total stepsLen. 
          */
          if (action.subType === 'repeatThenPlay') unfinishedStepsLen = stepsLen;

          /*
            If change playspeed and then play, current timer needs to get update and 
            state timer has already been updated before play case gets called by playspeed case
          */
          if (action.subType === 'playSpeedThenPlay') {
            timer = defaultTimer / action.value;
          }

        }

        timeoutIds = Array.from({ length: unfinishedStepsLen }, (_, i) => {

          let playload = { type: action.type, value: 1 };

          if (i === 0 && forwardOrBackwardStep !== 0)
            playload = { ...action, value: forwardOrBackwardStep };

          return setTimeout(() => {
            dispatchVisualizer(playload);
          }, i * timer)

        });

        let timeOutId = setTimeout(clearTimeOuts, (unfinishedStepsLen - 1) * timer);
        timeoutIds.push(timeOutId);
        dispatchVisualizer({ type: "updateTimeoutIds", value: timeoutIds });
        break;

      case "pause":
        clearTimeOuts();
        break;

      case "backward":
        if (visualizer.step > 0) {
          if (playing) {
            clearTimeOuts();
            dispatchControllers({ type: "play", subType: "backwardThenPlay", value: -1 })
          }
          else dispatchVisualizer({ type: "backward", value: -1 });
        }
        break;

      case "forward":
        if (visualizer.step < stepsLen) {
          if (playing) {
            clearTimeOuts();
            dispatchControllers({ type: "play", subType: "forwardThenPlay", value: 1 });
          }
          else dispatchVisualizer({ type: "forward", value: 1 });
        }
        break;

      case 'repeat':
        if (visualizer.step > 0) {
          clearTimeOuts();
          dispatchVisualizer({ type: "repeat", value: 0 });
          let timeoutId = setTimeout(() => {
            dispatchControllers({ type: "play", subType: "repeatThenPlay", value: 0 });
          }, timer)
          timeoutIds.push(timeoutId);
          dispatchVisualizer({ type: "updateTimeoutIds", value: timeoutIds });
        }
        break;

      case 'playSpeed':
        const playSpeed = Number(action.value.split('x')[0]);
        dispatchVisualizer({ type: "playSpeed", value: playSpeed });

        if (playing) {
          clearTimeOuts();
          let timeoutId = setTimeout(() => {
            dispatchControllers({ type: "play", subType: "playSpeedThenPlay", value: playSpeed });
          }, 0);

          timeoutIds.push(timeoutId);
          dispatchVisualizer({ type: "updateTimeoutIds", value: timeoutIds });
        }
        break;

      default:

    }

  }

  return (
    <div className="SortingVisualizer">
      <BarChart config={visualizer.currentStep} />
      <VisualizerControllers
        disabledControllers={disabledControllersHandler()}
        handleControllers={dispatchControllers}
        playing={visualizer.timeoutIds.length > 0}
        playSpeed={visualizer.playSpeed}
      />
      <StateColor algorithm={props.algorithm} />
    </div>
  )

}

export default React.memo(SortingVisualizer, (prevProps, nextProps) => prevProps.sortingElements === nextProps.sortingElements && prevProps.algorithm === nextProps.algorithm);