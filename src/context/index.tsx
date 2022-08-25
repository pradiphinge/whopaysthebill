/** @format */

import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyContext = React.createContext({} as MyContextType);

type Props = {
	children: React.ReactNode;
};

export type MyContextType = {
	state: {
		stage: number;
		players: string[];
		result: string;
	};
	addPlayer: Function;
	removePlayer: Function;
	next: Function;
	resetGame: Function;
};

class MyProvider extends Component<Props> {
	state = {
		stage: 1,
		players: [],
		result: '',
	};

	addPlayerHandler: (name: string) => void = (name) => {
		if (
			!name ||
			this.state.players.filter((player) => name == player).length > 0
		) {
			toast.info(`You have ${name} ready to play`, {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000,
			});
			return;
		}
		this.setState((prevState: any) => ({
			players: [...prevState.players, name],
		}));
	};
	removePlayerHandler: (name: string) => void = (name) => {
		this.setState((prevState: any) => ({
			players: prevState.players.filter((player: string) => player != name),
		}));
	};
	nextHandler: () => void = () => {
		this.setState({ result: '' });
		if (this.state.players.length < 2) {
			toast.error('You need more than 2 players to play', {
				position: toast.POSITION.TOP_CENTER,
				autoClose: 2000,
			});
			return;
		}
		this.setState({ stage: 2 }, () => {
			setTimeout(() => {
				this.setState({ result: this.generateLooser() });
			}, 2000);
		});
	};

	generateLooser = () => {
		const { players } = this.state;
		return players[Math.floor(Math.random() * players.length)];
	};
	resetGame = () => {
		this.setState({
			stage: 1,
			result: '',
			players: [],
		});
	};
	render() {
		return (
			<>
				<MyContext.Provider
					value={{
						state: this.state,
						addPlayer: this.addPlayerHandler,
						removePlayer: this.removePlayerHandler,
						next: this.nextHandler,
						resetGame: this.resetGame,
					}}
				>
					{this.props.children}
				</MyContext.Provider>
				<ToastContainer />
			</>
		);
	}
}

export { MyContext, MyProvider };
