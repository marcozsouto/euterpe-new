import bcrypt from "bcrypt"

export class Encrpyt {
     static async encrypt(value: string): Promise<string> {
          return await new Promise(async (resolve) => {
               const salt = await bcrypt.genSalt(10)
               value = await bcrypt.hash(value, salt)
               resolve(value)
          })
     }

     static async compare(first: string, second: string): Promise<boolean> {
          return await new Promise(async (resolve) => {
               const validPassword = await bcrypt.compare(first, second)
               resolve(validPassword)
          })
     }
}
