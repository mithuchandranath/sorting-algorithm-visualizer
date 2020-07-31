import React from 'react';
import './style.css'
import Button from '../generic/Button';
import Select from '../generic/Select';

const sortingOptions = {
  '': 'Select Sort',
  BubbleSort: 'Bubble Sort',
  MergeSort: 'Merge Sort'
};

const arrSizeOptions = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

const Controller = ({ value, dispatch }) => {

  return (
    <ul className='App__controler'>
      <li>
        <Select options={sortingOptions} selectedOption={value.sorting} onSelect={value => dispatch({ type: 'sorting', value: value })} />
      </li>
      <li>
        <Select options={arrSizeOptions} selectedOption={value.arrSize} onSelect={value => dispatch({ type: 'arraySize', value: value })} />
      </li>
      <li>
        <Button className="bolder" onClick={() => dispatch({ type: 'random' })}>Random</Button>
      </li>
    </ul>
  );

}

export default Controller;