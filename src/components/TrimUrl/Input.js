import React from 'react';

function Input(props) {
	return (
		<div className='main-div' style={{ padding: '3%' }}>
			<h2>Got an ugly url? Trim it!</h2>
			<div className='insider-div'>
				<input
					className='input-field'
					type='text'
					id='url'
					placeholder='Enter your ugly url'
					onChange={props.lengthChecker}
				/>

				<input
					className='input-alias'
					type='text'
					id='alias'
					placeholder='ALIAS'
					onChange={props.aliasChecker}
				/>
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

			<p id='alias-url' style={{ color: '#000', fontWeight: '600' }}></p>

			<button className='input-button' onClick={props.handleSubmit}>
				Trim
			</button>
		</div>
	);
}

export default Input;
