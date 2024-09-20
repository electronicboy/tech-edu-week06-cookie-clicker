class Upgrade {
    id: number;
    name: string;
    cost: number;
    increase: number;

    constructor(id: number, name: string, cost: number, increase: number) {
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.increase = increase;
    }
}

export interface DataSource {
    getUpgrades(): Promise<Array<Upgrade>>;

    addUpgrade(name: string, cost: number, increase: number): Promise<Upgrade>;
}

export class MemorySource implements DataSource {
    private upgrades: Upgrade[] = new Array<Upgrade>();

    constructor() {
        // I've just copied these from the existing web API, we'll go crazy here next time.
        this.addUpgradeRaw("Auto-Clicker", 100, 1)
        this.addUpgradeRaw("Enhanced Oven", 500, 5)
        this.addUpgradeRaw("Cookie Farm", 1000, 10)
        this.addUpgradeRaw("Robot Baker", 2000, 20)
        this.addUpgradeRaw("Cookie Factory", 5000, 50)
        this.addUpgradeRaw("Magic Flour", 10000, 100)
        this.addUpgradeRaw("Time Machine", 20000, 200)
        this.addUpgradeRaw("Quantum Oven", 50000, 500)
        this.addUpgradeRaw("Alien Technology", 100000, 1000)
        this.addUpgradeRaw("Interdimensional Baker", 200000, 2000)
    }


    /**
     * This method exists internally to allow registering in a "cordial" manner,
     * i.e. without the future return, even though that is irrelevant here, this does
     * appease eslint without having danging promises
     *
     * @param name
     * @param cost
     * @param increase
     * @private
     */
    private addUpgradeRaw(name: string, cost: number, increase: number) {
        const upgrade = new Upgrade(this.upgrades.length, name, cost, increase);
        this.upgrades.push(upgrade);
    }

    addUpgrade(name: string, cost: number, increase: number): Promise<Upgrade> {
        return new Promise((resolve, reject) => {
            const upgrade = new Upgrade(this.upgrades.length, name, cost, increase);
            this.upgrades.push(upgrade);
            resolve(upgrade);
        })
    }


    getUpgrades(): Promise<Array<Upgrade>> {
        return new Promise((resolve, reject) => {
            resolve(this.upgrades);
        })
    }

}

export class PGSource implements DataSource {
    addUpgrade(name: string, cost: number, increase: number): Promise<Upgrade> {
        return new Promise((resolve, reject) => {
            reject(new Error("Method not implemented."));
        })
    }

    getUpgrades(): Promise<Array<Upgrade>> {
        return new Promise((resolve, reject) => {
        })
    }

}

