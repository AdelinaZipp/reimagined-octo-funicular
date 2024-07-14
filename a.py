import nodriver as uc
import time
import sys
import asyncio
async def main():


    browser = await uc.start()

    await time.sleep(5)
    await browser.get('https://www.twitch.tv/')

    await time.sleep(5)
    # driver.refresh()
    await browser.get('https://www.twitch.tv/notfischz')
    await time.sleep(5)
    await print(driver.current_url)
    await time.sleep(36000)
    # actions.send_keys("Tab")
    # actions.send_keys("Tab")

    await time.sleep(5)
    await browser.close()
# driver.save_screenshot('nowsecure.png')
if __name__ == "__main__":
    uc.loop().run_until_complete(main())
