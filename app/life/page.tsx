import { allPosts } from '@/.contentlayer/generated'
import TitleBox from '@/app/ui/TitleBox'
import { compareDesc } from 'date-fns'

export default function LifeHome() {
  const posts = allPosts
    .filter((post) => post.category === 'life')
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <main className="m-8 flex h-full w-full flex-col">
      {posts.map((post, idx) => (
        <TitleBox key={idx} {...post} />
      ))}
    </main>
  )
}
