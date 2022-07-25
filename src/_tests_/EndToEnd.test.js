import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(60000);
    browser = await puppeteer.launch();

    page = await browser.newPage();
    await page.goto("http://localhost:3000/meet_");
    await page.waitForSelector(".event-visible");
  });

  afterAll(() => {
    browser.close();
  });

  test("an event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event-visible .event-details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event-visible .btn-details");
    const eventDetails = await page.$(".event-visible .event-details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".event-visible .btn-details");
    const eventDetails = await page.$(".event-visible .event-details");
    expect(eventDetails).toBeNull();
  });
});
