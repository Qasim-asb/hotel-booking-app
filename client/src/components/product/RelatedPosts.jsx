import React from 'react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import { useRelatedPosts } from '../../hooks/useRelatedPosts'
import Spinner from '../common/Spinner'
import { Link } from 'react-router-dom'

const RelatedPosts = ({ postId, categoryId }) => {
  const { data: related = [], isLoading } = useRelatedPosts(postId, categoryId)

  if (isLoading) return <Spinner className=' min-h-full' />

  if (!related.length) return null

  return (
    <section className='container-custom py-12'>
      <h2 className='section-title'>You might also like</h2>
      <div className='flex overflow-x-auto snap-x gap-6 pb-4 md:grid md:grid-cols-3 md:pb-0'>
        {related.map(post => (
          <Card key={post._id} className='snap-start flex-shrink-0 dark:hover:shadow-gray-800'>
            <img src={post.images[0].url} alt={post.title} className='w-full h-40 object-cover' />
            <div className='p-4'>
              <h3 className='font-semibold'>{post.title}</h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>{post.hotelLocation}</p>
              <div className='flex justify-between items-center mt-4'>
                <Badge variant='primary'>${post.price}</Badge>
                <Link to={`/post/${post.slug}`} className='text-primary-600 text-sm hover:underline'>View</Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default RelatedPosts