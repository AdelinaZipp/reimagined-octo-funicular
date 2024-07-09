import undetected_chromedriver as uc
import time
import sys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.remote.webdriver import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

def main():
    chrome_options = Options()
    chrome_options.add_argument("--remote-debugging-port=9222")
    chrome_options.add_argument("--incognito")


    driver = uc.Chrome(headless=False,use_subprocess=False)

    time.sleep(5)
    driver.get('https://www.twitch.tv/')

    time.sleep(5)
    driver.save_screenshot('sc1.png')
    try:
        testy = driver.find_element(By.XPATH, '/html/body/div[1]/div/div[1]/div[1]/div/div/div/div[3]/button')
        testy.click()
        actions = ActionChains(driver)
        actions.send_keys(Keys.TAB)
        actions.send_keys(Keys.TAB)
        # actions.send_keys(Keys.TAB)
        actions.send_keys(Keys.ENTER).perform()
        print(testy)
    except:
        print("An unknown error occurred.")
    time.sleep(7)
    driver.save_screenshot('sc2.png')
    # driver.refresh()
    # driver.add_cookie({'name' : 'auth-token', 'value' : sys.argv[1]})
    # driver.refresh()
    driver.get('https://www.twitch.tv/notfischz')
    time.sleep(5)
    print(driver.current_url)
    time.sleep(36000)
    driver.save_screenshot('sc3.png')
    # actions.send_keys("Tab")
    # actions.send_keys("Tab")

    time.sleep(5)
    driver.close()
# driver.save_screenshot('nowsecure.png')
if __name__ == "__main__":
    main()
