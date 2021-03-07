import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import cheerio from 'cheerio';



@Injectable()
export class ProductsService {


    async createProduct(product) {
        const productObject = {
            productSku: undefined,
            productTitle: undefined,
            productPrice: undefined,
            productPriceRange: undefined,
            productDescription: undefined,
            gallery: [],
            variation:[]
        };
        //selecionando linguagem e moeda
        try {
          const browser = await puppeteer.launch({headless: false});
          const page = await browser.newPage();
          await page.goto(product.url);
          await page.waitForSelector("#nav-global");
          await page.click('div[data-role="region-pannel"]');
          await page.click('.switcher-language');
          await page.click('.language-selector');
          await page.click('.language-selector > ul[data-role="language-list"] > li > a[data-locale="en_US"]');
          await page.waitForSelector('div[data-role="switch-currency"]');
          await page.click('div[data-role="switch-currency"]');
          await page.click('.switcher-currency > div[data-role="switch-currency"] > ul > li > a[data-currency="USD"]');
          await page.click('.switcher-btn > button[data-role="save"]');


        //language-selector



        await page.waitForSelector("#root");
        const arrayProperty = [];

        productObject.productPrice = await page.$eval('.product-price > .product-price-current > span.product-price-value', el => el.textContent);
        productObject.productTitle = await page.$eval('.product-info > .product-title > h1', el => el.textContent);
        productObject.productPriceRange = await page.$eval('.product-price', el => el.textContent);

        const productInfo = await page.$eval('.product-info > .product-sku > .sku-wrap', el => el.innerHTML)
        //console.log(productInfo);

        const galleryInfo = await page.$$('.images-view-wrap > .images-view-list > li')
        // let productinfohtml =await cheerio.load(productInfo);
        // console.log(productinfohtml('.sku-property').find('.sku-title"').text().trim());
        //
        // const resultXyew = await page.evaluate(_ =>
        //   Array.from(
        //     document.querySelectorAll(productInfo))
        //             .map(books => books.getAttribute('alt'))
        // )
        const resultXs = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('.sku-property')).reduce(
            (result, book) => {
              return {
                title: book.getElementsByClassName,
            //    price: book.getElementsByClassName('sku-property-list')[0].innerText,
              }
            }, {})
        })
        console.log(resultXs)

        for (const img of galleryInfo)
        {
            await img.click()
            productObject.gallery.push(await page.$$eval('.image-view-magnifier-wrap img', imgs =>
                    imgs.map(imgs => imgs.getAttribute('src'))
            ));

       }
            console.log(productObject)
       //
         for (const li of productInfo)
         {
            try{
                 const variationProduct = {
                     title: undefined,
                     src: undefined,
                     price: undefined,
                     srcFull: undefined,
                 };

       //
                 // for (const va of variation){
                 //
                 //   // await va.$('.sku-property-list > li').click();
                 //    let propertyName = await va.$eval('.sku-title',img => img.textContent);
                 //
                 //    propertyName = propertyName.toLowerCase().replace(':','');
                 //    console.log(propertyName)
                 //    if(propertyName == 'color' )
                 //    {
                 //        console.log('entrou')
                 //        console.log(await va.$eval('.sku-title',img => img.textContent))
                 //        //console.log(await va.$eval('.sku-property-list',img => img.getAttribute('src')))
                 //        console.log(await va.$eval('.sku-property-list > li > div > img',img => img.getAttribute('title')))
                 //        console.log(await va.$eval('.sku-property-list > li > div > img',img => img.getAttribute('src')))
                 //       // console.log(await page.$eval('.product-price', el => el.innerHTML))
                 //        console.log(await page.$eval('.product-price > div > span.product-price-value', el => el.textContent))
                 //       // console.log(await page.$eval('.image-view-magnifier-wrap img', imgs => imgs.getAttribute('src')))
                 //        productObject.variation.push({
                 //            "propertyType":await va.$eval('.sku-title',img => img.textContent),
                 //            "title" : await va.$eval('.sku-property-list > li > div > img',img => img.getAttribute('title')),
                 //            "src" : await va.$eval('.sku-property-list > li > div > img',img => img.getAttribute('src')),
                 //            "price" :await page.$eval('.product-price > div > span.product-price-value', el => el.textContent),
                 //           // "srcFull" : await page.$eval('.image-view-magnifier-wrap img', imgs => imgs.getAttribute('src'))
                 //        });
                 //    }
                 //    if(propertyName == "size" )
                 //    {
                 //        console.log('entrou 2')
                 //        productObject.variation.push({
                 //            "propertyType":await va.$eval('.sku-title',img => img.textContent),
                 //            "title" : await va.$eval('.sku-property-list > li > img',img => img.getAttribute('title')),
                 //            "src" : await va.$eval('.sku-property-list > li > img',img => img.getAttribute('src')),
                 //            "price" : await page.$eval('.product-price > .product-price-current > span.product-price-value', el => el.textContent),
                 //            "srcFull" : await page.$eval('.image-view-magnifier-wrap img', imgs => imgs.getAttribute('src'))
                 //        });
                 //    }
                 //
                 // }
             }catch (e) {
                console.log(e.getExceptionMessage)
                console.log("error")
                 continue;
             }
       //
        }
       //
       browser.close()
       // console.log(productObject)
       return productObject;
     } catch (error) {
       console.log(error);
     }


    }


}
