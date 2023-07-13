import {BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {Role} from "../role/role.model";
import {Token} from "../token/token.model";
import {Account} from "../account/account.model";
import {Basket} from "../basket/basket.model";
import {Rating} from "../rating/rating.model";
import {Device} from "../device/device.model";

interface IUserDto {
    fullName: string
    email: string
    password: string
}
@Table({tableName: "users"})
export class User extends Model<User, IUserDto> {
    @Column({type: DataType.INTEGER, allowNull: false, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false })
    fullName: string

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    password: string

    @ForeignKey(() => Role)
    @Column
    roleId: number

    @BelongsTo(() => Role)
    role: Role

    @HasOne(() => Token)
    token: Token

    @HasOne(() => Account)
    account: Account

    @HasOne(() => Basket)
    basket: Basket

    @HasMany(() => Rating)
    ratings: Rating[]

    @HasMany(() => Device)
    devices: Device[]
}