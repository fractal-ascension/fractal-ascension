type ItemType = "WPN" | "ARM" | "ETC" | "USE" | "CMBT";

export interface Item {
    id: string;
    name: string;
    description: string;
    value: number;
    type: ItemType;
    amount: number;
}

export interface Weapon {
    id: string;
    name: string;
    description: string;
    value: number;
    type: string;
    amount: number;

  }