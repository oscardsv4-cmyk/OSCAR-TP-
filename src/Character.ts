import {Weapon} from './Weapon';

export abstract class Character {
  public readonly name: string;
  public readonly maxHealth:number;
public readonly baseAttack: number;
  public readonly BaseDefense:number;
  private _health: number;
  private _weapon:Weapon | null;

  public constructor(name: string, health: number, baseAttack: number, baseDefense: number){
    
    if (health < 0) {
      throw new Error(`The health of ${name} must be strictly positive.`);
    }
    this.name = name;
    this.maxHealth = health;
    this.baseAttack = baseAttack;
    this.BaseDefense = baseDefense;
    this._health = health;
    
  }

  public get health(): number {
    return this._health;
  }

  public abstract getAttack():number;

  public abstract canEquip(weapon: Weapon): boolean;

public isAlive(): boolean {
    return this._health > 0;
  }

   public describe(): string {
    return `${this.name} - health ${this._health}/${this.maxHealth} - attack ${this.baseAttack} - defense ${this.BaseDefense} - weapon: ${this._weapon}`;
  }
  
  public equip(weapon: Weapon): void {
    if (!this.canEquip(weapon)) {
        throw new Error(`${this.name} cannot equip ${weapon.name}.`);
    }

    this._weapon = weapon;
}

public takeDamage(amount: number): void {
    this._health = Math.max(0, this.health - amount);
}

public heal(amount: number): void {
    this._health = Math.min(this.maxHealth, this.health + amount);
}

protected computeDamage(target: Character): number {
    return Math.max(0, this.baseAttack - target.BaseDefense);
}

public attack(target: Character): number {
    if (this.health <= 0) {
        throw new Error(`${this.name} is KO and cannot attack.`);
    }

    if (target === this) {
        throw new Error(`${this.name} cannot attack themselves.`);
    }

    if (target.health <= 0) {
        throw new Error(`${target.name} is already KO.`);
    }

    const damage = this.computeDamage(target);
    target.takeDamage(damage);

    console.log(
        `${this.name} hits ${target.name} for ${damage} damage (${target.name}: ${target.health}/${target.maxHealth}).`
    );

    if (target.health <= 0) {
        console.log(`${target.name} is KO!`);
    }

    return damage;
}


}

