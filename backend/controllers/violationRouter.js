const { Router } = require('express')
const violationService = require('../utils/violationService')

const router = Router()

router.get('/violations', async (req, res) => {
	const violations = await violationService.getViolations()

	res.json(violations)
})

module.exports = router
