import React, { Component } from 'react';
import { Grid, Step, Icon, Menu, Sidebar, Container, Modal, Card, Header, Button, Item } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';
import Election from '../../Ethereum/election';
import Cookies from 'js-cookie';
import web3 from '../../Ethereum/web3';
import { Link, Router } from '../../routes';
import { Helmet } from 'react-helmet';

var b = 0;
let cand = [];
let graphEmail = [];
let graphVotes = [];

const options = {
	maintainAspectRatio: true,
	responsive: true,
	scales: {
		yAxes: [
			{
				height: '500px',
				stacked: true,
				gridLines: {
					display: true,
					color: 'rgba(255,99,132,0.2)',
				},
			},
		],
		xAxes: [
			{
				width: '500px',
				gridLines: {
					display: false,
				},
			},
		],
	},
};

const data = {
	labels: graphEmail,
	datasets: [
		{
			label: 'Vote Counts',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 2,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: graphVotes,
		},
	],
};

class ContainerExampleContainer extends Component {
	state = {
		election_address: Cookies.get('address'),
		election_name: '',
		election_desc: '',
		voters: 0,
		candidates: 0,
		visible: false,
		loading: false,
		b: 0,
	};
	async componentDidMount() {
		var http = new XMLHttpRequest();
		var url = '/voter/';
		var params = 'election_address=' + Cookies.get('address');
		http.open('POST', url, true);
		//Send the proper header information along with the request
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function () {
			//Call a function when the state changes.
			if (http.readyState == 4 && http.status == 200) {
				var responseObj = JSON.parse(http.responseText);
				if (responseObj.status == 'success') {
					b = responseObj.count;
				}
			}
		};
		http.send(params);
		try {
			const add = Cookies.get('address');
			const election = Election(add);
			const summary = await election.methods.getElectionDetails().call();
			const v = await election.methods.getNumOfVoters().call();
			this.setState({ voters: v });
			const c = await election.methods.getNumOfCandidates().call();
			this.setState({ candidates: c });
			this.setState({
				election_name: summary[0],
				election_desc: summary[1],
			});

			for (let i = 0; i < c; i++) {
				const tp = await election.methods.getCandidate(i).call();
				graphEmail.push(tp[0]);
				graphVotes.push(tp[3]);
			}
			this.returnGraph();
		} catch (err) {
			console.log(err.message);
			alert('Redirecting you to login page...');
			Router.pushRoute('/company_login');
		}
		this.setState({ b: b });
	}

	getElectionDetails = () => {
		const { election_name, election_desc } = this.state;

		return (
			<div style={{ marginLeft: '43%', marginBottom: '2%', marginTop: '2%', float: 'left' }}>
				<Header as="h2">
					<Icon name="address card" />
					<Header.Content>
						{election_name}
						<Header.Subheader>{election_desc}</Header.Subheader>
					</Header.Content>
				</Header>
			</div>
		);
	};
	CardExampleGroupProps = () => <Card.Group></Card.Group>;
	GridExampleGrid = () => <Grid>{columns}</Grid>;
	SidebarExampleVisible = () => (
		<Sidebar.Pushable>
			<Sidebar
				as={Menu}
				animation="overlay"
				icon="labeled"
				inverted
				vertical
				visible
				width="thin"
				style={{ backgroundColor: 'white', borderWidth: '10px' }}
			>
				<Menu.Item as="a" style={{ color: 'grey' }}>
					<h2>MENU</h2>
					<hr />
				</Menu.Item>
				<Link route={`/election/${Cookies.get('address')}/company_dashboard`}>
					<a>
						<Menu.Item style={{ color: 'grey', fontColor: 'grey' }}>
							<Icon name="dashboard" />
							Dashboard
						</Menu.Item>
					</a>
				</Link>
				<Link route={`/election/${Cookies.get('address')}/candidate_list`}>
					<a>
						<Menu.Item as="a" style={{ color: 'grey' }}>
							<Icon name="user outline" />
							Candidate List
						</Menu.Item>
					</a>
				</Link>
				<Link route={`/election/${Cookies.get('address')}/voting_list`}>
					<a>
						<Menu.Item as="a" style={{ color: 'grey' }}>
							<Icon name="list" />
							Voter List
						</Menu.Item>
					</a>
				</Link>
				<hr />
				<Button onClick={this.signOut} style={{ backgroundColor: 'white' }}>
					<Menu.Item as="a" style={{ color: 'grey' }}>
						<Icon name="sign out" />
						Sign Out
					</Menu.Item>
				</Button>
			</Sidebar>
		</Sidebar.Pushable>
	);
	signOut() {
		Cookies.remove('address');
		Cookies.remove('company_email');
		Cookies.remove('company_id');
		alert('Logging out.');
		Router.pushRoute('/homepage');
	}
	endElection = async event => {
		let candidate = 0;
		try {
			this.setState({ loading: true });
			const add = Cookies.get('address');
			const election = Election(add);
			candidate = await election.methods.winnerCandidate().call();
			cand = await election.methods.getCandidate(candidate).call();
			var http = new XMLHttpRequest();
			var url = '/voter/resultMail';
			var params =
				'election_address=' +
				Cookies.get('address') +
				'&election_name=' +
				this.state.election_name +
				'&candidate_email=' +
				cand[4] +
				'&winner_candidate=' +
				cand[0];
			http.open('POST', url, true);
			//Send the proper header information along with the request
			http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			http.onreadystatechange = function () {
				//Call a function when the state changes.
				if (http.readyState == 4 && http.status == 200) {
					var responseObj = JSON.parse(http.responseText);
					if (responseObj.status == 'success') {
						alert('Mail sent!');
					} else {
						alert(responseObj.message);
					}
				}
			};
			this.setState({ loading: true });
			http.send(params);
		} catch (err) {
			console.log(err.message);
		}
	};

	returnModal = () => <h1>I won the election</h1>;

	returnGraph = () => <Bar data={data} width={120} height={50} options={options} />;

	render() {
		return (
			<div>
				<Helmet>
					<title>Dashboard</title>
					<link rel="shortcut icon" type="image/x-icon" href="../../static/logo3.png" />
				</Helmet>
				<Grid>
					<Grid.Row>
						<Grid.Column width={2}>{this.SidebarExampleVisible()}</Grid.Column>

						<Layout>
							<Grid.Column width={16}>
								{this.getElectionDetails()}
								<Button
									negative
									style={{ float: 'right', marginTop: '2%' }}
									onClick={this.endElection}
									loading={this.state.loading}
								>
									End election
								</Button>
								<Step.Group style={{ minWidth: 1130, minHeight: 90 }}>
									<Step icon="users" title="Voters" description={this.state.b} />
									<Step icon="user outline" title="Candidates" description={this.state.candidates} />
									<Step
										icon="chart bar outline"
										title="Total Votes"
										description={this.state.voters}
									/>
								</Step.Group>
								{this.CardExampleGroupProps()}

								<Grid.Column>
									<br />
									<div className="he">
										<style jsx>{`
											.he {
												height: 50%;
												max-width: 100%;
											}
										`}</style>
										{this.returnGraph()}
									</div>
								</Grid.Column>
							</Grid.Column>
						</Layout>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default ContainerExampleContainer;
