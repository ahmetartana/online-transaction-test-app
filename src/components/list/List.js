import { useState } from 'react';

export default function List({ valueList = [] }) {
    const [list, setList] = useState(valueList);
    const [value, setValue] = useState('');

    const onClickAddButton = () => {
        if (list && !list.some(item => item === value)) {
            const newValueList = [...list, value];
            setList(newValueList);
            setValue('');
        }
    };

    const whenOnChangeInput = (props) => {
        const { target: { value } } = props;
        setValue(value);
    };

    return (
        <>
            <h3>TODOs</h3>
            <label>Add new item</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input placeholder="input text..." value={value} onChange={whenOnChangeInput}></input>
                <button onClick={onClickAddButton}> Add # {list.length} </button>
            </div>
            <ul key={'list'} data-testid={"list"}>
                {list.length > 0 && list.map((listelement, index) => <li id={'list-key' + index} key={'list-key' + index}>{listelement}</li>)}
            </ul>
        </>
    );
}