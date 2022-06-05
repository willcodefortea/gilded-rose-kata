import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  describe("a regular item item", () => {
    test("quality goes down by one prior to sell by date", () => {
      const gildedRose = new GildedRose([new Item("t-shirt", 50, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(9);
    });

    test("sellIn goes down by one", () => {
      const gildedRose = new GildedRose([new Item("t-shirt", 50, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(49);
    });

    test("quality goes down by two after sell by date", () => {
      const gildedRose = new GildedRose([new Item("t-shirt", 0, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
    });

    test("quality does not go below 0", () => {
      const gildedRose = new GildedRose([new Item("t-shirt", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe("aged brie", () => {
    test("aged brie should increase in testy", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(2);
    });

    test("aged brie's quality cannot go above 50", () => {
      const gildedRose = new GildedRose([new Item("Aged Brie", 0, 49)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(50);
    });
  });

  describe("sulfuras", () => {
    test("quality is never modified", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 10, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(80);
    });

    test("sellIn is never modified", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 10, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(10);
    });
  });

  describe("Backstage passes", () => {
    test("quality increases by 1 when there are more than 10 days to concert", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(11);
    });

    test("quality increases by 2 when there are more than 5 but less than 10 days to concert", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(12);
    });

    test("quality increases by 3 when there are more than fewer than 5 days to the concert", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(13);
    });

    test("quality drops to zero after the concert", () => {
      const gildedRose = new GildedRose([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 100),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(0);
    });
  });

  describe("Conjured items", () => {
    test("they degrade twice as fast", () => {
      const gildedRose = new GildedRose([new Item("Conjured", 10, 10)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(8);
    });
  });
});
