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
			input: true,
			output: false,
			dashboard_input: false,
			dashboard: false,
			oops: false,
			url: '',
			data: {},
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
		if (!this.isValidURL(url)) {
			alert('You need to enter a valid url.');
		} else {
			let api_url = 'http://127.0.0.1:8000/';
			let post_obj = {
				link: url,
			};
			axios
				.post(api_url, post_obj)
				.then((response) => {
					if (response.status === 200) {
						this.setState({
							input: false,
							output: true,
							oops: true,
							url: response.data.data.short_link,
						});
					} else {
						this.setState({
							input: false,
							output: false,
							oops: true,
						});
					}
				})
				.catch((err) => {
					this.setState({
						input: false,
						output: false,
						oops: true,
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

	tryAgain = () => {
		this.setState({
			input: true,
			output: false,
			oops: false,
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
						dashboard_input: false,
						dashboard: true,
						oops: false,
						data: response.data.data,
					});
				} else {
					this.setState({
						dashboard_input: false,
						dashboard: false,
						oops: true,
					});
				}
			})
			.catch((err) => {
				this.setState({
					dashboard_input: false,
					dashboard: false,
					oops: true,
				});
			});
	};

	toggleWindow = (where) => {
		if (where === 'trim') {
			document.querySelector('#trim-toggle').style.background = '#B18237';
			document.querySelector('#dashboard-toggle').style.background =
				'wheat';
			this.setState({
				input: true,
				output: false,
				dashboard_input: false,
				dashboard: false,
				oops: false,
			});
		} else {
			document.querySelector('#trim-toggle').style.background = 'wheat';
			document.querySelector('#dashboard-toggle').style.background =
				'#B18237';
			this.setState({
				input: false,
				output: false,
				dashboard_input: true,
				dashboard: false,
				oops: false,
			});
		}
	};

	render() {
		let main_div;
		if (this.state.input) {
			main_div = (
				<Input
					handleSubmit={this.handleSubmit}
					lengthChecker={this.lengthChecker}
				/>
			);
		} else if (this.state.output) {
			main_div = (
				<Output
					copyLinkHandler={this.copyLinkHandler}
					openLinkHandler={this.openLinkHandler}
					url={this.state.url}
				/>
			);
		} else if (this.state.dashboard_input) {
			main_div = <DashboardInput fetchUrlInfo={this.fetchUrlInfo} />;
		} else if (this.state.dashboard) {
			main_div = <Dashboard data={this.state.data} />;
		} else {
			main_div = <Oops tryAgain={this.tryAgain} />;
		}

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
