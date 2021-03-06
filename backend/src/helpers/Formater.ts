const regexDT =
     /^\d{4}[\-\/\s]?((((0[13578])|(1[02]))[\-\/\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\-\/\s]?(([0-2][0-9])|(30)))|(02[\-\/\s]?[0-2][0-9]))( (?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)$)?/
import dayjs from "dayjs"

export default class Formater {
     static formaterDate(date: string) {
          try {
               date = String(date).slice(0, 20)

               if (!regexDT.test(date))
                    throw `Date invalid, format must be "YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss or "YYYY-MM-DDTHH:mm:ss.ZZZ"`

               if (date.includes("T"))
                    date = date.slice(0, 19).replace("T", " ")

               let tipo =
                    date.length == 10 ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss"

               let odt = dayjs(date, tipo)

               if (date.length == 10) return odt.format("YYYY/MM/DD")

               return odt.format("YYYY/MM/DD HH:mm:ss")
          } catch (e) {
               return date
          }
     }

     static formatarDateNew(date: string) {
          return String(date).slice(0, 15)
     }

     static formatarTime(time: any) {
          time = new Date(time * 1000).toISOString().substr(11, 8).split(":")
          return `${time[0]}h ${time[1]}min`
     }
}
