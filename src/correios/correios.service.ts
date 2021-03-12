import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';



@Injectable()
export class CorreiosService {
    private mailData: any;


    async findPackageCorreio(rastreio) {
        //selecionando linguagem e moeda
        const browser = await puppeteer.launch();
        try {


            const data = JSON.parse(rastreio.codigos);
            this.mailData = new Map();
           // console.log(data);
            for(let i = 0; i < data.length; i++) {
                console.log(data.length);
                console.log(data[i]);
                const page = await browser.newPage();
                await page.goto("https://www2.correios.com.br/sistemas/rastreamento/default.cfm");
                await page.waitForSelector('#objetos');
                await page.type('#objetos', data[i]);
                await Promise.all([ page.waitForNavigation({waitUntil:'networkidle0'}), await page.click('#btnPesq')])
                await page.waitForSelector('.ctrlcontent');
                this.mailData.set( data[i],await page.$eval('.ctrlcontent > table > tbody > tr', el => el.textContent));
                await page.close();
            }
            browser.close();
            console.log(this.mailData);

            return  JSON.stringify(mapToObj(this.mailData));

        } catch (error) {
            browser.close();
            console.log(error);
        }

        function mapToObj(inputMap) {
            const obj = {};

            inputMap.forEach(function(value, key){
                obj[key] = value
            });

            return obj;
        }



    }


}
