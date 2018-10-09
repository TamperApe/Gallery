/*global

 */
new class bihu {
    constructor() {
        this.name = 'bihu点赞';
        this.description = '自动点赞';
        this.version = '1.0';
        this.run_at = ["document_domloaded"];
        this.includes = ['.*://.*bihu.com.*'];
        this.configTaps = [
            {
                title: "配置1",
                key: 0,
            }];
        this.configs = [
            {
                desc: '允许参数',
                key: 'clickedList',
                type: 'table',
                tapKey: 0,
                columns: [
                    {
                        title: '已点网址',
                        key: 'url',
                        type: 'link',
                        width: 150
                    }, {
                        title: '点击日期',
                        key: 'clickTime',
                        type: 'date',
                        defaultValue: 50,
                        width: 150
                    }
                ]
            }
        ];
    }

    get_Script() {
        return function () {
            async function article(type) {
                await ape_wait(".row .article-details-btn", 60 * 1000);
                document.querySelector(".row .article-details-btn").scrollIntoView();

                //*[@id="root"]/div/div[1]/div/div/div/div[5]/div/div[2]/button
                let btnLike = document.evaluate("//*[@id='root']/div/div[1]/div/div/div/div[5]/div/div[2]/button", document, null, XPathResult.ANY_TYPE, null).iterateNext();
                console.info(btnLike.className);
                if (btnLike.className === "active") {
                    await ape_delay(3000 * 5);
                    window.close()
                }
                else {
                    btnLike.click();

                    let clickedList = await ape_getScriptValue("clickedList", true, []);
                    clickedList.push({
                        url: window.location.toString(),
                        clickTime: new Date()
                    });

                    await ape_setScriptValue("clickedList", clickedList);
                    await ape_delay(1000 * 5);
                    window.close();
                }
                // alert(type);
            }

            async function runBH(type) {

                console.info('bh');
                let currentUrl = window.location.toString();
                if (currentUrl.search('bihu.com/article') > -1) {
                    article(type);
                    return;
                }

                await ape_wait('.home-list.text-center a', 60 * 1000);
                let headInfoHTML;
                let links = document.querySelectorAll('.home-list.text-center a');
                //等待数据显示
                await ape_wait('.alt-list li .head-info', 60 * 1000);

                while (true) {
                    links = document.querySelectorAll('.home-list.text-center a');
                    await ape_delay(5000);
                    //轮询左侧标题栏
                    for (const a of links) {
                        await ape_delay(5000);
                        console.info(a.href);
                        if (currentUrl.search(a.href) > -1) {
                            continue;
                        }
                        a.click();

                        //有最新按钮点最新
                        let btnLatest = document.evaluate("//a[contains(., '最新')]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
                        if (btnLatest != null) {
                            btnLatest.click();

                            //等待数据加载
                            if (!headInfoHTML)
                                headInfoHTML = document.querySelector(".alt-list").innerHTML;
                            else {
                                await ape_executeAsync(() => {
                                    let temp = document.querySelector(".alt-list").innerHTML;
                                    let resut = headInfoHTML != temp;
                                    if (resut)
                                        headInfoHTML = document.querySelector(".alt-list").innerHTML;
                                    return resut;
                                }, 20 * 1000);
                            }
                        }

                        //查找数据
                        let list = document.querySelectorAll(".no-title-bottom");
                        for (const item of list) {
                            let monkey = Number(item.querySelectorAll("span")[0].innerText);
                            let like = Number(item.querySelectorAll("span")[1].innerText);
                            if (monkey > 200 && like <= 45) {
                                console.info("找到高质量贴", monkey, like, item);
                                //打开详细页


                                item.querySelectorAll("span")[1].click()
                            }
                        }
                    }
                }
            }
        }
    }

    run_Script(type) {
        return function () {
            runBH(type);
        }
    }
}()