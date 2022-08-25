/** @format */

import React, { useContext, useRef, useState } from 'react';
import { Button, Alert, Form } from 'react-bootstrap';
import { MyContext, MyContextType } from '../context';
const StageOne = () => {
	const textInputRef = useRef<any>();
	const context: MyContextType = useContext(MyContext);
	const [error, setError] = useState([false, '']);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const validate: boolean = validateInput(textInputRef.current.value);
		if (validate) {
			setError([false, '']);
			context.addPlayer(textInputRef.current.value.trim());
			textInputRef.current.value = '';
		}
	};

	const validateInput: (input: string) => boolean = (input) => {
		if (!input || input.trim().length == 0) {
			setError([true, 'Sorry, you need to add something']);
			return false;
		}
		if (input.trim().length < 2) {
			setError([true, 'Sorry, your input is too short.']);
			return false;
		}
		return true;
	};

	return (
		<>
			<Form onSubmit={(e) => handleSubmit(e)} className='mt-4'>
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Add player name'
						ref={textInputRef}
						name='player'
					/>
				</Form.Group>
				{error[0] ? <Alert>{error[1]}</Alert> : null}
				<Button className='miami' variant='primary' type='submit'>
					Add Player
				</Button>
			</Form>
			{context && context.state.players && context.state.players.length > 0 ? (
				<>
					<hr />
					<div>
						<ul className='list-group'>
							{context.state.players.map((player, index) => (
								<li
									key={index}
									className='list-group-item d-flex justify-content-between align-items-center list-group-item-action'
								>
									{player}
									<span
										className='badge badge-danger'
										onClick={() => context.removePlayer(player)}
									>
										X
									</span>
								</li>
							))}
						</ul>
						<div className='action_button' onClick={() => context.next()}>
							NEXT
						</div>
					</div>
				</>
			) : null}
		</>
	);
};

export default StageOne;
