import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: Links.VAR_TABLE_NAME,
})
export class Links extends Model {
  public static VAR_TABLE_NAME = "links" as string;
  public static VAR_ID = "id" as string;
  public static VAR_IMAGE = "image" as string;
  public static VAR_LINK = "link" as string;
  public static VAR_NAME = "name" as string;
  public static VAR_DESCRIPTION = "description" as string;

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Links.VAR_ID,
  })
  id!: number;
  
  @Column({
    type: DataType.STRING(255),
    field: Links.VAR_IMAGE,
  })
  image!: string;

  
  @Column({
    type: DataType.STRING(255),
    field: Links.VAR_LINK,
  })
  link!: string;
  
  @Column({
    type: DataType.STRING(100),
    field: Links.VAR_NAME,
  })
  name!: string;

  @Column({
    type: DataType.STRING(255),
    field: Links.VAR_DESCRIPTION,
  })
  description!: string;
}
