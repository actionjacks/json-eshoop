import fs from "fs";

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
}

const test = async () => {
  const repo = new UsersRepository("users.json");
  const users = await repo.getAll();
  console.log(users);
};
test();
