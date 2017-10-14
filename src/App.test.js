import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount, render } from 'enzyme';

describe('Doggy tests', () => {
  fetch.mockResponse(JSON.stringify({status: 'success', message: { breed : ['sub_breed'] }}), { status: 200 });

  it('Expect App toMatchSnapshot', () => {
    const app = render(<App />);
    expect.assertions(1);
    expect(app).toMatchSnapshot();
  });

});


