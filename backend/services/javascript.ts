import { exec } from "child_process";
import fs from "fs";

export const getJavascriptOutput = async ({
  code,
  requestId,
}: {
  code: string;
  requestId: string;
}) => {
  //create a js file with the code
  await fs.writeFileSync(`./services/tmp/${requestId}.js`, code);

  //execute the js file from stored data
  exec(`node ./services/tmp/${requestId}.js`, (error, stdout, stderr) => {
    //remove the executed js file
    fs.unlinkSync(`./services/tmp/${requestId}.js`);

    // if any error write to output file
    if (error) {
      return fs.writeFileSync(`./services/tmp/${requestId}.txt`, error.message);
    }

    // if any error write to output file
    if (stderr) {
      return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stderr);
    }

    //write to output file
    return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stdout);
  });
};
