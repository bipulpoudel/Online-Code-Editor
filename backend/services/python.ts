import { exec } from "child_process";
import fs from "fs";

export const getPythonOutput = async ({
  code,
  requestId,
}: {
  code: string;
  requestId: string;
}) => {
  //create a py file with the code
  await fs.writeFileSync(`./services/tmp/${requestId}.py`, code);

  //execute the py file from stored data
  exec(`python ./services/tmp/${requestId}.py`, (error, stdout, stderr) => {
    //remove the executed py file
    fs.unlinkSync(`./services/tmp/${requestId}.py`);

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
