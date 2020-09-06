class Game {
  demandRate = 0;
  currentMaterial = 10000;
  unitMaterialCost = 100;
  money = 0;
  price = 10;
  currentDoner = 0;
  soldDoner = 0;

  //Manufactured
  manufacturedDoner = 0;
  lastManufacturedDonerTs = Date.now();
  lastManufacturedRate = 0;
  lastManufactuerCount = 0;

  //Material Cost
  materialCost = 500;
  lastUpdatedCost = Date.now();

  //Workers
  autoGenerators = {
    errandBoy: 0,
    foreman: 0,
    master: 0,
    errandBoyCost: 100,
    foremanCost: 500,
    masterCost: 2000,
    errandBoyGeneratedRate: 1,
    foremanGeneratedRate: 2,
    masterGeneratedRate: 3,
  };

  //Auto generators
  lastAutoGeneratored = Date.now();

  //Auto Buyer
  autoBuyerCost = 15000;
  hasAutoBuyer = false;
  isAutoBuyerActive = false;
  reqiuredDoner = 2000;

  canMakeDoner = (count) => {
    return this.currentMaterial >= this.unitMaterialCost * count;
  };

  canBuyMaterial = () => {
    return this.money >= this.materialCost;
  };

  canDecreasePrice = () => {
    return this.price > 1;
  };

  canBuyAutoGenerator = (type) => {
    switch (type) {
      case "ERRAND_BOY":
        return this.money > this.autoGenerators.errandBoyCost;
      case "FOREMAN":
        return this.money > this.autoGenerators.foremanCost;
      case "MASTER":
        return this.money > this.autoGenerators.masterCost;

      default:
        return false;
    }
  };
  runAutoBuyer = () => {
    this.isAutoBuyerActive = true;
  };
  stopAutoBuyer = () => {
    this.isAutoBuyerActive = false;
  };

  buyAutoGenerator = (type) => {
    switch (type) {
      case "ERRAND_BOY":
        this.autoGenerators.errandBoy++;
        this.money -= this.autoGenerators.errandBoyCost;
        this.autoGenerators.errandBoyCost += Math.floor(
          (this.autoGenerators.errandBoyCost / 100) * 10
        );

        return;
      case "FOREMAN":
        this.autoGenerators.foreman++;
        this.money -= this.autoGenerators.foremanCost;
        this.autoGenerators.foremanCost += Math.floor(
          (this.autoGenerators.foremanCost / 100) * 10
        );

        return;
      case "MASTER":
        this.autoGenerators.master++;
        this.money -= this.autoGenerators.masterCost;
        this.autoGenerators.masterCost += Math.floor(
          (this.autoGenerators.masterCost / 100) * 10
        );

        return;

      default:
        return false;
    }
  };

  decreasePrice = () => {
    this.price--;
  };
  increasePrice = () => {
    this.price++;
  };

  canBuyAutoBuyer = () => {
    return (
      this.manufacturedDoner >= this.reqiuredDoner &&
      this.money >= this.autoBuyerCost
    );
  };

  hasMoneyForAutoBuyer = () => {
    return this.money > this.autoBuyerCost;
  };

  update = () => {
    this.updateDemand();

    if (Date.now() - this.lastAutoGeneratored > 3000) {
      this.makeDoner(
        this.autoGenerators.errandBoyGeneratedRate *
          this.autoGenerators.errandBoy
      );
      this.makeDoner(
        this.autoGenerators.foremanGeneratedRate * this.autoGenerators.foreman
      );
      this.makeDoner(
        this.autoGenerators.masterGeneratedRate * this.autoGenerators.master
      );
      this.lastAutoGeneratored = Date.now();
    }

    if (
      this.isAutoBuyerActive &&
      this.canBuyMaterial &&
      this.currentMaterial < 500
    ) {
      this.money -= this.materialCost;
      this.buyMaterial();
      console.log(this.isAutoBuyerActive);
    }

    if (Date.now() - this.lastUpdatedCost > 10000) {
      this.lastUpdatedCost = Date.now();
      this.materialCost = Math.floor(Math.random() * 300 + 300);
    }

    if (Date.now() - this.lastManufacturedDonerTs > 5000) {
      this.lastManufacturedDonerTs = Date.now();
      this.lastManufacturedRate = Math.floor(
        (this.manufacturedDoner - this.lastManufactuerCount) / 5
      );
      this.lastManufactuerCount = this.manufacturedDoner;
    }

    if (
      this.currentDoner > 0 &&
      Math.random() * 100 < this.demandRate / 2 &&
      this.currentDoner > 0
    ) {
      this.purchaseDoner();
    }
  };
  makeDoner = (count = 1) => {
    if (this.canMakeDoner(count)) {
      this.currentMaterial -= this.unitMaterialCost * count;
      this.currentDoner += count;
      this.manufacturedDoner += count;
    }
    if (
      this.isAutoBuyerActive &&
      count * this.unitMaterialCost > this.currentMaterial &&
      this.canBuyMaterial
    ) {
      this.money -= this.materialCost;
      this.buyMaterial();
    }
  };

  purchaseDoner = () => {
    this.money += this.price;
    this.currentDoner--;
  };

  buyMaterial = () => {
    if (this.canBuyMaterial()) {
      this.currentMaterial += 10000;
      this.money -= this.materialCost;
      this.materialCost += Math.floor(Math.random() * 10 + 30);
      this.lastUpdatedCost = Date.now();
    }
  };

  canShowAutoBuyer = () => {
    return (
      this.money > this.autoBuyerCost ||
      this.manufacturedDoner >= this.reqiuredDoner
    );
  };

  buyAutoBuyer = () => {
    if (!this.canBuyAutoBuyer()) {
      return;
    }
    this.money -= this.autoBuyerCost;
    this.hasAutoBuyer = true;
    this.isAutoBuyerActive = true;
  };

  updateDemand = () => {
    let rate;
    if (this.price <= 40) {
      rate = (2 / Math.sqrt(this.price)) * 100;
    } else {
      const maxRate = (2 / Math.sqrt(40)) * 100;
      // 40$ 20%
      // 60t$ 0%
      rate = (maxRate * (60 - this.price)) / 20;
    }
    this.demandRate = Math.floor(Math.max(0, rate));
  };
}

export default Game;
