import express from "express";
import fs from "fs";
import { exec, execSync } from "child_process";
import cors from "cors";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API for code editor");
});

app.post("/api/", async (req, res) => {
  const { code } = req.body;
  await fs.writeFileSync("./files/code-runner.c", code);

  const response = await execSync("gcc ./files/code-runner.c", {
    encoding: "utf8",
  });

  console.log(response);
  console.log(response.toString());

  // await fs.unlinkSync("./files/code-runner.c");

  // await fs.unlinkSync("./a.out");

  res.send("I am working fine");

  // const testCode = `
  // #include <stdio.h>
  // #include <stdlib.h>

  // // Driver program
  // int main(void)
  // {
  //     printf("I am running inside a c program");

  //     return 0;
  // }`;

  // //   const replacedCode = code.replace("console.log", "testFunction");

  // //   const func = new Function(
  // //     "name",
  // //     `
  // //     const testFunction = (data) => {
  // //         console.log("I am running??" + data);
  // //     };
  // //     ${replacedCode}`
  // //   );
  // //   const output = func("test");
  // fs.writeFileSync("code-runner.py", testCode);
  // fs.writeFileSync("code-runner.cpp", testCode);
  // fs.writeFileSync("code-runner.c", testCode);
  // //   const compiler = "g++";
  // //   const version = "-std=c++11";
  // //   const out = "-o";
  // //   const infile = "code-runner.cpp";
  // //   const outfile = "code-runner.out";
  // //   const command = "hello world";

  // const compiler = "python";
  // const version = "graphing.py";
  // const out = "-o";
  // const infile = "code-runner.py";
  // const outfile = "code-runner.out";
  // const command = "hello world";

  // exec("gcc code-runner.c", (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return;
  //   }
  //   console.log(`stdout: ${stdout}`);
  //   console.error(`stderr: ${stderr}`);

  //   exec("./a.out", (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`exec error: ${error}`);
  //       return;
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     console.error(`stderr: ${stderr}`);
  //   });
  // });

  // //const test2 = await execSync("g++ code-runner.cpp");
  // res.send("Worked file successfully");
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
