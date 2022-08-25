/** @format */

import React, { useContext } from 'react';
import { MyContext, MyContextType } from './context';

import StageOne from './components/StageOne';
import StageTwo from './components/StageTwo';
import './styles/index.scss';

const App = () => {
	const context = useContext(MyContext) as MyContextType;

	return (
		<div className='wrapper'>
			<div className='center-wrapper'>
				<h1>Who Pays the bill ?</h1>
				{context.state.stage == 1 ? <StageOne /> : <StageTwo />}
			</div>
		</div>
	);
};

export default App;
