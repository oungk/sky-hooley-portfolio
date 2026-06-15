import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { google } from 'googleapis'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'data')

const SPREADSHEET_ID = process.env.SPREADSHEET_ID?.trim()
const SA_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
const SA_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS

const TAB_EXPERIENCE_WORK = 'Experience_Work'
const TAB_EXPERIENCE_SKILLS = 'Experience_Skills'

function headerToKey(h) {
	if (h == null || String(h).trim() === '') return null
	return String(h)
	  .trim()
	  .toLowerCase()
	  .replace(/\s+/g, '_')
	  .replace(/[^a-z0-9_]/g, '')
  }

function rowsToRecords(rows) {
	if (!rows?.length) return []
	const rawHeaders = rows[0].map((c) => headerToKey(c))
	const headers = []
	const used = new Set()
	for (let i = 0; i < rawHeaders.length; i++) {
		let key = rawHeaders[i]
		if (!key) {
		key = `column_${i + 1}`
		while (used.has(key)) key = `column_${i + 1}_${used.size}`
		}
		while (used.has(key)) key = `${key}_2`
		used.add(key)
		headers.push(key)
	}

	const out = []
  for (let r = 1; r < rows.length; r++) {
    const line = rows[r] || []
    if (!line.some((c) => c != null && String(c).trim() !== '')) continue
    const obj = {}
    for (let c = 0; c < headers.length; c++) {
      const v = line[c]
      obj[headers[c]] = v == null ? '' : String(v)
    }
    out.push(obj)
  }
  return out
}

async function getAuth() {
	if (SA_JSON) {
	  const credentials = JSON.parse(SA_JSON)
	  return new google.auth.GoogleAuth({
		credentials,
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
	  })
	}
	if (SA_PATH) {
	  return new google.auth.GoogleAuth({
		keyFile: SA_PATH,
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
	  })
	}
	throw new Error(
	  'Set GOOGLE_SERVICE_ACCOUNT_JSON (JSON string) or GOOGLE_APPLICATION_CREDENTIALS (path to key file).',
	)
  }

  async function main() {
	if (!SPREADSHEET_ID) {
	  throw new Error('Set SPREADSHEET_ID to your Google Sheet document ID.')
	}
	const auth = await getAuth()
	const sheets = google.sheets({ version: 'v4', auth })
	const ranges = [
	  `${TAB_EXPERIENCE_WORK}!A:ZZ`,
	  `${TAB_EXPERIENCE_SKILLS}!A:ZZ`,
	  'Home!A:ZZ',
	  'Zine!A:ZZ',
	  'Photography!A:ZZ',
	]

	const { data } = await sheets.spreadsheets.values.batchGet({
		spreadsheetId: SPREADSHEET_ID,
		ranges,
	  })

	const vr = data.valueRanges || []
	const workRows = vr[0]?.values || []
	const skillsRows = vr[1]?.values || []
	const homeRows = vr[2]?.values || []
	const zineRows = vr[3]?.values || []
	const photoRows = vr[4]?.values || []
	const experience = {
		work: rowsToRecords(workRows),
		skills: rowsToRecords(skillsRows),
  	}

	await mkdir(OUT_DIR, { recursive: true })
	await writeFile(
	join(OUT_DIR, 'experience.json'),
	`${JSON.stringify(experience, null, 2)}\n`,
	'utf8',
	)
	await writeFile(
	join(OUT_DIR, 'home.json'),
	`${JSON.stringify(rowsToRecords(homeRows), null, 2)}\n`,
	'utf8',
	)
	await writeFile(
	join(OUT_DIR, 'zine.json'),
	`${JSON.stringify(rowsToRecords(zineRows), null, 2)}\n`,
	'utf8',
	)
	await writeFile(
	join(OUT_DIR, 'photography.json'),
	`${JSON.stringify(rowsToRecords(photoRows), null, 2)}\n`,
	'utf8',
	)
	console.log(
	`Wrote public/data: experience.json (${experience.work.length} work, ${experience.skills.length} skills), home (${rowsToRecords(homeRows).length}), zine (${rowsToRecords(zineRows).length}), photography (${rowsToRecords(photoRows).length}).`,
	)
}
main().catch((err) => {
  console.error(err)
  process.exit(1)
})