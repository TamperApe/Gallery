/*global

$
 */
new class jd {
    constructor() {
        this.name = 'jd抢券';
        this.description = 'jd抢券';
        this.version = '1.0';
        this.run_at = ["document_start", "document_body", "document_domloaded"];
        this.includes = ['.*sale.jd.com/act.*'];
    }
    get_Script() {
        return function () {
            async function JDcouponSendFront(type) {
                alert(type)
            }
        }
    }

    run_Script(type) {
        return function () {
            jdCouponSendFront(type)
        }
    }
}()
