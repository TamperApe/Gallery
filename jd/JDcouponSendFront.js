/*global

$
 */
new class jd {
    constructor() {
        this.name = 'jd抢券';
        this.description = 'jd抢券';
        this.version = '1.0';
        this.run_at = ["document_domloaded"];
        this.includes = ['.*sale.jd.com/act.*'];
    }
    get_Script() {
        return function () {

            async function JDcouponSendFront(key, ruleId) {
                var url = `https://act-jshop.jd.com/couponSend.html?ruleId=${ruleId}&key=${key}&eid=6Z5SLFNNL2EKE735BLZLR2VCJUK3AOWMQF46PCNQORWFKJIDZPDVZT6434ORRQXZV2D35KL3CH6JSLF3D4URRY3DEU&fp=f0a87f12bc81fc9ff089002b753efbf9&shshshfp=0bf146c789eadfc732554a6f4fe714c7&shshshfpa=a314ef1c-649c-acbe-4f3a-64ceffb174e3-1530803262&shshshfpb=2aea9736129de48dea371995931286fce55ffd4d571679464cb1a51970&jda=122270672.753866854.1527656516.1530931419.1530934536.16&pageClickKey=pageclick%7Ckeycount%7Ccoupon_simple_36593916_1%7C0&platform=0&applicationId=1587745`;
                $.ajax(url, {
                    dataType: 'jsonp',
                    crossDomain: true,
                    success: function (data) {
                        console.log(data);
                    }
                })
            }

            async function RunJD(type) {
                let ready = undefined;
                while (!ready) {
                    //等待样式加载完成
                    ready = $('.j-module.normal-coupons a span').css('background-position');
                    await ape_delay(1000);
                }
                dataList = $(".j-module.normal-coupons a");

                dataDict = {}
                dataList.each(function (index) {
                    item = $(this)
                    let span = item.find("span");
                    let backgroundPos = span.css('background-position');
                    if (!backgroundPos || backgroundPos != "0px -160px")
                        return;
                    let data_key = item.attr("data-key");
                    let data_ruleid = item.attr("data-ruleid");
                    if (!data_key)
                        return;
                    // console.log(item);

                    dataDict[data_key] = {
                        key: data_key,
                        ruleId: data_ruleid
                    }
                })

                let readyExecute = false
                let canExecute = false
                executeHours = [10, 12, 14, 18, 20]
                console.log("抢券运行中")
                while (true) {
                    let timeNow = new Date()
                    for (const hour of executeHours) {
                        let tempTime = new Date();
                        tempTime.setHours(hour);
                        tempTime.setMinutes(0);
                        tempTime.setSeconds(0);

                        let subResult = (tempTime - timeNow) / 1000   //秒
                        if (subResult > 40 || subResult < -40)
                            continue;

                        if (subResult > 10 && subResult < 35) {
                            //还有30秒就开始准备，加快频率
                            readyExecute = true
                            // console.log("ready");
                            break;
                        }
                        else if (subResult < 10 && subResult > -35) {
                            canExecute = true
                            // console.log("go");
                            break;
                        }
                        else {
                            readyExecute = canExecute = false;
                            // console.log("normal")
                        }
                    }
                    if (executeHours.index(timeNow.getHours()) > 0)
                        if (canExecute) {
                            for (let key in dataDict) {
                                let tempData = dataDict[key];
                                await JDcouponSendFront(tempData.key, tempData.ruleId);
                            }
                        }

                    if (readyExecute)
                        await ape_delay(100);
                    else
                        await ape_delay(1000);
                }
            }
        }
    }

    run_Script(type) {
        return function () {
            RunJD(type)
        }
    }
}()
