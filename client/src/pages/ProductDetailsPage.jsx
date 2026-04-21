import React from 'react'
import ProductDetails from '../components/product/ProductDetails'
import RelatedPosts from '../components/product/RelatedPosts'
import { useParams } from 'react-router-dom'
import { usePost } from '../hooks/usePost'
import Spinner from '../components/common/Spinner'

const ProductDetailsPage = () => {
  const { slug } = useParams()
  const { data: post = {}, isLoading } = usePost(slug)

  const hasValidPost = post?._id && post?.category?._id

  if (isLoading) return <Spinner size='lg' />

  return (
    <div>
      <ProductDetails post={post} isLoading={isLoading} />
      {hasValidPost && (<RelatedPosts postId={post._id} categoryId={post.category._id} />)}
    </div>
  )
}

export default ProductDetailsPage