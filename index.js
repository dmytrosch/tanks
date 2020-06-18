class Engine {
    constructor(x = 0, y = 0) {
      this.x = x;
      this.y = y;
      this.side = 0; //0 - up, 1 - right, -1 - left, -2 - down (создал 4 стороны)
    }
  
    rotateLeft() {
      if (this.side !== -2) {
        this.side--;
      } else {
        this.side = 1;
      }
    }
  
    rotateRight() {
      if (this.side !== 1) {
        this.side++;
      } else {
        this.side = -2;
      }
    }
  
    move(distance) {
      console.log(this.side);
      //каждое движение по клетке идет проверка на наличие врага в этой клетке
      switch (this.side) {
        case 0: //едем вперед
          for (let i = 1; i <= distance; i++) {
            this.y--;
            this.isHitting();
          }
          console.log("going up");
  
          break;
        case 1: //едем вправо
          for (let i = 1; i <= distance; i++) {
            this.x++;
            this.isHitting();
          }
          console.log("going right");
  
          break;
        case -1: //едем влево
          for (let i = 1; i <= distance; i++) {
            this.x--;
            this.isHitting();
          }
          console.log("going left");
  
          break;
        case -2: //едем назад
          for (let i = 1; i <= distance; i++) {
            this.y++;
            this.isHitting();
          }
          console.log("going down");
          break;
      }
    }
    isHitting() {
      //проверка на врага на клетке
      Tank.enemyArr.forEach(function (enemy) {
        const { x, y } = enemy;
        if (tank.y === y && tank.x === x) {
          enemy.isAlive = false;
          //out of field:
          enemy.x = 10000;
          enemy.y = 10000;
          console.log(`enemy ${enemy.id} is crushed running down!`);
        }
      });
    }
    getCoord() {
      return console.log(`x: ${this.x}, y: ${this.y}`);
    }
  }
  
  class Tank extends Engine {
    static enemyArr = [];
    static createEnemy(x, y) {
      this.id = this.enemyArr.length + 1;
      this.x = x;
      this.y = y;
      this.isAlive = true;
      this.enemyArr.push({
        id: this.id,
        x: this.x,
        y: this.y,
        isAlive: this.isAlive,
      });
    }
    static getEnemyInfo() {
      return console.table(this.enemyArr);
    }
    static getAliveEnemies() {
      const aliveEnemies = this.enemyArr.filter(function (enemy) {
        return enemy.isAlive === true;
      });
      return console.table(aliveEnemies);
    }
    constructor(shell) {
      super();
      this._xp = 0;
      this._shellAmount = shell;
      this._fuel = 100;
      this._fuelPerKM = 1;
    }
    get xp() {
      return console.log(Math.floor(this._xp));
    }
    get fuel() {
      return console.log(this._fuel);
    }
  
    tankMove(distance) {
      if (this._fuel > 0) {
        if (this._fuel >= distance * this._fuelPerKM) {
          this.move(distance);
          this._fuel -= distance * this._fuelPerKM;
          this._xp += distance / 10;
        } else {
          distance = this._fuel / this._fuelPerKM;
          this.tankMove(distance); //танк едет столько, сколько хватит топлива
        }
      } else {
        console.log("there is no a fuel!");
      }
    }
    toShoot() {
      if (this._shellAmount > 0) {
        tank._xp++;
        const enemyToShoot = Tank.enemyArr
          .filter(function (enemy) {
            return tank.x === enemy.x || tank.y === enemy.y;
          }) //ищем всех врагом с общими координатами
          .find(function (enemy) {
            return (
              (tank.side === -2 && tank.y < enemy.y) ||
              (tank.side === 0 && tank.y > enemy.y) ||
              (tank.side === 1 && tank.x < enemy.x) ||
              (tank.side === -1 && tank.x > enemy.x)
            ); //ищем врага, в сторону которого повернут танк и, соответвенно, которого можно застрелить
          });
        enemyToShoot.isAlive = false;
        //out of field:
        enemyToShoot.x = 10000;
        enemyToShoot.y = 10000;
        tank._shellAmount--;
        tank._xp += 4;
        console.log(`enemy ${enemyToShoot.id} is shot!`);
      } else {
        console.log("not enough shell");
      }
    }
    toShootOld() {
      if (this._shellAmount > 0) {
        this._xp++;
        for (let enemy of Tank.enemyArr) {
          const { x, y } = enemy;
          if (this.x === x) {
            if (
              (this.side === -2 && this.y < y) ||
              (this.side === 0 && this.y > y)
            ) {
              enemy.isAlive = false;
              //out of field:
              enemy.x = 10000;
              enemy.y = 10000;
              this._shellAmount--;
              this._xp += 4;
              console.log(`enemy ${enemy.id} is shot!`);
            }
          }
          if (this.y === y) {
            if (
              (this.side === 1 && this.x < x) ||
              (this.side === -1 && this.x > x)
            ) {
              enemy.isAlive = false;
              //out of field:
              enemy.x = 10000;
              enemy.y = 10000;
              this._shellAmount--;
              this._xp += 4;
              console.log("enemy is shot!");
            }
          }
        }
      } else {
        console.log("not enough shell");
      }
    }
  }
  
  const tank = new Tank(5);
  Tank.createEnemy(5, 7);
  Tank.createEnemy(77, 20);
  Tank.createEnemy(10, 10);
  Tank.getEnemyInfo();
  tank.rotateRight();
  tank.tankMove(5);
  tank.rotateRight();
  tank.tankMove(9);
  Tank.getEnemyInfo();
  tank.rotateLeft();
  tank.tankMove(5);
  tank.rotateRight();
  tank.getCoord();
  tank.toShoot();
  Tank.getEnemyInfo();
  tank.xp;
  Tank.getAliveEnemies();
  