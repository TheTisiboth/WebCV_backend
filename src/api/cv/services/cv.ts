/**
 * cv service
 */
import {Strapi} from "@strapi/types/dist/core";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

export default ({strapi}: { strapi: Strapi }) => ({
    fetchCVS: async () => {
        console.log('Fetching documents...');
        puppeteer.use(StealthPlugin());

        const browser = await puppeteer.launch({ headless: false,args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        try {
            await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

            await page.goto('https://www.linkedin.com/in/leo-jan/', { waitUntil: 'networkidle2' });
            await new Promise(resolve => setTimeout(resolve, 20000));
            // scroll down until the 'Sélection' section is loaded
            await page.evaluate(() => {
                // @ts-ignore
                window.scrollTo(0, document.body.scrollHeight);
            });
            // for each document:
            // 1. click on the document
            // 2. Click on the fullscreen button
            // 3. Move the cursor to the top right corner
            // 4. Click on the download button


            // Get the URLs of the documents
            const documentUrls = await page.evaluate(() => {
                // @ts-ignore
                console.log(document)
                // @ts-ignore
                const documents = Array.from(document.querySelectorAll('.pv-highlight-entity__primary-text'));
                // @ts-ignore
                return documents.map(doc => (doc as HTMLAnchorElement).href).filter(Boolean);
            });
            console.log('done')
            await browser.close();

            return {
                frenchCV: documentUrls[0],
                englishCV: documentUrls[1],
                germanCV: documentUrls[2],
            };
        } catch (error) {
            await browser.close();
            return error.message
        }
    }
})

