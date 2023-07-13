import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {Type} from "../type/type.model";
import {TypeBrand} from "../type/type-brand.model";
import {Device} from "../device/device.model";

interface IBrand {
    name: string
}

@Table({tableName: "brand", createdAt: false, updatedAt: false})
export class Brand extends Model<Brand, IBrand> {
    @Column({type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string

    @BelongsToMany(() => Type, () => TypeBrand)
    type: Type[]

    @HasMany(() => Device)
    devices: Device[]
}