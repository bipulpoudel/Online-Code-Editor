import React, { useMemo, useState } from "react";
import { Flex } from "@chakra-ui/layout";
import Output from "../components/Output";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";

const Home = () => {
  const [language, setLanguage] = useState<
    "c" | "c++" | "javascript" | "python"
  >("c");

  const [code, setCode] = useState<string>("");

  const [output, setOutput] = useState<string>("Output testing??");

  const runCode = async () => {
    const formData = {
      language,
      code,
    };
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/api",
      formData
    );

    console.log(response);
  };

  const clearOutput = () => {
    setOutput("");
  };

  useMemo(() => {
    if (language === "c") {
      setCode(`#include <stdio.h>

int main() {
    // Write C code here
    printf("Hello world");

    return 0;
}`);
    }

    if (language === "javascript") {
      setCode(`console.log("Welcome Developers");`);
    }

    if (language === "python") {
      setCode(`print("Hello world")`);
    }

    if (language === "c++") {
      setCode(`#include <iostream>

int main() {
    // Write C++ code here
    std::cout << "Hello world!";

    return 0;
}`);
    }
    // eslint-disable-next-line
  }, [language, code]);

  return (
    <Flex w="full" h="100vh">
      <CodeEditor
        language={language}
        setLanguage={setLanguage}
        code={code}
        setCode={setCode}
        runCode={runCode}
      />
      <Output output={output} clearOutput={clearOutput} />
    </Flex>
  );
};

export default Home;
