import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Device} from "../device/device.model";

interface IDeviceCharacteristic {
    deviceId: number
    title: string
    description: string
}

@Table({tableName: "deviceCharacteristic", createdAt: false, updatedAt: false})
export class DeviceCharacteristic extends Model<DeviceCharacteristic, IDeviceCharacteristic> {
    @Column({type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    title: string

    @Column({type: DataType.STRING})
    description: string

    @ForeignKey(() => Device)
    @Column
    deviceId: number

    @BelongsTo(() => Device)
    device: Device

}