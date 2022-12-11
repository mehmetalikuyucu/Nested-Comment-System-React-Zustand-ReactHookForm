import CommentList from "./components/commentList";
import CommentForm from "./components/commentForm";
import { Flex } from "@chakra-ui/react";

function App() {
  return (
    <>
      <Flex justifyContent={"center"} alignItems={"center"}  direction={"column"}>
        <CommentForm></CommentForm>
        <CommentList></CommentList>
      </Flex>
    </>
  );
}

export default App;
