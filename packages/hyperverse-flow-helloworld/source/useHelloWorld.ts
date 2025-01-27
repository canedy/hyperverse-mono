import { networks, useHyperverse } from '@decentology/hyperverse';
import { useEffect, useState } from 'react';
import { createContainer } from '@decentology/unstated-next';
import * as actions from './actions';
const fcl = require('@onflow/fcl');

function HelloState(initialState: { tenantId: string } = { tenantId: '' }) {
	const [isInitialized, setInitialized] = useState<boolean>(false);

	let { network } = useHyperverse();

	const tenantId = initialState.tenantId;
	const initialize = async () => {
		if (network === networks.Mainnet) {
			// TODO: Deploy to Flow Mainnet.
		} else if (network === networks.Testnet) {
			fcl.config().put('0xTribes', '0x1960ff14acc51991');
		}

		const TribesAddress = await fcl.config().get('0xTribes');
		if (typeof TribesAddress !== 'undefined') {
			setInitialized(true);
		} else {
			setInitialized(false);
		}
	};

	useEffect(() => {
		initialize();
	}, []);

	return {
		isInitialized,
		getHello: actions.getHello,
	};
}

export const FlowHelloContainer = createContainer(HelloState);
export const Provider = FlowHelloContainer.Provider;
export function useHelloWorld() {
	return FlowHelloContainer.useContainer();
}
