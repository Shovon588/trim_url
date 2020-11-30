import React from 'react';

function Oops(props) {
	return (
		<div className='main-div'>
			<h2>Oops! Not sure what happened.</h2>
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
