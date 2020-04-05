describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('Koa • Todo');
    })
    it('should new todo correct', async function() {
      //点击输入框
      await page.click('#new-todo', {delay: 500});
      //输入内容
      await page.type('#new-todo', 'new todo item', {delay: 50});
      //点击enter
      await page.keyboard.press("Enter");
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 
  
  });

  
describe('delete todo', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:7001/');
  });
  after (async function () {
    await page.close();
  });

 it('should delete todo correctly',async function(){
    let before = await page.$$eval('#todo-list li',list=> list.length);
    await page.evaluate(()=> {
    document.querySelector('.destroy').click()
  });
    await page.waitFor('#todo-list');
    let after = await page.$$eval('#todo-list li',list=>list.length);
    expect(after).to.eql(before-1);
 })
  
});


describe('get todo', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:7001/');
  });
  after (async function () {
    await page.close();
  });

  it('should get todo correctly',async function(){
    let list = await page.$$('#todo-list li');
     expect(list).to.have.property('length');
   })
  
});