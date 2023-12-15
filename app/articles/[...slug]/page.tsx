import { allArticles } from 'contentlayer/generated'
import { format, parseISO } from 'date-fns'

export const generateStaticParams = async () =>
  allArticles.map((article) => ({
    slug: article._raw.flattenedPath.split('/'),
  }))

export const generateMetadata = ({
  params,
}: {
  params: { slug: string[] }
}) => {
  const article = allArticles.find(
    (article) =>
      article._raw.flattenedPath === `articles/${params.slug.join('/')}`,
  )

  if (!article) throw new Error(`Article not found for slug: ${params.slug}`)
  return { title: article.title }
}

const ArticleLayout = ({ params }: { params: { slug: string[] } }) => {
  const article = allArticles.find(
    (article) =>
      article._raw.flattenedPath === `articles/${params.slug.join('/')}`,
  )

  if (!article) throw new Error(`Article not found for slug: ${params.slug}`)

  return (
    <article className="mx-auto min-h-screen max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={article.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(article.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{article.title}</h1>
      </div>
      <div
        className="[&>*:last-child]:mb-0 [&>*]:mb-3"
        dangerouslySetInnerHTML={{ __html: article.body.html }}
      />
    </article>
  )
}

export default ArticleLayout
