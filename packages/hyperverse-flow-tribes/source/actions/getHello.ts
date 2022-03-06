const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { HelloData } from '../types';

async function getHello() {
	try {
		const hello = await fcl
			.send([
				fcl.script`
      import Tribes from 0xTribes
          
      pub fun main(): String {
					let name = Tribes.getHello()
          return name
      }
      `,
				fcl.args([]),
			])
			.then(fcl.decode);

		return hello as HelloData;
	} catch (error) {
		console.error(error);
	}
}

export { getHello };
