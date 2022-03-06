import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import { useFlow } from '@decentology/hyperverse-flow';
import { TribesData, useTribes } from '@decentology/hyperverse-flow-tribes';

import { useCallback } from 'react';

const Home: NextPage = () => {
	const [currentTribe, setCurrentTribe] = useState<TribesData>();

	const router = useRouter();
	const tribes = useTribes();

	const flow = useFlow();

	const getUserTribe = useCallback(async () => {
		if (flow?.user?.addr != null) {
			setCurrentTribe(await tribes?.getCurrentTribe(flow.user.addr));
		}
	}, [flow, setCurrentTribe, tribes]);
	useEffect(() => {
		if (flow?.loggedIn) {
			getUserTribe();
		}
	}, [flow, getUserTribe]);

	return (
		<div>
			<Head>
				<title>Volunteer Dapp</title>
				<meta
					name="description"
					content="Volunteer Dapp utilizing tribes module from hyperverse"
				/>
			</Head>

			<main>
				<Nav />
				<div className={styles.hero}>
					<div className={styles.header}>
						<h1>Volunteer Dapp</h1>
						<p>
							Volunteer Dapp uses the Hyperverse in which you can join and leave your
							favorite Tribes. With additional ability to display Team Schedule based on team selection
						</p>
						{flow?.loggedIn ? (
							!currentTribe ? (
								<button
									className={styles.join}
									onClick={() => {
										router.push('/all-tribes');
									}}
								>
									Volunteer Now
								</button>
							) : (
								<button
									className={styles.join}
									onClick={() => router.push('/my-tribe')}
								>
									View Your Team
								</button>
							)
						) : null}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
