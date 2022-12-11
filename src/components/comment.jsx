import useCommentStore from '../store/commentStore'
import { useForm } from 'react-hook-form'
import {
  Flex,
  Heading,
  Stack,
  useBoolean,
  Text,
  Badge,
  Input,
  Textarea,
  Button
} from '@chakra-ui/react'

export const LevelOneComment = ({ commentId }) => {
  const { register, reset, handleSubmit } = useForm()
  const [showInput, toggleInput] = useBoolean()

  const addComment = useCommentStore(state => state.addComment)
  const upvote = useCommentStore(state => state.upvote)
  const comment = useCommentStore(state =>
    state.comments.find(comment => comment.id === commentId)
  )
  const childComments = useCommentStore(state =>
    state.comments
      .find(comment => comment.id === commentId)
      .children.map(id => state.comments.find(comment => comment.id === id))
  )
    const onSubmit = (values, event) => {
    event.target.reset()
    addComment(values.comment, values.author, comment.id)
    reset()
    toggleInput.toggle()
  }
  return (
    <>
      <Flex direction={'column'} w={'80vh'}>
        <Stack
          borderLeft={'1px'}
          spacing={3}
          borderBottom={'1px'}
          shadow={'lg'}
          mb={3}
        >
          <Heading>{comment.author}</Heading>
          <Text>{comment.text}</Text>
          <Stack direction={'row'} justifyContent={'space-around'}>
            <Text fontSize={'sm'}>{comment.date}</Text>
            <Badge as={'button'} onClick={() => upvote(comment.id)}>
              {comment.upvote}
            </Badge>
            <Text as={'button'} onClick={() => toggleInput.toggle()}>
              reply
            </Text>
          </Stack>
        </Stack>
        {showInput && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
              direction={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <label>
                Author
                <Input {...register('author', { required: true })}></Input>
              </label>
              <label>
                Comment
                <Textarea
                  {...register('comment', { required: true })}
                ></Textarea>
              </label>
              <Button type='submit'>Add</Button>
            </Flex>
          </form>
        )}
        <Flex direction={'column'} pl={10}>
          {childComments.map(comment => (
            <LevelTwoComponent
              commentId={comment.id}
              key={comment.id}
            ></LevelTwoComponent>
          ))}
        </Flex>
      </Flex>
    </>
  )
}
export const LevelTwoComponent = ({ commentId }) => {
  const { register, reset, handleSubmit } = useForm()
  const [showInput, toggleInput] = useBoolean()

  const addComment = useCommentStore(state => state.addComment)
  const upvote = useCommentStore(state => state.upvote)
  const comment = useCommentStore(state =>
    state.comments.find(comment => comment.id === commentId)
  )
  const childComments = useCommentStore(state =>
    state.comments
      .find(comment => comment.id === commentId)
      .children.map(id => state.comments.find(comment => comment.id === id))
  )
  const onSubmit = (values, event) => {
    addComment(values.comment, values.author, comment.id)
    event.target.reset()
    reset()
    toggleInput.toggle()
  }
  return (
    <>
      <Flex direction={'column'} w={'80vh'}>
        <Stack
          borderLeft={'1px'}
          spacing={3}
          borderBottom={'1px'}
          shadow={'lg'}
          mb={3}
        >
          <Heading>{comment.author}</Heading>
          <Text>{comment.text}</Text>
          <Stack direction={'row'} justifyContent={'space-around'}>
            <Text fontSize={'sm'}>{comment.date}</Text>
            <Badge as={'button'} onClick={() => upvote(comment.id)}>
              {comment.upvote}
            </Badge>
            <Text as={'button'} onClick={() => toggleInput.toggle()}>
              reply
            </Text>
          </Stack>
        </Stack>
        {showInput && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
              direction={'column'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <label>
                Author
                <Input {...register('author', { required: true })}></Input>
              </label>
              <label>
                Comment
                <Textarea
                  {...register('comment', { required: true })}
                ></Textarea>
              </label>
              <Button type='submit'>Add</Button>
            </Flex>
          </form>
        )}
        <Flex direction={'column'} pl={10}>
          {childComments.map(comment => (
            <LevelThreeComponent
              commentId={comment.id}
              key={comment.id}
            ></LevelThreeComponent>
          ))}
        </Flex>
      </Flex>
    </>
  )
}
export const LevelThreeComponent = ({ commentId }) => {
  const upvote = useCommentStore(state => state.upvote)
  const comment = useCommentStore(state =>
    state.comments.find(comment => comment.id === commentId)
  )

  return (
    <>
      <Flex direction={'column'} w={'80vh'}>
        <Stack
          borderLeft={'1px'}
          spacing={3}
          borderBottom={'1px'}
          shadow={'lg'}
          mb={3}
        >
          <Heading>{comment.author}</Heading>
          <Text>{comment.text}</Text>
          <Stack direction={'row'} justifyContent={'space-around'}>
            <Text fontSize={'sm'}>{comment.date}</Text>
            <Badge as={'button'} onClick={() => upvote(comment.id)}>
              {comment.upvote}
            </Badge>
          </Stack>
        </Stack>
      </Flex>
    </>
  )
}
