import React from 'react'
import { Profile } from './profile'
import { Categories } from './categories'
import { Tags } from './tags'

interface Category {
  url: string
  title: string
  article_count: number
}

interface Tag {
  url: string
  title: string
}

interface SidebarProps {
  categories: Category[]
  tags: Tag[]
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, tags }) => {
  return (
    <div
      id="sidebar"
      className="mb-4 row-start-2 row-end-3 col-span-2 lg:row-start-1 lg:row-end-2 lg:col-span-1 lg:max-w-[17.5rem] onload-animation w-full"
    >
      <div className="flex flex-col w-full gap-4 mb-4">
        <Profile />
      </div>
      <div
        id="sidebar-sticky"
        className="transition-all duration-700 flex flex-col w-full gap-4 sticky top-4"
      >
        <Categories categories={categories} />
        <Tags tags={tags} />
      </div>
    </div>
  )
}
