import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
// @ts-ignore
import { TribesData, useTribes } from '@decentology/hyperverse-flow-tribes';
import { useFlow } from '@decentology/hyperverse-flow';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import Loader from '../components/Loader';
import { useCallback } from 'react';
import Image from 'next/image';

import content from '../DB/content.json'

const TribesPage = () => {
	const router = useRouter();
	const tribes = useTribes();
	const [currentTribe, setCurrentTribe] = useState<TribesData>();
	const [isLoading, setIsLoading] = useState(false);
	const [loaderMessage, setLoaderMessage] = useState('Processing...');
	const flow = useFlow();

	const getMyTribe = useCallback(async () => {
		setIsLoading(true);
		setLoaderMessage('Processing...');
		if (flow?.user?.addr) {
			setCurrentTribe(await tribes?.getCurrentTribe(flow.user.addr));
		}
		setIsLoading(false);
	}, [flow?.user, setIsLoading, setLoaderMessage, setCurrentTribe, tribes]);

	const leaveMyTribe = useCallback(async () => {
		setIsLoading(true);
		setLoaderMessage('Leaving your tribe. Please wait.');
		await tribes?.leaveTribe();
		setIsLoading(false);
		router.push('/all-tribes');
	}, [router, setIsLoading, setLoaderMessage, tribes]);

	useEffect(() => {
		if (flow?.loggedIn) {
			getMyTribe();
		}
	}, [flow, getMyTribe]);



	return (
		<main>
			<Nav />
			{isLoading ? (
				<Loader loaderMessage="Processing..." />
			) : flow?.loggedIn && currentTribe ? (
				<div className={styles.container2}>
					<div className={styles.container3}>
						{currentTribe.ipfsHash === 'N/A' ? (
							<div className={styles.tribeCard}>
								<h2>{currentTribe.name}</h2>
							</div>
						) : (
							<Image
								height={400}
								width={400}
								src={`https://ipfs.infura.io/ipfs/${currentTribe.ipfsHash}/`}
								alt={currentTribe.name}
								className="tribe"
							/>
						)}

						<div className='styles.leftContent'>
							<h1 className={styles.text}>{currentTribe.name}</h1>
							<p className={styles.description}>{currentTribe.description}</p>
							
											
							<br/><br/><br/>
							<h1 className={styles.text}>Team Schedule</h1>
							<br/><br/><br/>
							
							<ul>
							{ currentTribe.name === 'Buckeye Bucks' ? content.Buckeye.map((data) =>  <li>{data.Date} {data.Location.home} @ {data.Location.away}</li> )	: 
							currentTribe.name === 'Medina Bees' ? content.Medina.map((data) => <li>{data.Date} {data.Location.home} @ {data.Location.away}</li>  )	: 
							currentTribe.name === 'Brunswick Blue Devils' ? content.Brunswick.map((data) =>  <li>{data.Date} {data.Location.home} @ {data.Location.away}</li> )	: 'No Schedule Available' }
							</ul>
							
						</div>

					</div>
					
					<button className={styles.join} onClick={() => leaveMyTribe()}>
						Leave Oraganizaion
					</button>
				</div>

			) : (
				flow?.user &&
				flow.user.addr && (
					<div className={styles.container2}>
						<button className={styles.join} onClick={() => router.push('/all-tribes')}>
							Join a Organiation
						</button>
					</div>
				)
			)}

			{!flow?.user || !flow.user.addr ? (
				<div className={styles.container2}>
					<p className={styles.error}>Connect Wallet to view your tribe</p>
				</div>
			) : null}
		</main>
	);
}
export default TribesPage;
