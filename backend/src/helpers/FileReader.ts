import fs from "fs"

export default class FileReader {
     static filesAt(name: string): Promise<any> {
          return new Promise((resolve, reject) => {
               fs.readdir(name, function name(err: any, filenames: any) {
                    if (err)
                         reject({
                              status: "error",
                              code: 400,
                              message: `erro read folder`,
                         })
                    resolve(filenames)
               })
          })
     }

     static remove(files: any) {
          for (var prop in files) {
               fs.unlinkSync(files[prop][0].path)
          }
     }
}
