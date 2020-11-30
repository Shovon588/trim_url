import React from 'react';

function Input(props) {
	return (
		<div className='main-div'>
			<h2>Got an ugly url? Trim it!</h2>
			<div className='insider-div'>
				<input
					className='input-field'
					type='text'
					id='url'
					placeholder='Enter your ugly url'
					onChange={props.lengthChecker}
				/>
				<button className='input-button' onClick={props.handleSubmit}>
					Trim
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

export default Input;
