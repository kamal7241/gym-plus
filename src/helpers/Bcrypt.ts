import bcrypt from 'bcrypt';

export class Bcrypt {
  static async hash(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  static async compare(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  }
}

 
