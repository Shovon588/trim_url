import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import Input from './Input';
import Output from './Output';
import Oops from './Oops';
import DashboardInput from '../TrimDashboard/DashboardInput';
import Dashboard from '../TrimDashboard/Dashboard';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current_page: 'home',
			url: '',
			data: {},
			error: '',
		};
	}

	isValidURL = (str) => {
		var pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
				'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
				'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
				'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
				'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$',
			'i'
		);
		return !!pattern.test(str);
	};

	handleSubmit = () => {
		let url = document.querySelector('#url').value;
		let alias = document.querySelector('#alias').value;

		if (!this.isValidURL(url)) {
			alert('You need to enter a valid url.');
		} else {
			let api_url = 'http://127.0.0.1:8000/';
			let post_obj = {
				link: url,
			};
			if (alias !== '') {
				post_obj['alias'] = alias;
			}

			axios
				.post(api_url, post_obj)
				.then((response) => {
					if (response.status === 200) {
						this.setState({
							current_page: 'trim_output',
							url: response.data.data.short_link,
						});
					} else {
						console.log('res', response);
						this.setState({
							current_page: 'oops',
							error: 'The alias not available',
						});
					}
				})
				.catch((err) => {
					console.log('Error ', err);
					this.setState({
						current_page: 'oops',
						error: 'Not sure what happened.',
					});
				});
		}
	};

	copyLinkHandler = () => {
		var copyText = document.getElementById('copy-link');
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		document.execCommand('copy');
		document.querySelector('#link-copied').style.display = 'block';
	};

	lengthChecker = () => {
		let url = document.querySelector('#url').value;
		if (url.length === 0) {
			document.querySelector('#current-length').innerHTML = '';
			document.querySelector('#trimmed-length').innerHTML = '';
		} else {
			document.querySelector('#current-length').innerHTML =
				'Length of current url: ' + url.length;
			document.querySelector('#trimmed-length').innerHTML =
				'Length of trimmed url: 25';
		}
	};

	aliasChecker = () => {
		let alias = document.querySelector('#alias').value;
		if (alias.length !== 0) {
			document.querySelector('#alias-url').innerHTML =
				'Your url will be: http://127.0.0.1:8000/' + alias;
		} else {
			document.querySelector('#alias-url').innerHTML = '';
		}
	};

	tryAgain = () => {
		this.setState({
			current_page: 'home',
		});
		document.querySelector('#trim-toggle').style.background = '#B18237';
		document.querySelector('#dashboard-toggle').style.background = 'wheat';
	};

	fetchUrlInfo = () => {
		let url = document.querySelector('#url').value;
		let temp = url.split('/');
		let hashed_code;
		if (temp[temp.length - 1] === '') {
			hashed_code = temp[temp.length - 2];
		} else {
			hashed_code = temp[temp.length - 1];
		}

		let api_url = 'http://127.0.0.1:8000/click-info/' + hashed_code + '/';

		axios
			.get(api_url)
			.then((response) => {
				console.log('Response: ', response);
				if (response.status === 200) {
					this.setState({
						current_page: 'dash',
						data: response.data.data,
					});
				} else {
					this.setState({
						current_page: 'oops',
					});
				}
			})
			.catch((err) => {
				this.setState({
					current_page: 'oops',
				});
			});
	};

	toggleWindow = (where) => {
		if (where === 'trim') {
			document.querySelector('#trim-toggle').style.background = '#B18237';
			document.querySelector('#dashboard-toggle').style.background =
				'wheat';
			this.setState({
				current_page: 'home',
			});
		} else {
			document.querySelector('#trim-toggle').style.background = 'wheat';
			document.querySelector('#dashboard-toggle').style.background =
				'#B18237';
			this.setState({
				current_page: 'dash_input',
			});
		}
	};

	render() {
		let page_data = {
			home: (
				<Input
					handleSubmit={this.handleSubmit}
					lengthChecker={this.lengthChecker}
					aliasChecker={this.aliasChecker}
				/>
			),
			trim_output: (
				<Output
					copyLinkHandler={this.copyLinkHandler}
					openLinkHandler={this.openLinkHandler}
					url={this.state.url}
				/>
			),
			oops: <Oops tryAgain={this.tryAgain} error={this.state.error} />,
			dash: <Dashboard data={this.state.data} />,
			dash_input: <DashboardInput fetchUrlInfo={this.fetchUrlInfo} />,
		};

		let main_div = page_data[this.state.current_page];

		return (
			<div>
				<div className='nav-div'>
					<button
						className='trim-btn'
						id='trim-toggle'
						onClick={() => this.toggleWindow('trim')}>
						Trim URL
					</button>
					<button
						className='dashboard-btn'
						id='dashboard-toggle'
						onClick={() => this.toggleWindow('dashboard')}>
						Dashboard
					</button>
				</div>
				{main_div}
			</div>
		);
	}
}

export default App;
