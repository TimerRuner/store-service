import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.model";
import {Device} from "../device/device.model";

interface IRating {
    userId: number
    deviceId: number
    rate: number
}

@Table({tableName: "rating"})
export class Rating extends Model<Rating, IRating> {
    @Column({type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.INTEGER, allowNull: false})
    rate: number

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(() => User)
    user: User

    @ForeignKey(() => Device)
    @Column
    deviceId: number

    @BelongsTo(() => Device)
    device: Device
}
