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

            }
        ];
    }

    get_Script() {
        return function () {
            async function people(type) {
                // alert(type);
            }

            async function runBH(type) {

                console.info('bh');
                let currentUrl = window.location.toString();
                if (currentUrl.search('bihu.com/people') > -1) {
                    people(type);
                    return;
                }

                await ape_wait('.home-list.text-center a', 60 * 1000);
                let headInfoHTML;
                let links = document.querySelectorAll('.home-list.text-center a');
                //等待数据显示
                await ape_wait('.alt-list li .head-info', 60 * 1000);

                for (const a of links) {
                    console.info(a.href);
                    if (currentUrl.search(a.href) > -1) {
                        continue;
                    }
                    a.click();

                    let btnLatest = document.evaluate("//a[contains(., '最新')]", document, null, XPathResult.ANY_TYPE, null).iterateNext();
                    if (btnLatest != null)
                        btnLatest.click();

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

                    await ape_delay(1000);
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