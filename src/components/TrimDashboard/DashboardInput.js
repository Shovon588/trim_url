import React from 'react';
import './style.css';

function DashboardInput(props) {
	return (
		<div className='main-div' style={{ padding: '3%' }}>
			<h2>Check your url status.</h2>
			<div className='insider-div'>
				<input
					className='input-field'
					type='text'
					id='url'
					placeholder='Enter your pretty url'
					onChange={props.lengthChecker}
				/>
				<button className='input-button' onClick={props.fetchUrlInfo}>
					Check
				</button>
			</div>
			<p
				id='current-length'
				style={{
					color: '#dc3545',
					marginTop: '4%',
					fontWeight: '600',
				}}></p>
			<p
				id='trimmed-length'
				style={{ color: '#28a745', fontWeight: '600' }}></p>
		</div>
	);
}

export default DashboardInput;
