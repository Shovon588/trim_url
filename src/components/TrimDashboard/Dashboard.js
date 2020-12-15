import React from 'react';
import './style.css';
import { Doughnut } from 'react-chartjs-2';

function Dashboard(props) {
	console.log('props: ', props);
	let chart = {
		labels: ['00-04', '04-08', '08-12', '12-16', '16-20', '20-00'],
		datasets: [
			{
				data: props.data.time_band,
				backgroundColor: [
					'#581845',
					'#900c3f',
					'#c70039',
					'#ff0000',
					'#ffc30f',

					'#ff5733',
				],
				borderWidth: 1,
			},
		],
	};

	console.log(chart);

	return (
		<div className='container mt-4' style={{ color: '#fff' }}>
			<h5 className='dash-link'>Link: {props.data.short_link}</h5>
			<div className='row mx-auto mt-4'>
				<div className='col-lg-4 small-div'>
					<div className='smaller-div'>
						<h5>Link Created</h5>
						<p>{props.data.created}</p>
					</div>
				</div>
				<div className='col-lg-4 small-div'>
					<div className='smaller-div'>
						<h5>Last Clicked</h5>
						<p>{props.data.updated}</p>
					</div>
				</div>
				<div className='col-lg-4 small-div'>
					<div className='smaller-div'>
						<h5>Total Clicks</h5>
						<p>{props.data.no_of_clicks}</p>
					</div>
				</div>
			</div>
			<div className='row mx-auto my-4'>
				<div className='col-lg-12 mx-auto'>
					<div className='dash-div'>
						<Doughnut
							data={chart}
							height={250}
							width={250}
							options={{
								responsive: true,
								maintainAspectRatio: false,
								title: {
									text: 'Clicks on different time.',
									display: true,
									fontColor: '#fff',
									fontSize: '17',
								},
							}}
							legend={{ display: false }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
