import fs from 'node:fs/promises'
import path from 'node:path'
import pollTopicMap from '../src/components/astro/pollTopicMap.js'

const DISCOURSE_BASE = 'https://forum.tapggc.org'

// Fetch raw text with logging + basic error preview
async function fetchText(url, label) {
    console.log(`[discourse] fetching ${label}: ${url}`)
    const res = await fetch(url)
    console.log(`[discourse] ${label} status:`, res.status)

    const text = await res.text()

    if (!res.ok) {
        console.log(`[discourse] ${label} body preview:`, text.slice(0, 200))
        throw new Error(`${label} HTTP ${res.status}`)
    }

    return text
}

async function fetchJson(url, label) {
    const text = await fetchText(url, label)
    try {
        return JSON.parse(text)
    } catch (e) {
        console.error(`[discourse] failed to parse JSON for ${label}`, e)
        throw e
    }
}

async function fetchPollForTopic(projectId, forumSlug) {
    const topicUrl = `${DISCOURSE_BASE}/t/${forumSlug}.json`
    const topic = await fetchJson(topicUrl, `topic ${projectId}`)

    const stream = topic?.post_stream?.stream || []
    console.log(`[${projectId}] post ids:`, stream)

    if (!stream.length) {
        console.warn(`[${projectId}] no posts in topic`)
        return null
    }

    // Walk posts and find the first that has a poll
    for (const postId of stream) {
        const postUrl = `${DISCOURSE_BASE}/posts/${postId}.json`
        const post = await fetchJson(postUrl, `post ${postId}`)

        if (Array.isArray(post.polls) && post.polls.length > 0) {
            console.log(`[${projectId}] found poll in post`, postId)

            const poll = post.polls[0]
            const voters = poll.voters || 0

            const options = poll.options.map((opt) => {
                const html = String(opt.html ?? '')

                // Count <img ...> tags to determine star count
                const imgMatches = html.match(/<img\b[^>]*>/g) || []
                const stars = imgMatches.length || 0

                return {
                    stars,
                    votes: opt.votes,
                    percent: voters ? (opt.votes / voters) * 100 : 0,
                }
            })

            const totalScore = options.reduce((sum, opt) => sum + opt.stars * opt.votes, 0)
            const average = voters ? totalScore / voters : 0

            return {
                voters,
                average,
                options,
            }
        }
    }

    console.warn(`[${projectId}] checked all posts, no poll found`)
    return null
}

async function main() {
    const result = {}

    for (const [projectId, forumSlug] of Object.entries(pollTopicMap)) {
        try {
        console.log(`\n=== Fetching poll for project "${projectId}" ===`)
        const poll = await fetchPollForTopic(projectId, forumSlug)
        if (poll) {
            result[projectId] = poll
        }
        } catch (err) {
        console.error(`[${projectId}] error:`, err.message)
        }
    }

    const outPath = path.join('src', 'data', 'polls.json')
    await fs.mkdir(path.dirname(outPath), { recursive: true })
    await fs.writeFile(outPath, JSON.stringify(result, null, 2), 'utf8')

    console.log(
        `\nSaved polls for ${Object.keys(result).length} project(s) to ${outPath}`
    )
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
