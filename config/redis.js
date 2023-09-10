const redis = require("redis")
const { logger } = require("../utils")

const redisURL = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`

class RedisManager {
	constructor() {
		if (!RedisManager.instance) {
			this.redisClient = redis.createClient({ url: redisURL })

			this.redisClient.on("connect", () => {
				logger.log("Redis client connected")
			})
			this.redisClient.on("error", error => {
				logger.error(error.message)
			})

			RedisManager.instance = this
		}

		return RedisManager.instance
	}
}

module.exports = new RedisManager()
