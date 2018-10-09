/*global

 */
new class steam {
    constructor() {
        this.name = 'steam批量下架';
        this.description = 'steam批量下架';
        this.version = '1.0';
        this.run_at = ["document_domloaded"];
        this.includes = ['.*://.*steamcommunity.com/market*'];
        this.configTaps = [
            {
                title: "配置1",
                key: 0,
            }];
        this.configs = [

        ];
    }

    get_Script() {
        return function () {
            async function test(type) {
                // alert(21);
                console.log("test");
                // while (true) {
                var list = Array.from(
                    document.querySelectorAll(".item_market_action_button_contents")
                ).filter(el => el.innerText === '撤下');
                // alert(1);

                if (list.length == 0)
                    return;

                for (var i = 0; i < list.length; i++) {
                    element = list[i];
                    element.click()
                    // await ape_delay(5000);
                    await ape_wait("#market_removelisting_dialog", 5 * 1000)
                    await ape_waitVanish("#market_removelisting_dialog", 2 * 1000)
                    document.querySelector("#market_removelisting_dialog_accept").click()
                    await ape_delay(2000);
                }

                window.location.reload();
                // }
            }
        }
    }

    run_Script(type) {
        return function () {
            test(type);
        }
    }
}()