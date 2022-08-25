/** @format */

import React, { useContext } from 'react';
import { MyContext } from '../context';
import { Spinner } from 'react-bootstrap';
const StageTwo = () => {
	const context = useContext(MyContext);
	return (
		<>
			<div className='align-items-center'>
				Looser is :
				{context.state.result ? (
					context.state.result
				) : (
					<Spinner
						animation='border'
						color='red'
						className='align-items-center'
					/>
				)}
			</div>
			<div
				className='action_button'
				onClick={() => {
					context.resetGame();
				}}
			>
				Start Over
			</div>
			<div
				className='action_button btn_2'
				onClick={() => {
					context.next();
				}}
			>
				New Looser
			</div>
		</>
	);
};

export default StageTwo;
