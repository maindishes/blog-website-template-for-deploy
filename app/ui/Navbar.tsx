'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const menus = [
    {
      url: '/portfolio',
      name: 'portfolio',
    },
    {
      url: '/dev',
      name: 'dev',
    },
    {
      url: '/life',
      name: 'life',
    },
  ]
  return (
    <ul className="flex items-center justify-center space-x-8 text-lg">
      {menus.map((menu, index) => (
        <li key={index}>
          <Link
            href={menu.url}
            className={`${
              pathname == menu.url
                ? 'font-bold underline underline-offset-4'
                : ''
            } `}
          >
            {menu.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
