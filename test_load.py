import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # Capture console logs
        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Browser Error: {err}"))
        
        # Load the file
        await page.goto("file:///Users/macbook/Desktop/BPMN%20System/index.html")
        await asyncio.sleep(2)
        await browser.close()

asyncio.run(main())
