import React from 'react';
import { shallow } from 'enzyme';
import HelloWorldComponent from './HelloWorldComponent';
import Foo from '../Foo/Foo';

let wrapper;

//Before each specs, it sets the wrapper equal to the component
beforeEach(() => {
	wrapper = shallow(<HelloWorldComponent />);
});

//After the describe block, it prints a message
afterAll(() => {
	console.log('Thanks for testing');
});

//Function needed to test the "fail" method from Jasmine
var foo = function (x, callBack) {
	if (x) {
		callBack();
	}
};

describe('<HelloWorldComponent />', () => {
	//Using text() and to Equal()
	it('text to be "Hello World"', () => {
		expect(wrapper.text()).toEqual('Hello World<Foo />');
	});

	//Using contains() and toBe()
	it('Does not contain a random div', () => {
		expect(wrapper.contains(<div className='randomDiv' />)).toBe(false);
	});

	//Using find() and toExist() with a component
	it('Foo component exist', () => {
		expect(wrapper.find(Foo)).toExist();
	});

	//Using find and toExist() with a class
	it('Element with class1 exist', () => {
		expect(wrapper.find('.class1')).toExist();
	});

	//Element with class2 does not exist because shallow take the component without the children
	it('Element with class2 does not exist', () => {
		expect(wrapper.find('.class2')).not.toExist();
	});

	//Using fail()
	it('fail the test', function () {
		foo(false, function () {
			fail('Callback has been called');
		});

		//We use it for the next test
		this.variable = 'notUndefined';
	});

	//"this" sets back an empty object at every specs
	it('use of "this" keyword', function () {
		expect(this.variable).toBe(undefined);
	});
});
