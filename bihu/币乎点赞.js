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
                console.log("B1H");
                alert("12");
                console.log("BH");

                let currentUrl = window.location.toString();
                if (currentUrl.search('bihu.com/people') > -1) {
                    people(type);
                    return;
                }


                let links = document.querySelectorAll('.home-list.text-center a');
                for (const a of links) {
                    console.log(a.href);
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