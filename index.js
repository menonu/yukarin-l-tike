const puppeteer = require('puppeteer');

const width = 1920, height = 1080;

const info = {
  mail: "example@example.com",
  tel: "09012345678",
  pwd: "1234",
  lastname_kanji: "姓",
  firstname_kanji: "名",
  lastname_kana: "セイ",
  firstname_kana: "メイ",
  birthday: {
    year: '1976',
    month: '2',
    day: '27',
  },
  gender: 'men', // 'men' or 'women'
  zip: "0000000",
  lnum: "１－１－１",
  oth: "バッキンガム宮殿１１１",
  mellowpretty_number: "00000",
  mellowpretty_pass: "password",
  how_many_tickets: '1',
};

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = (await browser.pages())[0];
  await page.setViewport({ width, height });
  await page.goto('https://www.mellowpretty.com/');

  await page.click('p.login.modal-open.pc');

  await page.type('input[name="login_id"]', info.mellowpretty_number, { delay: 10 });
  await page.type('input[name="login_pass"]', info.mellowpretty_pass, { delay: 10 });
  await page.click('#login_form button');

  await page.waitForNavigation({ timeout: 60000, waitUntil: "load" });

  await page.goto('https://www.mellowpretty.com/member/twilightchandelier/', { waitUntil: "domcontentloaded" });

  await page.click('input[type="submit"]');

  await page.waitForSelector('#CONSENT_CHK_BOX');
  await page.click('#CONSENT_CHK_BOX');
  await page.click('#NEXT');
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

  await page.waitFor('.ticketSalesSelectBox2.heightLine-pfday');
  console.log('waiting user input...');

  await page.click('.ticketSalesSelectBox2.heightLine-pfday');
  await page.waitFor('#c_PRT_CNT1');
  await page.select('#c_PRT_CNT1', info.how_many_tickets);
  await page.click('#c_SEL');

  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

  await page.type('#MAIL_ADDRS', info.mail);
  await page.type('#MAIL_ADDRS_CONFIRM', info.mail);
  await page.type('#TEL', info.tel);
  await page.type('#TEL_CONFIRM', info.tel);
  await page.click('#NEXT');

  console.log('waiting user input...');

  await page.waitFor('#PWD');

  await page.type('#PWD', info.pwd);
  await page.type('#PWD_CNF', info.pwd);
  await page.type('#APLCT_FIRST_NAME', info.lastname_kanji);
  await page.type('#APLCT_LAST_NAME', info.firstname_kanji);
  await page.type('#APLCT_FIRST_NAME_KANA', info.lastname_kana);
  await page.type('#APLCT_LAST_NAME_KANA', info.firstname_kana);
  await page.select('#APLCT_BIRTHDAY_YEAR', info.birthday.year);
  await page.select('#APLCT_BIRTHDAY_MONTH', info.birthday.month);
  await page.select('#APLCT_BIRTHDAY_DAY', info.birthday.day);
  info.gender === 'men' ?
    await page.click('#APLCT_GENDER-1') :
    await page.click('#APLCT_GENDER-2');

  await page.type('#APLCT_ZIP', info.zip, { delay: 10 });
  await page.waitFor('.js-validate.js-validate-postnum01.required.valid');
  await page.click('#APLCT_ADDRESS_SEARCH_BUTTON');
  await page.waitFor('.js-validate.js-validate-zenkaku01.inputTextWidth550.required.valid');
  await page.type('#APLCT_LNUM', info.lnum);
  await page.type('#APLCT_OTH', info.oth);
  await page.type('#q_1', info.mellowpretty_number)

  console.log("Done. Please validate your infomation and proceed.");
})();