import {BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {Type} from "../type/type.model";
import {Brand} from "../brand/brand.model";
import {DeviceCharacteristic} from "../device_characteristic/device_characteristic.model";
import {BasketDevice} from "../basket_device/basket_device.model";
import {Rating} from "../rating/rating.model";
import {User} from "../user/user.model";

interface IDevice {
    name: string;
    price: number;
    rating: number;
    picture: string;
    typeId: number;
    brandId: number;
    userId: number
}

@Table({tableName: "device"})
export class Device extends Model<Device, IDevice> {
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string

    @Column({type: DataType.INTEGER, defaultValue: 0})
    rating: number

    @Column({type: DataType.STRING, allowNull: true})
    picture: string

    @Column({type: DataType.INTEGER, allowNull: false})
    price: number

    @ForeignKey(() => Type)
    @Column
    typeId: number

    @BelongsTo(() => Type)
    type: Type

    @ForeignKey(() => Brand)
    @Column
    brandId: number

    @BelongsTo(() => Brand)
    brand: Brand

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @HasMany(() => DeviceCharacteristic)
    characteristics: DeviceCharacteristic[]

    @HasOne(() => BasketDevice)
    basketDevice: BasketDevice

    @HasMany(() => Rating)
    ratings: Rating[]
}