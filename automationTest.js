/* eslint-disable jest/valid-expect */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');

const {
    Builder,
    By,
    until
} = require('selenium-webdriver');

const driver = new Builder().forBrowser('chrome').build();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Gaia space testing', () => {
    describe('Succesfully log in', () => {
        it('The user can log in', async () => {
            await driver.manage().window().maximize();
            await driver.manage().window().fullscreen();
            await driver.get('https://gaiadev.z13.web.core.windows.net/#/');
            const email = driver.findElement(By.id('login-page-user-input'));
            email.sendKeys('admin@celerik.com');
            const password = driver.wait(until.elementLocated(By.id('login-page-password-input')), 2000);
            password.sendKeys('1234567a');
            await driver.findElement(By.id('login-page-continue-button')).click();
            const content = driver.wait(until.elementIsVisible(By.xpath("//img[contains(@src,'server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile')]")), 1);
            expect(content).to.exist;
            await sleep(1000);
            await driver.executeScript('core.globalUI.logout()');
            await driver.wait(until.elementLocated(By.id('login-page-password-input')));
        });
        afterEach(async () => driver.quit());
    });
    // describe('Fail log in', () => {
    //     it('The user can not log in', async () => {
    //         await driver.manage().window().maximize();
    //         await driver.manage().window().fullscreen();
    //         await driver.get('https://gaiadev.z13.web.core.windows.net/#/');
    //         const correo = driver.findElement(By.id('login-page-user-input'));
    //         correo.sendKeys('admin@celerik.com');
    //         const pass = driver.findElement(By.id('login-page-password-input'));
    //         pass.sendKeys('123');
    //         const button = driver.wait(until.elementLocated(By.id('login-page-continue-button')), 20000);
    //         button.click();
    //         const content = (await driver.wait(until.elementLocated(By.id('login-page-password-input-helper')), 20000)).getText();
    //         expect(content).to.equal('Invalid password');
    //     });
    // });
});
