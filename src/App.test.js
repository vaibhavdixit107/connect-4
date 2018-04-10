import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import App from './App';
import Board from './App';
import {Square} from './App';
import {ColumnHeight} from  './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});


it('renders board without crashing', () => {
  let app = ReactTestUtils.renderIntoDocument(
      <Board />
    );
  let appNode = ReactDOM.findDOMNode(app);		
});

it('expected to be red', () => {  
  let app = ReactTestUtils.renderIntoDocument(
      <Board />
    );
  const p = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'column');
  ReactTestUtils.Simulate.click(p[0]);  
  expect(p[0].children[5].children[0].className).toEqual("Red")
})

it('expected to be blue', () => {  
  let app = ReactTestUtils.renderIntoDocument(
      <Board />
    );
  const p = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'column');
  ReactTestUtils.Simulate.click(p[0]);  
  ReactTestUtils.Simulate.click(p[0]);  
  expect(p[0].children[4].children[0].className).toEqual("Blue")
})

it('expected red to be winner in row', () => {
  let app = ReactTestUtils.renderIntoDocument(
      <Board />
    );
  const p = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'column');
  ReactTestUtils.Simulate.click(p[0]);    
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[2]);
  ReactTestUtils.Simulate.click(p[2]);
  ReactTestUtils.Simulate.click(p[3]);
  const h = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'h1');
  expect(h[0].textContent).toEqual("Red wins!")
})

it('expected blue to be winner in row', () => {
  let app = ReactTestUtils.renderIntoDocument(
      <Board />
    );
  const p = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'column');
  ReactTestUtils.Simulate.click(p[0]);    
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[2]);
  ReactTestUtils.Simulate.click(p[2]);
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[3]);
  ReactTestUtils.Simulate.click(p[2]);
  ReactTestUtils.Simulate.click(p[3]);
  const h = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'h1');
  expect(h[0].textContent).toEqual("Blue wins!")
})


it('expected red to be winner in column', () => {
  let app = ReactTestUtils.renderIntoDocument(
      <Board />
    );
  const p = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'column');
  ReactTestUtils.Simulate.click(p[0]);    
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[0]);
  const h = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'h1');
  expect(h[0].textContent).toEqual("Red wins!")
})

it('expected red to be winner in right diagonal', () => {
  let app = ReactTestUtils.renderIntoDocument(
      <Board />
    );
  const p = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'column');
  ReactTestUtils.Simulate.click(p[3]);    
  ReactTestUtils.Simulate.click(p[4]);
  ReactTestUtils.Simulate.click(p[4]);
  ReactTestUtils.Simulate.click(p[5]);
  ReactTestUtils.Simulate.click(p[5]);
  ReactTestUtils.Simulate.click(p[3]);
  ReactTestUtils.Simulate.click(p[5]);
  ReactTestUtils.Simulate.click(p[6]);
  ReactTestUtils.Simulate.click(p[6]);
  ReactTestUtils.Simulate.click(p[6]);
  ReactTestUtils.Simulate.click(p[6]);
  const h = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'h1');
  expect(h[0].textContent).toEqual("Red wins!")
})

it('expected red to be winner in left diagonal', () => {
  let app = ReactTestUtils.renderIntoDocument(
      <Board />
    );
  const p = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'column');
  ReactTestUtils.Simulate.click(p[3]);    
  ReactTestUtils.Simulate.click(p[2]);
  ReactTestUtils.Simulate.click(p[2]);
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[3]);
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[0]);
  const h = ReactTestUtils.scryRenderedDOMComponentsWithTag(app, 'h1');
  expect(h[0].textContent).toEqual("Red wins!")
})

it('expected history to have a two values', () => {
  let app = ReactTestUtils.renderIntoDocument(
      <Board />
    );
  const p = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'column');
  ReactTestUtils.Simulate.click(p[0]);    
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[2]);
  
  const c = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'History');
  ReactTestUtils.Simulate.click(c[2]);
  expect(p[0].children[5].children[0].className).toEqual("Red");
  expect(p[1].children[5].children[0].className).toEqual("Blue");
})

it('expected history not to override', () => {
  let app = ReactTestUtils.renderIntoDocument(
      <Board />
    );
  const p = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'column');
  ReactTestUtils.Simulate.click(p[0]);    
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[0]);
  ReactTestUtils.Simulate.click(p[1]);
  ReactTestUtils.Simulate.click(p[2]);

  
  const c = ReactTestUtils.scryRenderedDOMComponentsWithClass(app, 'History');
  ReactTestUtils.Simulate.click(c[8]);

  ReactTestUtils.Simulate.click(p[0]);
  
  expect(p[0].children[5].children[0].className).toEqual("Red");
  expect(p[0].children[4].children[0].className).toEqual("Blue");


})