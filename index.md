# BlockChainVoting

A blockchain-based E-voting system, created as the final year project of Shri Bhagubhai Mafatlal Polytechnic. Teammates include me, Sayyam Gada and Charmee Mehta.
> The application is MIT-Licensed.

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start
```

Create your own <b>.env</b> file and the file should contain:
```bash
EMAIL=YOUR_EMAIL_ID
PASSWORD=YOUR_PASSWORD_FOR_EMAIL_ID
```
Install MetaMask extension (https://metamask.io/download.html) and make sure to have some Ether to test the application locally. Ether can be fetched from Rinkeby Faucet (https://faucet.rinkeby.io)

#### Note:
- Make sure to install Node.js v11.14.0 to make sure the app runs fine. Testing for other node versions is yet to be done.
- MongoDB must be working in background on localhost:27017

###### Please star the repo if it helped you in any way!

## Tech Stack:

- Solidity/Web3 (for writing/connecting the Blockchain contract)
- Next.js & Semantic UI React (front-end)
- MongoDB/ExpressJS/Node.js (back-end)
- IPFS (file storage for images)

## Screenshots of the app:

Homepage of the application:

<img src="https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/homepage.PNG" alt="..."/>

Company registers/logs in:

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/company_login.PNG)

Company creates an election if not created:

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/create_election.PNG)

Dashboard on successful election creation:

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/dashboard.PNG)

List of candidates for the election (here, you can add candidates):

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/candidate_list.PNG)

Candidate has been notified on the mail:

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/candidate_registeration_mail.PNG)

List of voters for the election (here, you can add voters):

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/voterlist.PNG)

Voters have been sent their secure usernames and passwords on the mail:

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/voter_registeration_mail.PNG)

Voter login page:

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/voter_login.PNG)

Successful voting scenario:

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/successful_voting.PNG)

Unsuccessful voting scenario:

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/unsuccessful_voting.PNG)

Notification to each candidate and voter for the winner of candidates:

![](https://raw.githubusercontent.com/mehtaAnsh/BlockChainVoting/master/screenshots/winner_candidate_mail.PNG)
