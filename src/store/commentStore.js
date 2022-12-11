import  create from 'zustand'
import { persist } from 'zustand/middleware'
import { uid } from 'uid'

const createComment = (comment, author, parentId, isRoot) => {
  return {
    id: uid(),
    text: comment,
    author: author,
    date: new Date().toLocaleString(),
    children: [],
    upvote: 0,
    parentId,
    isRoot
  }
}

const useCommentStore = create(
  persist(
    set => ({
      comments: [],
      addComment: (text, author, parentId) => {
        if (parentId) {
          const newComment = createComment(text, author, parentId, false)
          set(state => ({
            comments: state.comments.map(comment =>
              comment.id === parentId
                ? { ...comment, children: [...comment.children, newComment.id] }
                : comment
            )
          }))
          set(state => ({
            comments: [...state.comments, newComment]
          }))
        } else {
          set(state => ({
            comments: [
              ...state.comments,
              createComment(text, author, null, true)
            ]
          }))
        }
      },
      upvote: id => {
        set(state => ({
          comments: state.comments.map(comment =>
            comment.id === id
              ? { ...comment, upvote: comment.upvote + 1 }
              : comment
          )
        }))
      }
    }),
    { name: 'comment-storage' }
  )
)

export default useCommentStore
