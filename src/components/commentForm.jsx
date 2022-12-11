import useCommentStore from "../store/commentStore"
import {useForm} from 'react-hook-form'
import { Button, Flex, Heading, Input, Textarea } from "@chakra-ui/react"

const CommentForm = () => {

    const { register, handleSubmit, reset } = useForm()
    const addComment = useCommentStore(state => state.addComment)
    
    const onSubmit = (values,event) => {
        addComment(values.comment, values.author, null)
        event.target.reset()
        reset()

    }

    return (
        <>
            <Flex direction={"column"} justifyContent={"center"} alignItems={"center"}>
                <Heading>Comments</Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} mb={5}>
                        <label >Author
                            <Input {...register('author',{required:true})}></Input>
                        </label>
                        <label>Comment
                            <Textarea {...register('comment',{required:true})}></Textarea>
                        </label>
                        <Button type="submit">Add</Button>
                    </Flex>
                </form>
            </Flex>
        </>
  )
}

export default CommentForm