#!/usr/bin/env node

const express = require('express')
const app = express()
const companies = require('./data/companies')

app.use(express.static('public'))

app.get('/api/companies', (req, res) => {
	const start = parseInt(req.query.start) || 0
	const limit = Math.min(parseInt(req.query.limit) || 10, 100)
	const q = req.query.q
	const laborTypes = (req.query.laborTypes || '')
		.split(',')
		.filter(x => x)

	const matchingCompanies = companies
		.filter((company) => {
			return q
				? company.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
				: true
		})
		.filter((company) => {
			return laborTypes.length
				? laborTypes
					.filter(lt => company.laborType.indexOf(lt) !== -1)
					.length === laborTypes.length
				: true
		})

	res.setHeader('Content-Type', 'application/json')
	res.json({
		total: matchingCompanies.length,
		results: matchingCompanies.slice(start, start + limit),
	})
})

app.listen(3000, () => {
	console.log('Commencing primary ignition')
})
