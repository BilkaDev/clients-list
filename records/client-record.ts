import {ValidationError} from "../utils/errors"
import {pool} from "../utils/database"
import {FieldPacket} from "mysql2";


export class ClientRecord {
    private name: string;
    private email: string;
    public readonly id: string;
    private nextContactDate: string;
    private notes: string;

    constructor(obj: ClientRecord) {
        const {name, id, email, nextContactDate, notes} = obj;
        if (!name || typeof name !== "string" || name.length < 3) {
            throw new ValidationError("the name must be a text with a minimum of 3 characters.")
        }
        if (!id || typeof id !== "string") {
            throw new ValidationError("the index must be a text.")
        }
        if (!email || typeof email !== "string" || email.indexOf("@") === -1) {
            throw new ValidationError("email is not correct")
        }
        if (!nextContactDate || typeof nextContactDate !== 'string') {
            throw new ValidationError("date is not correct")
        }
        if (typeof notes !== 'string') {
            throw new ValidationError("notes is not correct.the notes must be a text.")
        }
        this.name = name;
        this.email = email;
        this.id = id;
        this.nextContactDate = nextContactDate;
        this.notes = notes;


    }

    async create(): Promise<void> {

        await pool.execute("INSERT INTO `clients`(`id`,`name`,`email`,`nextContactDate`,`notes`) VALUES (:id, :name, :email, :nextContactDate, :notes)", {
            id: this.id,
            name: this.name,
            email: this.email,
            nextContactDate: this.nextContactDate,
            notes: this.notes,
        })
    }

    static async getAll(): Promise<ClientRecord[]> {
        const [result] = await pool.execute("SELECT * FROM `clients`") as [ClientRecord[],FieldPacket[]];

        return result.map((obj: ClientRecord) => new ClientRecord(obj));

    }

    static async getOne(id: string): Promise<ClientRecord | null> {
        const [result] = await pool.execute("SELECT * FROM `clients` WHERE `id` = :id", {
            id
        }) as [ClientRecord[],FieldPacket[]]
        return result.length === 0 ? null : new ClientRecord((result as ClientRecord[])[0]);
    }

    async update(client: ClientRecord): Promise<void> {
        await pool.execute("UPDATE `clients` SET `name` = :name, `email` = :email,`nextContactDate` = :data, `notes` = :notes WHERE `id` = :id", {
            id: this.id,
            name: client.name,
            email: client.email,
            notes: client.notes,
            data: client.nextContactDate
        })
    }

    async delete(): Promise<void> {
        await pool.execute("DELETE FROM `clients` WHERE `id` = :id", {
            id: this.id,
        })

    }

}
