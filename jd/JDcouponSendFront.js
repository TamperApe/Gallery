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
            async function JDcouponSendFront(type) {
                await ape_wait(".j-module.normal-coupons", 60 * 1000);
                console.log(document.querySelector(".j-module.normal-coupons"));

                let headers = new Headers();
                headers.append('Host', 'act-jshop.jd.com');
                headers.append('Connection', 'keep-alive');
                headers.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36');
                headers.append('Accept', '*/*');
                headers.append('Referer', 'https://sale.jd.com/act/8Ak3ilHTvYR7.html?cpdad=1DLSUE');
                headers.append('Accept-Encoding', 'gzip, deflate, br');
                headers.append('Accept-Language', 'zh,en;q=0.9,en-US;q=0.8,zh-CN;q=0.7');
                headers.append('Cookie', 'unick=socket2012; _tp=%2FiNqlprz59DkD%2B8RMN4MWQ%3D%3D; _pst=dhswg20077; pin=dhswg20077; user-key=0a9c0b3f-7444-4440-920d-460968c58b22; ipLoc-djd=22-1930-50946-52194.546535183; ipLocation=%u56DB%u5DDD; __jdu=753866854; PCSYCityID=1930; pinId=kb83_pzNsACbZUOy8uQY3A; areaId=22; __jdv=122270672|baidu-search|t_262767352_baidusearch|cpc|44730323149_0_fe608b84bf884638a53d2b01cd061067|1530668049982; mt_xid=V2_52007VwUWUFRfVVMbTClYUmIDFwdeDU4IG08fQAA1AxtODlgCCgNOSQsHYlERW1tQBl4vShhcDHsCFE5cXUNbF0IbWQ5jACJQbVtiWR5PEVkAVwAVUls%3D; cn=7; shshshfpa=a314ef1c-649c-acbe-4f3a-64ceffb174e3-1530803262; shshshfpb=2aea9736129de48dea371995931286fce55ffd4d571679464cb1a51970; shshshfp=0bf146c789eadfc732554a6f4fe714c7; mba_muid=753866854; __jdc=122270672; wlfstk_smdl=atgz9v7dqokz8dy0co3mdtxqwe1aoh5y; TrackID=1GEaXeWQzFrFAWVrfYfAwY8-2v7KXqq8FG14Op2S8rKmduDqq7v4EQ73jE9Yw7-OM8vi83oIzbeMqE0ftDSmRIcfP1ynLVw297RR8aPnog3k; ceshi3.com=103; 3AB9D23F7A4B3C9B=6Z5SLFNNL2EKE735BLZLR2VCJUK3AOWMQF46PCNQORWFKJIDZPDVZT6434ORRQXZV2D35KL3CH6JSLF3D4URRY3DEU; __jda=122270672.753866854.1527656516.1530931419.1530934536.16; JSESSIONID=ADF3DCC96CDDCE7AA6C76D8B9F830FCB.s1; unpl=V2_ZzNtbRUHS0B3DBIEfBwOV2IEQghKAxQUcVwWAykeWQZgB0JcclRCFXwUR1JnGFoUZwAZXkNcQBBFCEdkex5fDGQzEl5LUkQcfQx2ZHgZbAVhMxRZQF5EEnwMQ2RLHmw1s5a5hcnAEVQ30fbxrbPyNWAGFVtLXkYRRQl2VUtSMgQqBRZfS1BEHHENdlVLGg%3d%3d; CCC_SE=ADC_Kpn%2bavZ5difE7L0lNuvhgOItOxM78CLjnKeDkd5Om4OqrXXbS8mKeaxWBbhrnAKjn5cDEmsoBcuUmfRXlAUH0yDiHlitIEH8uCeWiYwTdxBvm9y347I%2fK6hJnYtft1HWXa5zLZHn4dWzkZAbyu%2fOAa6ZQBqBCZKRiWaECWEqS8hG3lJ4khxX1gAsU6CH46Xr7nJFpF8QQBfSybbFBmCbQvmwFhzRXNZp7sU3XRJAk1tCadqZnV9dt4uqIWS19s99Jzo9DYOkj%2bKXGB%2fMwdM1orfEB25WvdmbSekKtjYnd8tA3u027kNCh3N108LlIpclUD4M9NO%2bdsOctX%2bTdisxwguodp6iAj5mYBtqiVZcR5JNzeZVNoQnwue9fkXuE140rrM08jMF5yr7GgcFoCZIBxW378cB7xbntXEOYE5awzYJw1QZCz4G12R7v2XSGR2kfLUFS2gJd%2bmoyuud9bvaBRdhkb6jCKw0YbSscgYWVw2UPOlWMozJvG9A33f%2bT6ip0oe2tzss%2bQB%2fYIJk97vat4ejqJFy4e1MiyBq5TTHcTJQPoKOzxwuyLpLc%2fGVmkviO0VeEvb5wPrCSjUCiWICw8dgoIW%2b6yNDtgffrTmqR5MAdbggfr0N2pwqdyzNWqhL; thor=0D7DF55D19DA1D9C945E04B3B2F8E78F44679040A47BE37E0F0850FE76E4DA44F315D22520745B9E2CB3E5AFCFB91F3D5A781FF78D99FD3E657CA57E0FCFC1699D534FD1B30D017B26BD0B8C74DACE2BD506E19D1D352D3930F9C1CB43C0AD5186DA1727647A6D01AE5C35C13DBC0C39BBDA3CB027C746C69B2AFBEA83836682F4D6AC815B50576CAAA7822615F546BD; __jdb=122270672.45.753866854|16.1530934536; shshshsID=79cb8773a7016367f2cbf0f2cec2514e_25_1530940153981                ');
                let init = {
                    method: 'GET',
                    headers: headers,
                    // mode: 'no-cors',
                    // cache: 'default'
                };

                let request = new Request('https://act-jshop.jd.com/couponSend.html?ruleId=12816306&key=d88304accdc44958b2eb761799fd21de&eid=6Z5SLFNNL2EKE735BLZLR2VCJUK3AOWMQF46PCNQORWFKJIDZPDVZT6434ORRQXZV2D35KL3CH6JSLF3D4URRY3DEU&fp=f0a87f12bc81fc9ff089002b753efbf9&shshshfp=0bf146c789eadfc732554a6f4fe714c7&shshshfpa=a314ef1c-649c-acbe-4f3a-64ceffb174e3-1530803262&shshshfpb=2aea9736129de48dea371995931286fce55ffd4d571679464cb1a51970&jda=122270672.753866854.1527656516.1530931419.1530934536.16&pageClickKey=pageclick%7Ckeycount%7Ccoupon_simple_36593916_1%7C0&platform=0&applicationId=1587745');

                fetch(request, init)
                    .then(function (response) {
                        return response.text();
                    })
                    .then(function (myJson) {
                        console.log(myJson);
                    });

                let res = await fetch(request, init);
                console.log(res.code)
                // let json = JSON.stringify(res)
                console.log(json)
            }
        }
    }

    run_Script(type) {
        return function () {
            JDcouponSendFront(type)
        }
    }
}()
