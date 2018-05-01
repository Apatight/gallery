import React from 'react';
import Enzyme from 'enzyme';
import { mount, render, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';


configure({ adapter: new Adapter() });

global.mount = mount;
global.render = render;
global.shallow = shallow;
global.fetch = jest.fn();
