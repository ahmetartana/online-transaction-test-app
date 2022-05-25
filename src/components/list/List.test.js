import { cleanup, fireEvent, render } from '@testing-library/react';
import List from './List';

const addElementToList = (getByPlaceholderText, getByText, inputValue) => {
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.change(getByPlaceholderText("input text..."), { target: { value: inputValue } })
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText((content, element) => content.startsWith('Add #')));
}

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

test("renders the correct contents", () => {
    const { getByText, getByPlaceholderText } = render(
        <List />,
    );

    // eslint-disable-next-line testing-library/prefer-screen-queries
    getByText("TODOs");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    getByText("Add new item");
    // eslint-disable-next-line testing-library/prefer-screen-queries
    getByPlaceholderText("input text...")
    // eslint-disable-next-line testing-library/prefer-screen-queries
    getByText((element) => element.startsWith('Add #'))
})

test("add item the after click", () => {
    const { getByText, getByPlaceholderText } = render(<List />);

    for (let index = 0; index < 2; index++) {
        addElementToList(getByPlaceholderText, getByText, `Element ${index}`)
        // eslint-disable-next-line testing-library/prefer-screen-queries
        getByText((content) => content.startsWith(`Add # ${index + 1}`))
    }

    // eslint-disable-next-line testing-library/prefer-screen-queries
    // expect(getByTestId("list")).toMatchSnapshot();
});

test("same element control in list", () => {
    const { getByText, getByPlaceholderText } = render(<List />);
    addElementToList(getByPlaceholderText, getByText, 'Check-out');
    addElementToList(getByPlaceholderText, getByText, 'Check-out');
    // eslint-disable-next-line testing-library/prefer-screen-queries
    getByText((content) => content.startsWith('Add # 1'))
})

test("check list element by server api", async () => {
    const { getByText, getByPlaceholderText } = render(<List />);

    // eslint-disable-next-line jest/valid-expect-in-promise
    await fetch(
        "https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((dataList = []) => {

            if (dataList) {
                dataList.forEach((element, index) => {
                    addElementToList(getByPlaceholderText, getByText, element.name)
                    // eslint-disable-next-line testing-library/prefer-screen-queries
                    getByText((content) => content.startsWith(`Add # ${index + 1}`))
                });
            }
        })
        .finally(() => {
            // eslint-disable-next-line testing-library/prefer-screen-queries
            // expect(getByTestId("list")).toMatchSnapshot();
        })
})

