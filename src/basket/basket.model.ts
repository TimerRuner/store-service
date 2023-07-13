import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {BasketDevice} from "../basket_device/basket_device.model";

interface IBasket {
    userId: number
}

@Table({tableName: "basket"})
export class Basket extends Model<Basket, IBasket> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @HasMany(() => BasketDevice)
    basketDevices: BasketDevice[]
}