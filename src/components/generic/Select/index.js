import React from 'react';
import './style.css';

const Select = ({ onSelect, options, selectedOption }) => {
	const onChangeHandler = (e) => {
		onSelect(e.target.value);
	}
	const isOptionsArray = options instanceof Array;

	return (
		<select onChange={onChangeHandler} value={selectedOption}>
			{
				Object.entries(options).map(([key, value]) => {
					let finalValue = isOptionsArray ? value : key;
					return <option key={key} value={finalValue}>{value}</option>
				}
				)
			}

		</select>
	)


}

export default Select;