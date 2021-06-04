import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
	constructor() {
		this.queue = {};

		this.init();
	}

	init() {}
}

export default new Queue();
