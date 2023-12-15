import { Post } from '@/.contentlayer/generated'
import { format } from 'date-fns'
import Link from 'next/link'

export default function TitleBox(post: Post) {
  console.log(post)
  return (
    <div>
      <div className="mx-4 mt-4 overflow-hidden rounded-md bg-velog_grey shadow-md">
        <div className="p-2">
          <Link href={post.url} className="mb-2 text-xl font-bold">{post.title}</Link>
          <div style={{ color: 'gray', fontSize: 'smaller' }}>{format(new Date(post.date), 'yyyy년 MM월 dd일')}</div>
        </div>
      </div>
    </div>
  )
}
