import fs from "fs";
import crypto from "crypto";
import util from "util";
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository {
  //tworzy plik json
  constructor(filename) {
    if (!filename) {
      throw new Error("create arepository requires a filename");
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  //czyta plik json
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8",
      })
    );
  }

  async create(attrs) {
    //attrs === {email: '', password" ''}
    //create random id for new record
    attrs.id = this.randomId();

    //encrypt user password
    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`,
    };
    records.push(record);
    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    //saved=password saved in db hashed.salt
    //supplied password given to us by user trying sign in
    const [hashed, salt] = saved.split(".");
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
    return hashed === hashedSuppliedBuf.toString("hex");
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);
    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }
    //pobieramy zbaleziony record o podanym w funkcji id i nadpisujemy go attrs
    Object.assign(record, attrs);
    await this.writeAll(records);
  }

  async getOneBy(filters) {
    const records = await this.getAll();
    //get all records and loop
    for (let record of records) {
      let found = true;
      //loop in passed object
      for (let key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
}

export default new UsersRepository("users.json");
// export const userRepository = new UserRepository("user.json");

//testing purpose
// const test = async () => {
//   const repo = new UsersRepository("users.json");
// await repo.create({ email: "sssas@", password: "sasasa" });
// const users = await repo.getAll();
// const user = await repo.getOne('234543')
// console.log(users);
// await repo.delete("47d35028");
// const user = await repo.getOneBy({ email: "jacekplacek" });
// console.log(user);
// };
// test();
