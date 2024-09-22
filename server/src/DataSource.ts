class UpgradeInfo {
    amount: number;
    type: UpgradeType;
    display: string

    constructor(amount: number, type: UpgradeType, display: string) {
        this.amount = amount;
        this.type = type;
        this.display = display;
    }
}
enum UpgradeType {
    CPS,
    CLICK,
    CLICK_MULTI,
    CLICK_RATE_CPS
}

class Upgrade {
  id: number;
  name: string;
  cost: number;
  increase: number;
  upgrade: UpgradeInfo | null;

  constructor(id: number, name: string, cost: number, increase: number, upgrade: UpgradeInfo | null) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.increase = increase;
    this.upgrade = upgrade;
  }
}

export interface DataSource {
  getUpgrades(): Promise<Array<Upgrade>>;

  addUpgrade(name: string, cost: number, increase: number, upgradeType: UpgradeInfo): Promise<Upgrade>;
}

export class MemorySource implements DataSource {
  private upgrades: Upgrade[] = new Array<Upgrade>();

  constructor() {
    // I've just copied these from the existing web API, we'll go crazy here next time.
    this.addUpgradeRaw("Auto-Clicker", 100, 1, new UpgradeInfo(1, UpgradeType.CPS, "clicky!"));
    this.addUpgradeRaw("Enhanced Oven", 500, 5, new UpgradeInfo(5, UpgradeType.CPS, "The temperature dial goes to 1100c"));
    this.addUpgradeRaw("Heavy Finger", 750, 0, new UpgradeInfo(5, UpgradeType.CLICK_MULTI, "Hope it's not lead"))
    this.addUpgradeRaw("Cookie Farm", 1000, 10, new UpgradeInfo(10, UpgradeType.CPS, "Just regular, home grown, cookie plants."));
    this.addUpgradeRaw("Robot Baker", 2000, 20, new UpgradeInfo(20, UpgradeType.CPS, "Actually Intriguing machinery!"));
    this.addUpgradeRaw("Golden Switch", 2500, 0, new UpgradeInfo(0.1, UpgradeType.CLICK_RATE_CPS, "Not plated!"));
    this.addUpgradeRaw("Cookie Factory", 5000, 50, new UpgradeInfo(50, UpgradeType.CPS, "as far as the eyes can see!"));
    this.addUpgradeRaw("Magic Flour", 10000, 100, new UpgradeInfo(100, UpgradeType.CPS, "Not a euphemism"));
    this.addUpgradeRaw("Time Machine", 20000, 200, new UpgradeInfo(200, UpgradeType.CPS, "ever sworn you had a cookie left? Well, you did!"));
    this.addUpgradeRaw("Quantum Oven", 50000, 500, new UpgradeInfo(500, UpgradeType.CPS, "Bends space and time, allowing your cookies to be baked yesterday!"));
    this.addUpgradeRaw("Alien Technology", 100000, 1000, new UpgradeInfo(1000, UpgradeType.CPS, "Outta this world taste!"));
    this.addUpgradeRaw("Interdimensional Baker", 200000, 2000, new UpgradeInfo(2000, UpgradeType.CPS, "If you purchased an oven in all dimensions..."));
  }

  /**
   * This method exists internally to allow registering in a "cordial" manner,
   * i.e. without the future return, even though that is irrelevant here, this does
   * appease eslint without having danging promises
   *
   * @param {string} name name of the upgrade
   * @param {number} cost cost of the upgrade
   * @param {number} increase
   * @param {UpgradeInfo} upgradeType
   * @private
   */
  private addUpgradeRaw(name: string, cost: number, increase: number, upgradeType: UpgradeInfo) {
    const upgrade = new Upgrade(this.upgrades.length, name, cost, increase, upgradeType);
    this.upgrades.push(upgrade);
  }

  addUpgrade(name: string, cost: number, increase: number, upgradeType: UpgradeInfo): Promise<Upgrade> {
    return new Promise((resolve, _) => {
      const upgrade = new Upgrade(this.upgrades.length, name, cost, increase, upgradeType);
      this.upgrades.push(upgrade);
      resolve(upgrade);
    });
  }

  getUpgrades(): Promise<Array<Upgrade>> {
    return new Promise((resolve, _) => {
      resolve(this.upgrades);
    });
  }
}

export class PGSource implements DataSource {
  addUpgrade(name: string, cost: number, increase: number, upgradeType: UpgradeInfo): Promise<Upgrade> {
    return new Promise((_, reject) => {
      reject(new Error("Method not implemented."));
    });
  }

  getUpgrades(): Promise<Array<Upgrade>> {
    return new Promise((_, __) => {});
  }
}
