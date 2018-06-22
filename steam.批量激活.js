/*global

 */
new class steam {
    constructor() {
        this.name = 'steam';
        this.description = '批量激活key';
        this.version = '1.0';
        this.run_at = ["document_domloaded"];
        this.includes = ['.*://.*store.steampowered.com/account/registerkey.*'];
        this.configTaps = [
            {
                title: "配置1",
                key: 0,
            }];
        this.configs = [
            {
                desc: '激活码',
                key: 'steamKey',
                value: [],
                type: 'table',
                importToKey: "key",
                removeWhenImport: "CDK：",
                tapKey: 0,
                columns: [
                    {
                        title: 'key',
                        key: 'key',
                        urlFormat: "https://store.steampowered.com/account/registerkey?key=${value}",
                        type: 'link',
                        width: 150
                    },
                    {
                        title: '激活结果',
                        key: 'result',
                        type: 'text',
                        width: 150
                    }]
            }
        ];
    }

    get_Script() {
        return function () {
            async function test(type) {
                console.log("test");
                let list = await ape_getScriptValue("steamKey", true, []);
                for (const item of list) {
                    let msgArray = ["成功激活", "已经拥有该游戏"];
                    if (item.result) {
                        let found = false;
                        for (const msgItem of msgArray) {
                            if (item.result.indexOf(msgItem) > -1) {
                                found = true;
                                break;
                            }
                        }
                        if (found)
                            continue;
                    }
                    // document.querySelector("#product_key").value = item.key
                    document.querySelector("#accept_ssa").click();
                    document.querySelector("#register_btn").click();

                    await ape_executeAsync(() => {
                        let error = document.querySelector("#error_display").innerHTML;
                        let success = document.querySelector("#receipt_form").style.display !== "none";

                        if (error == "" && !success)
                            //继续等待
                            return false;

                        if (error.indexOf("已拥有此特惠中包含的产品") > 0) {
                            item.result = "已经拥有该游戏";
                        }
                        else
                            item.result = error

                        if (success)
                            item.result = "成功激活";

                        return true;
                    }, 1000 * 30);

                    await ape_setScriptValue("steamKey", list);
                    //防止过快
                    await ape_delay(3000);
                    location = `https://store.steampowered.com/account/registerkey?key=${item.key}`
                    break;
                }
            }
        }
    }

    run_Script(type) {
        return function () {
            test(type);
        }
    }
}()