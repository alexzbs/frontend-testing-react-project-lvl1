import nock from 'nock'
import os from 'os'
import path from 'path'
import fs from 'fs/promises'

import pageLoaderCore from '../src/pageLoaderCore.js'

const getFixturePath = (name) => path.join('__fixtures__', name)

nock.disableNetConnect()

let expected
let dir
const url = 'https://google.com'
const formattedName = 'google-com.html'

beforeAll(async () => {
    expected = await fs.readFile(getFixturePath('fakeGoogle.html'), 'utf-8')
})

beforeEach(async () => {
    dir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'))

    nock(/google\.com/)
        .persist()
        .get('/')
        .reply(200, expected)
})

afterAll(() => {
    fs.unlink(formattedName)
})

test('pageLoaderCore downloader', async () => {
    await pageLoaderCore(url, dir)
    console.log('after fn')
    const page = (await fs.readFile(path.join(dir, formattedName))).toString()

    expect(page).toBe(expected)
})

test('pageLoaderCore downloader default path', async () => {
    await pageLoaderCore(url)

    const page = (await fs.readFile(path.join(formattedName))).toString()

    expect(page).toBe(expected)
})
