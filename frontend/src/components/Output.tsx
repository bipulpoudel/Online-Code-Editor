import React from "react";
import { Button, Flex, Text, Spinner } from "@chakra-ui/react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/theme-tomorrow";

interface IProps {
  output: string;
  clearOutput: () => void;
  loading: boolean;
}

const Output = ({ output, clearOutput, loading }: IProps) => {
  if (loading) {
    return (
      <Flex w="full" h="full" align="center" justify="center">
        <Spinner />
      </Flex>
    );
  }

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
        <AceEditor
          placeholder="Write and run the program to show output"
          theme="tomorrow"
          fontSize={20}
          showPrintMargin={true}
          showGutter={false}
          highlightActiveLine={false}
          value={output}
          readOnly={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Output;
