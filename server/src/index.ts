import express, {Request, Response} from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import {DataSource, MemorySource} from "./DataSource";

const app = express();
const dataSource: DataSource = new MemorySource()

dotenv.config();

app.use(express.json());
app.use(cors())

app.get("/api/upgrades", (req: Request, res: Response) => {
    dataSource.getUpgrades()
        .then(upgrades => {
            res.json(upgrades).end();
        })
        .catch((err: Error) => {
            res.status(500).json({"message": err.message}).end();
        })
})

app.post("/api/upgrades", (req: Request, res: Response) => {
    const {name, cost, increase} = req.body;
    if (!name || !cost || !increase) {
        res.status(400).json({"message": "POST body requires a name, cost and an increase value"})
        return;
    }
    if (cost < 0) {
        res.status(400).json({"message": "cost must be a number above zero"})
        return;
    }

    if (increase < 0) {
        res.status(400).json({"message": "increase must be a number above zero"})
        return;
    }

    dataSource.addUpgrade(name, cost, increase)
        .then(upgrade => {
            res.json(upgrade)
        })
        .catch((err: Error) => {
            res.status(500).json({"message": err.message}).end();
        })

})

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log("Server running on port: " + port);
})
