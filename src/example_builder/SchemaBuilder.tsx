// exepctedfile = `model User {
//       id      Int      @id @default(autoincrement())
//       email   String   @unique
//       name    String?
//       role    String
//       posts  String[]
//       profile String
//     }
//     model Profile {
//       id     Int    @id @default(autoincrement())
//       bio    String
//       user   User   @relation(fields: [userId], references: [id])
//       userId Int    @unique
//     }
// `
//type types= Int | String | Bolean
// it ('generata prismafile', () => {
//   except(generateSchema(db)).toMatch(exepctedfile)
// })
type types = "number" | "string" | "boolean";
interface Builder {
  setColumName(name: string): this;
  setType(type: types): this;
  setDecorators(decorators: string[]): this;
}
class SchemaRowBuilder implements Builder {
  private schema: Schema;
  private schemas: string[] = [];
  private rows: string[] = [];

  constructor() {
    this.schema = new Schema();
  }

  setColumName(name: string) {
    this.schema.setColumName(name);
    return this;
  }
  setType(type: types) {
    this.schema.setType(type);
    return this;
  }

  setDecorators(decorators: string[]) {
    this.schema.setDecorators(decorators);
    return this;
  }

  buildRow(): string | Error {
    if (this.schema.validate()) {
      return `${this.schema.columnName} ${this.schema.type} ${this.schema.decorators}`;
    }
    throw new Error("Schema missing a step");
  }

  result() {}
}
class Schema {
  type: types | undefined;
  columnName: string | undefined;
  decorators: string[] | undefined;
  modelName: string | undefined;

  setColumName(name: string) {
    this.columnName = name;
    return this;
  }

  setModelName(name: string) {
    this.modelName = name;
    return this;
  }

  setType(type: types) {
    this.type = type;
    return this;
  }

  setDecorators(decorators: string[]) {
    this.decorators = decorators;
    return this;
  }
  validate() {
    return this.type != undefined && this.columnName != undefined;
  }
}

const scBuilder = new SchemaRowBuilder()
  .setColumName("name")
  .setType("number")
  .setDecorators(["@id"])
  .buildRow();
