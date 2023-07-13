import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Basket} from "../basket/basket.model";
import {Device} from "../device/device.model";

interface IBasketDevice {
    deviceId: number
    basketId: number
}

@Table({tableName: "basketDevice", createdAt: false, updatedAt: false})
export class BasketDevice extends Model<BasketDevice, IBasketDevice> {
    @Column({type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Basket)
    @Column
    basketId: number

    @BelongsTo(() => Basket)
    basket: Basket

    @ForeignKey(() => Device)
    @Column
    deviceId: number

    @BelongsTo(() => Device)
    device: Device
}