#!/usr/bin/env node

const fs = require('fs')
const MongoClient = require('mongodb').MongoClient
const chance = require('chance').Chance()

MongoClient.connect('mongodb://localhost:27018/bc-local', (err, db) => {
	db.collection('Companies')
		.find(
			{ avatarUrl: { $ne: null } },
			{ _id: 0, avatarUrl: 1, name: 1, laborType: 1 }
		)
		.limit(500)
		.toArray()
		.then(companies => companies.map(company => ({
			avatarUrl: company.avatarUrl,
			laborType: company.laborType,
			name: company.name,
			phone: chance.phone(),
			website: chance.url(),
		})))
		.then(fakeCompanies => {
			fs.writeFileSync(
				'data/companies.js',
`module.exports = [
${fakeCompanies.map(c => JSON.stringify(c, null, 2)).join(',\n')}
]`
			)
		})
		.then(() => { db.close() })
})
