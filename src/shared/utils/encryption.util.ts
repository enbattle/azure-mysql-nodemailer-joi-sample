// import argon2 from 'argon2';
import crypto from "crypto";

export const hashCredentials = (string: string) => {
  return crypto.createHash("sha256").update(string).digest("hex");
  // const hashedString = await argon2.hash(string);
};

export const verifyCredentials = async (
  string: string,
  hashedString: string
) => {
  const hashStringAgain = hashCredentials(string);
  return hashedString === hashStringAgain;
  // return await argon2.verify(hashedString, hashedStringAgain);
};
