import React from 'react';
import { shallow } from 'enzyme';

import Expenses from '../Expenses';

let wrapper;

const createExpensesComponent = expenses => {
        wrapper = shallow(<Expenses expenses={expenses} />)
}

describe('Expenses Component', () => {

    describe("Renders with two expenses" , () => {
        beforeEach(() => {
            const expensesWithTwoItems = [
                { date: '2017-04-05', amount: 12 },
                { date: '2017-04-05', amount: 4 },
            ]
            createExpensesComponent(expensesWithTwoItems);
        });

        it('Expenses Component to exists', () => {
            expect(wrapper.exists()).toBeTruthy();
        });

        it('Div exists, with class expenses', () => {
            let div = wrapper.find('div');
            expect(div.exists()).toBeTruthy();
            expect(div.prop('className')).toEqual('expenses');
        })

        it('Paragraph exists, with text of first expense amount = 12', () => {
            let paragraph = wrapper.find('p');
            expect(paragraph.exists()).toBeTruthy();
            expect(paragraph.text()).toEqual("The first expense's amount is 12");
        })

        it('Expense component renders twice, one for each expense', () => {
            let component = wrapper.find('Expense');
            expect(component.length).toEqual(2);
        });

    })

    describe("Renders with no expenses" , () => {
        beforeEach(() => {
            const expensesWithNoExpenses = [];
            createExpensesComponent(expensesWithNoExpenses);
        });

        it('Expenses Component to exists', () => {
            expect(wrapper.exists()).toBeTruthy();
        });

         it('Div exists, with class expenses', () => {
            let div = wrapper.find('div');
            expect(div.exists()).toBeTruthy();
            expect(div.prop('className')).toEqual('expenses');
         });

         it('does not render first expense paragram amount', () => {
            let component = wrapper.find('p');
            expect(component.exists()).toBeFalsy();
         });

         it('does not render Expense component', () => {
            let component = wrapper.find('Expense');
            expect(component.exists()).toBeFalsy();
         });
    })
});

/*

 add enzyme to apps create with 'react starter


 yarn add enzyme react-test-renderer jest-enzyme --dev
 echo "import 'jest-enzyme';" >> src/setupTests.js

 */