import { exec } from "child_process";
import fs from "fs";

export const getCOutput = async ({
  code,
  requestId,
}: {
  code: string;
  requestId: string;
}) => {
  //create a c file with the code
  await fs.writeFileSync(`./services/tmp/${requestId}.c`, code);

  //execute the c file from stored data
  exec(
    `gcc -o ./services/tmp/${requestId} ./services/tmp/${requestId}.c `,
    (error, stdout, stderr) => {
      //remove the complied c file
      fs.unlinkSync(`./services/tmp/${requestId}.c`);

      // if any error write to output file
      if (error) {
        return fs.writeFileSync(
          `./services/tmp/${requestId}.txt`,
          error.toString()
        );
      }

      // if any error write to output file
      if (stderr) {
        return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stderr);
      }

      //execute the complied c file
      exec(`./services/tmp/${requestId}`, async (error, stdout, stderr) => {
        //delete executed file
        fs.unlinkSync(`./services/tmp/${requestId}`);

        // if any error write to output file
        if (error) {
          return fs.writeFileSync(
            `./services/tmp/${requestId}.txt`,
            error.message
          );
        }

        // if any error write to output file
        if (stderr) {
          return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stderr);
        }

        //write to output file
        return fs.writeFileSync(`./services/tmp/${requestId}.txt`, stdout);
      });
    }
  );
};
