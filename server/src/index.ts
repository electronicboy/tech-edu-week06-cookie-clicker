import express, {Request, Response} from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import {DataSource, MemorySource} from "./DataSource";

const app = express();
const dataSource: DataSource = new MemorySource()

dotenv.config();

app.use(express.json());
app.use(cors())

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({message: "What are you looking at?"})
})

app.get("/api/upgrades", (req: Request, res: Response) => {
    dataSource.getUpgrades()
        .then(upgrades => {
            res.json(upgrades).end();
        })
        .catch((err: Error) => {
            res.status(500).json({"message": err.message}).end();
        })
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server running on port: " + port);
})
