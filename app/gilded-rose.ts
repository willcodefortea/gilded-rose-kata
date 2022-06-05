export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

type UpdateQuality = (item: Item) => void;

const addQuality = (item: Item, amount: number) => {
  item.quality = Math.min(item.quality + amount, 50);
  item.quality = Math.max(item.quality, 0);
};

const DEFAULT_STRATEGY = (item: Item) => {
  item.sellIn = Math.max(0, item.sellIn - 1);
  const qualityReduction = item.sellIn === 0 ? 2 : 1;
  addQuality(item, qualityReduction * -1);
};

const QUALITY_STRATEGIES: { [key: string]: UpdateQuality } = {
  "Aged Brie": (item) => {
    addQuality(item, 2);
  },
  "Sulfuras, Hand of Ragnaros": () => {},
  "Backstage passes to a TAFKAL80ETC concert": (item: Item) => {
    let qualityIncrease: number;
    if (item.sellIn > 10) {
      qualityIncrease = 1;
    } else if (item.sellIn > 5) {
      qualityIncrease = 2;
    } else {
      qualityIncrease = 3;
    }
    addQuality(item, qualityIncrease);

    item.sellIn = Math.max(0, item.sellIn - 1);
    if (item.sellIn === 0) {
      item.quality = 0;
    }
  },
  Conjured: (item) => {
    const qualityReduction = (item.sellIn === 0 ? 2 : 1) * 2;
    addQuality(item, qualityReduction * -1);
  },
};

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      const strategy = QUALITY_STRATEGIES[item.name] ?? DEFAULT_STRATEGY;
      strategy(item);
    });

    return this.items;
  }
}
