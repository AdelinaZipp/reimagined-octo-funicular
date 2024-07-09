import undetected_chromedriver as uc
import time
import sys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.remote.webdriver import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


chrome_options = Options()
chrome_options.add_argument("--remote-debugging-port=9222")
chrome_options.add_argument("--incognito")


driver = uc.Chrome(headless=False,use_subprocess=False)

time.sleep(5)
driver.get('https://www.twitch.tv/')

time.sleep(5)
driver.add_cookie({'name' : 'auth-token', 'value' : sys.argv[1]})
driver.get('https://www.twitch.tv/')
time.sleep(2)
driver.save_screenshot('sc1.png')
testy = driver.find_element(By.CLASS_NAME, 'consent-banner')
testy.click()
actions = ActionChains(driver)
actions.send_keys(Keys.TAB)
actions.send_keys(Keys.TAB)
actions.send_keys(Keys.TAB)
actions.send_keys(Keys.ENTER).perform()
time.sleep(4)
driver.save_screenshot('sc2.png')
# actions.send_keys("Tab")
# actions.send_keys("Tab")
print(testy)
time.sleep(5)
driver.close()
# driver.save_screenshot('nowsecure.png')
