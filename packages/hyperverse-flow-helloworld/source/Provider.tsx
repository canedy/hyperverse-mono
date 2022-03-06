import { HyperverseModuleInstance } from '@decentology/hyperverse';
import { FC } from 'react';
import { Provider as HelloProvider } from './useHelloWorld';

export const Provider: FC<HyperverseModuleInstance> = ({ children, tenantId }) => {
	return <HelloProvider initialState={{ tenantId: tenantId || '' }}>{children}</HelloProvider>;
};


