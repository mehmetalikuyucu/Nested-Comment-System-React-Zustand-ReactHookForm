import { Flex } from "@chakra-ui/react"
import useCommentStore from "../store/commentStore"
import { LevelOneComment } from "./comment"
const CommentList = () => {
     const parentComments=useCommentStore(state=>state.comments.filter(comment=>!comment.parentId))
  return (
      <Flex direction={'column'}>
          {parentComments.map(comment => (
         <LevelOneComment commentId={comment.id} key={comment.id}></LevelOneComment>
     ))}     
    </Flex>
  )
}
export default CommentList