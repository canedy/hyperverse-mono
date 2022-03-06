const fcl = require('@onflow/fcl');
const t = require('@onflow/types');
import { HelloData } from '../types';

async function hello() {
	try {
		const Hellos = await fcl
			.send([
				fcl.script`
      import hellworld from 0xTribes
          
      pub fun main(): String {
          return HelloWorld.hello()
      }
      `,
				fcl.args([]),
			])
			.then(fcl.decode);

		return Hellos as HelloData[];
	} catch (error) {
		console.error(error);
	}
}

export { hello };
