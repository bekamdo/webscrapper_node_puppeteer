const puppeteer = require("puppeteer");
const fs = require("fs");


async function run(){
    const search = "sport"
    const browser = await puppeteer.launch();
    const page = await browser.newPage();



    await page.goto(`https://www.theguardian.com/${search}` || `https://www.theguardian.com/uk/${search}`);

    

    const news = await page.evaluate(() => Array.from(document.querySelectorAll(".dcr-dbozpd"),(e) =>({
        title : e.querySelector("h3 > :first-child").innerText,
        description:e.querySelector("h3 span").innerText,
       
    })));

  
3
   // save data to a JSON FILE
   fs.writeFile("news_headline.json",JSON.stringify(news),(err) => {
    if(err){
        throw err;
       
    }
    console.log("file has been saved")

   })
   

  
  


    await browser.close();


}

run();