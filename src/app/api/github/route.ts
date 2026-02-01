import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const username = 'webspoilt'
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=all`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    })

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories')
    }

    const repos = await response.json()

    // Transform the data to match our interface
    const transformedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      topics: repo.topics || [],
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      updated_at: repo.updated_at
    }))

    return NextResponse.json(transformedRepos)
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error)
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 })
  }
}
