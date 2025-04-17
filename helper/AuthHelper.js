import bcrypt from "bcrypt";

//function for hashing passsord for storing in database
export const hashPassword = async (password) => {
  try {
    const saltRound = 10; // You can adjust the salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRound);
    return hashedPassword;
  } catch (error) {
    console.error("Error in hashing password", error);
    throw new Error("Password hashing failed");
  }
};

//compare function to comapre hashed passsord and password entered by user for login
export const comaprePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
