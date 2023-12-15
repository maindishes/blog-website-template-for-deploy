import { Article, allArticles } from 'contentlayer/generated'
import { compareDesc, format, parseISO } from 'date-fns'
import Link from 'next/link'

function ArticleCard(article: Article) {
  return (
    <div className="mb-8">
      <h2 className="mb-1 text-xl">
        <Link
          href={article.url}
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          {article.title}
        </Link>
      </h2>
      <time
        dateTime={article.date}
        className="mb-2 block text-xs text-gray-600"
      >
        {format(parseISO(article.date), 'LLLL d, yyyy')}
      </time>
      <div
        className="text-sm [&>*:last-child]:mb-0 [&>*]:mb-3"
        dangerouslySetInnerHTML={{ __html: article.body.html }}
      />
    </div>
  )
}

export default function Article() {
  const articles = allArticles.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mx-auto max-w-xl py-8">
        <h1 className="mb-8 text-center text-2xl font-black">
          Next.js + Contentlayer Example
        </h1>
        {articles.map((article, idx) => (
          <ArticleCard key={idx} {...article} />
        ))}
        <Link
          href="/"
          className="text-blue-700 hover:text-blue-900 dark:text-blue-400"
        >
          View all posts
        </Link>
      </div>
    </main>
  )
}
