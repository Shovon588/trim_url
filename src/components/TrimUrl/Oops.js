import React from 'react';

function Oops(props) {
	return (
		<div className='main-div' style={{ padding: '3%' }}>
			<h2>Oops! {props.error}</h2>
			<h4>
				Please,{' '}
				<a
					href='#'
					onClick={props.tryAgain}
					style={{ textDecoration: 'underline', color: '#fff' }}>
					Try again.
				</a>
			</h4>
		</div>
	);
}

export default Oops;
