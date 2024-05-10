// type ItemType = "WPN" | "ARM" | "ETC" | "USE" | "CMBT";

export interface Item {
    id: string;
    name: string;
    description: string;
    value: number;
    type: Weapon;
    amount: number;
    unique: boolean;
}

export interface Weapon {
    id: string;
    name: string;
    description: string;
    value: number;
    type: string;
    amount: number;
  }