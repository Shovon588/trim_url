import React from 'react';

function Input(props) {
	console.log(props);
	return (
		<div className='main-div'>
			<h2>Nice! Short link is ready.</h2>
			<div className='insider-div'>
				<input
					className='input-field'
					type='text'
					id='copy-link'
					value={props.url}
					onClick={props.copyLinkHandler}
					style={{ minWidth: '26%', overflow: 'hidden' }}
					readOnly
				/>

				<p
					id='link-copied'
					style={{
						fontSize: '14px',
						display: 'none',
						color: '#928af9',
					}}>
					Link copied to clipboard.
				</p>
				<p id='link-copied'>
					<span>
						<a
							href={props.url}
							target='_blank'
							rel='noopener noreferrer'>
							[Open in new tab]
						</a>
					</span>
					<span style={{ marginLeft: '10px', marginRight: '10px' }}>
						|
					</span>
					<span>
						<a href='#' onClick={props.copyLinkHandler}>
							[Copy link]
						</a>
					</span>
				</p>
			</div>
		</div>
	);
}

export default Input;
