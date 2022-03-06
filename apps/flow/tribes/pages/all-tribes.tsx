import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Nav from '../components/Nav';
import Loader from '../components/Loader';
import { TribesData, useTribes } from '@decentology/hyperverse-flow-tribes';
import { HelloData } from '@decentology/hyperverse-flow-tribes';
import { useFlow } from '@decentology/hyperverse-flow';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Image from 'next/image';

const AllTribes = () => {
	const [loaderMessage, setLoaderMessage] = useState('Processing...');
	const [isLoading, setIsLoading] = useState(false);
	const [allTribes, setAllTribes] = useState<TribesData[]>([]);
	const [hello, setHello] = useState<HelloData>()
	const tribes = useTribes();
	const flow = useFlow();
	const router = useRouter();

	const getTheHello = useCallback(async () => {
		setHello(await tribes?.getHello());
	}, [setHello]
	);

	const getTheTribes = useCallback(async () => {
		setIsLoading(true);
		setLoaderMessage('Processing...');
		setAllTribes((await tribes?.getAllTribes()) || []);
		setIsLoading(false);
	}, [setAllTribes, setIsLoading, setLoaderMessage, tribes]);

	const joinATribe = useCallback(
		async (itemName: string) => {
			setIsLoading(true);
			setLoaderMessage('Joining a organization. Please wait.');
			await tribes?.joinTribe(itemName);
			router.push('/my-tribe');
			setIsLoading(false);
		},
		[router, setIsLoading, setLoaderMessage, tribes]
	);

	useEffect(() => {
		getTheTribes();
		getTheHello();
	}, [getTheTribes, getTheHello]);

	return (
		<main>
			<Nav />
			{isLoading ? (
				<Loader loaderMessage={loaderMessage} />
			) : (
				<div className={styles.container}>
					<h1>Volunteer Opportunities </h1>
					{flow?.loggedIn ? (
						!allTribes ? (
							<div>
								<h5>There are currently no existing volunteer opportunities.</h5>
								<a href="/">Go back home</a>
							</div>
						) : (
							<div>
								<h5>Select Your Organization</h5>
								<div className={styles.allTribes}>
									{allTribes.map((tribe, id) => {
										return (
											<div key={id} onClick={() => joinATribe(tribe.name)}>
												<Image
													width={240}
													height={300}
													className={styles.cards}
													src={`https://ipfs.infura.io/ipfs/${tribe.ipfsHash}/`}
													alt={tribe.name}
												/>
											</div>
										);
									})}

									
								</div>
							</div>
						)
					) : (
						<p className={styles.error}>Please connect your wallet to volunteer.</p>
					)}
				</div>
			)}
		</main>
	);
};

export default AllTribes;
