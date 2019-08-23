/*
 * By Lmz
 * 20180626
 * 下载
 */
$(document).on("pageinit", "#downloadPage", function () {
    $("#idDownApp").click(function () {
        window.open("https://codeload.github.com/douban/douban-client/legacy.zip/master");
//        var url = "https://codeload.github.com/douban/douban-client/legacy.zip/master";
//        var form = $("<form></form>").attr("action", url).attr("method", "post");
////        form.append($("<input></input>").attr("type", "hidden").attr("name", "filepath").attr("value", filepath));
//        form.appendTo('body').submit().remove();
    });
});
//Go to url
function hrefUrl(sUrl) {
    window.location = sUrl;
}
