import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from "react";
import Balance from "./Balance";

Enzyme.configure({ adapter: new Adapter() });

const accountProps = {
    balance: 1300,
    saving: 2300
}

describe("rendering components", () => {
    it("render Balance component without crashing", () => {
        shallow(<Balance />)
    })
    it("render buttons", () => {
        const wrapper = shallow(<Balance accounts={accountProps} />)
        const label = wrapper.find('#balance-button').text();
        expect(label).toEqual('Send 100$')
    })
})

describe("passing props to balance component", () => {
    const wrapper = shallow(<Balance accounts={accountProps} />)
    it("accepts user account props", () => {
        const _props = wrapper.props({ accounts: accountProps })
        console.log(_props)
    })
})
