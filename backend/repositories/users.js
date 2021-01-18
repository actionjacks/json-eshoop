import fs from "fs";
import crypto from "crypto";

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
    //create random id for new record
    attrs.id = this.randomId();

    const records = await this.getAll();
    records.push(attrs);
    await this.writeAll(records);
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
}

//testing purpose
const test = async () => {
  const repo = new UsersRepository("users.json");
  // await repo.create({ email: "sssas@", password: "sasasa" });
  // const users = await repo.getAll();
  // const user = await repo.getOne('234543')
  // console.log(users);
  // await repo.delete("47d35028");
};
test();
