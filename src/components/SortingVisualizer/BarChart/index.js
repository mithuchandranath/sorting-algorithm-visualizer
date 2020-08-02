import React from 'react';
import './style.css';
import Bar from '../Bar';

const BarChart = ({ config }) => {

	const barWidth = 100 / config.arr.length;
	const maxElement = Math.max(...config.arr);
	const windowWidth = window.innerWidth
		|| document.documentElement.clientWidth
		|| document.body.clientWidth;

	const getBarMarginRight = (barWidth) => {
		// 0.5 max and 0.125 min
		let margin = '';
		if (barWidth === 1) margin = 0.125;
		else margin = 0.125 + (0.5 - 0.125) / 20 * barWidth;

		return `${margin}rem`;
	}

	return (
		<div className='BarChart'>
			{
				config.arr.map((element, i) => {

					let barHeight = ((element / maxElement) * 95) + 5;
					let marginRight = i === config.arr.length - 1 ? '0' : getBarMarginRight(barWidth);
					let stateA = config.stateA.includes(i);
					let stateB = config.stateB.includes(i);
					let stateC = config.stateC.includes(i);
					let stateD = config.stateD.includes(i);
					let sorted = config.sortedIdx.includes(i);

					return (
						<Bar
							key={i}
							val={windowWidth < 768 && config.arr.length <= 10 ? element : windowWidth >= 768 && config.arr.length <= 20 ? element : null}
							stateA={stateA}
							stateB={stateB}
							stateC={stateC}
							stateD={stateD}
							sorted={sorted}
							style={{
								width: `${barWidth}%`,
								height: `${barHeight}%`,
								marginRight: marginRight
							}} />
					)
				})
			}
		</div>

	)

}

export default BarChart;