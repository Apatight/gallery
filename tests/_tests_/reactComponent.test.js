import React from 'react';
import Enzyme from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import Header from '../../client/src/header';

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
  let wrapper;
  let mounted;
  beforeEach(() => {
    wrapper = shallow(<Header />);
    // mounted = mount(<Header />)
  });

  it('should be defined', () => {
    expect(Header).toBeDefined();
  });
  it('should render one Header component', () => {
    expect(wrapper).toHaveLength(1);
  });
  // it('should render props correctly', () => {
  //   expect(mounted.props().id).toBe('5adeb3f05406dbedc8522709');
  // });
});
