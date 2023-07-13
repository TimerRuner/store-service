import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {TypeBrand} from "./type-brand.model";
import {Brand} from "../brand/brand.model";
import {Device} from "../device/device.model";

interface IType {
    name: string
}

@Table({tableName: "type", createdAt: false, updatedAt: false})
export class Type extends Model<Type, IType> {
    @Column({type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true})
    id: number
    //todo realize validation for name (length more 3 letter)
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    name: string

    @BelongsToMany(() => Brand, () => TypeBrand)
    brand: Brand[]

    @HasMany(() => Device)
    devices: Device[]
}