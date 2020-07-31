import React, { useReducer, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './components/Header/';
import AppController from './components/AppController';
import AppSlideDrawer from './components/AppSlideDrawer';
import SortingVisualizer from './components/SortingVisualizer';
import Footer from './components/Footer/';


const generateRandomInt = (min, max) => {
  let finMax = max || 500,
    finMin = min || 1;
  return Math.floor(Math.random() * (finMax - finMin + 1) + finMin);
};

const generateSortingElementArr = arrSize => {
  return Array.from({ length: arrSize }, () => generateRandomInt(1, arrSize * 5));
};

const controllersIntialState = {
  sorting: '',
  arrSize: 5,
  arr: []
};

const controllersInit = (initial) => {

  return {
    sorting: initial.sorting,
    arrSize: initial.arrSize,
    arr: generateSortingElementArr(initial.arrSize)
  }

}

const controllersReducer = (state, action) => {

  switch (action.type) {
    case 'sorting':
      return controllersInit({ sorting: action.value, arrSize: state.arrSize });
    case 'arraySize':
      return controllersInit({ sorting: state.sorting, arrSize: action.value });
    case 'random':
      return controllersInit({ sorting: state.sorting, arrSize: state.arrSize });
    default:
      return state;
  }

}


function App() {
  const [controllers, dispatchControllers] = useReducer(controllersReducer, controllersIntialState, controllersInit);
  const [sideDrawerOpen, setSidedrawerOpen] = useState(false);
  const controllersCom = <AppController value={controllers} dispatch={dispatchControllers} />;
  console.log('parent')

  return (
    <div className="App">
      <Header
        drawerOpen={sideDrawerOpen}
        toggleDrawer={setSidedrawerOpen}
      >
        {controllersCom}
      </Header>

      <AppSlideDrawer
        open={sideDrawerOpen}
        closeDrawer={setSidedrawerOpen}
      >
        {controllersCom}
      </AppSlideDrawer>

      <main className='App__body'>
        <SortingVisualizer sortingElements={controllers.arr} algorithm={controllers.sorting} />
      </main>
      <Footer/>
    </div>
  );
}

export default App;
