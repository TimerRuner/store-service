import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Type} from "./type.model";
import {Brand} from "../brand/brand.model";

@Table({tableName: "TypeBrand", createdAt: false, updatedAt: false})
export class TypeBrand extends Model<TypeBrand> {
    @Column({type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Type)
    @Column
    typeId: number

    @ForeignKey(() => Brand)
    @Column
    brandId: number
}