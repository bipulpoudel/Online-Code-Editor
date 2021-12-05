import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";

interface IProps {
  output: string;
  clearOutput: () => void;
}

const Output = ({ output, clearOutput }: IProps) => {
  return (
    <Flex
      w="full"
      h="full"
      flexDir="column"
      borderWidth="1px"
      borderColor="#D3DCE6"
    >
      <Flex
        h="60px"
        p="3"
        borderBottomWidth="1px"
        borderBottomColor="#D3DCE6"
        align="center"
        w="full"
        justify="space-between"
      >
        <Text>Output</Text>
        <Button onClick={clearOutput} colorScheme="red">
          Clear
        </Button>
      </Flex>
      <Flex w="full" h="full" bg="whitesmoke">
        {output}
      </Flex>
    </Flex>
  );
};

export default Output;
