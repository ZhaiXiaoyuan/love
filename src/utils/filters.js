/**
 * Created by Administrator on 2016/9/28 0028.
 */

/**
 * vue所需要的filter都放在这里
 * 在js里面可以这样直接调用：Vue.filter('getLocalISOString')(new Date())
 * */
import Vue from 'vue'

/*将时间转换成本地时间*/
Vue.filter('getLocalISOString', function (value) {
    const now = new Date(value);

    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    return now.getFullYear() + '-'
        + pad(now.getMonth() + 1) + '-'
        + pad(now.getDate()) + 'T'
        + pad(now.getHours()) + ':'
        + pad(now.getMinutes()) + ':'
        + pad(now.getSeconds());
});

/*将时间转换成中文*/
Vue.filter('timeToChinese', function (text) {
    if (text != undefined) {
        /*将字符串转换为date 类型*/
        var textTime = text.replace(/:/g, '-');
        textTime = textTime.replace(/ /g, '-');
        var arr = textTime.split("-");
        var cvTime = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
        /*时间差*/
        var diffDate = new Date().getTime() - cvTime.getTime();
        /*计算年数*/
        var years = Math.floor(diffDate / (24 * 3600 * 1000 * 365));
        /*如果是在今年*/
        if (cvTime.getUTCFullYear() == new Date().getUTCFullYear()) {
            /*计算天数*/
            var days = Math.floor(diffDate / (24 * 3600 * 1000));
            if (days < 1) {
                //计算相差小时数
                var leave1 = diffDate % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1 / (3600 * 1000));
                if (hours < 1) {
                    /*计算相差分钟数*/
                    var leave2 = leave1 % (3600 * 1000);    //计算天数后剩余的毫秒数
                    var minutes = Math.floor(leave2 / (60 * 1000)) + 1;
                    if (minutes < 0) {
                        minutes = 0;
                    }
                    return minutes + '分钟前';
                } else {
                    return hours + '小时前';
                }
            } else {
                var cvHours = cvTime.getUTCHours();
                var cvMin = cvTime.getUTCMinutes();
                if (cvHours < 10) {
                    cvHours = '0' + cvHours;
                }
                if (cvMin < 10) {
                    cvMin = '0' + cvMin;
                }
                return cvTime.getUTCMonth() + 1 + '月' + cvTime.getUTCDate() + '日' + ' ' + cvHours + ':' + cvMin;
            }
        } else {
            return text;
        }
    }
});

/*格式化点赞数*/
Vue.filter('fomartPraise',function(text){
    var num = text;
    var fNum;
    var fStr;
    if(10000 <= num){
        fNum = num/10000;
        fStr = fNum.toFixed(1) + '万';
    }else if(num >= 0){
        fStr = num;
    }else {
        fStr = 0;
    }

    return fStr;
});

/*省略字符*/
Vue.filter('ellipsis', function(input, length){
    if(!input){
        return;
    }
    if(input.length > length){
        return input.substring(0, length) + '....';
    }else{
        return input;
    }
});

/*文本格式*/
Vue.filter('textFormat',function(text,curNum){
    if(!text){
        return;
    }
    if(curNum&&curNum>0){
        text=text.substring(0,curNum)+"...";
    }
    if(text&&text!=''){
        text=text.replace(/\n/ig,"<br/>");
    }
    return text;
});

/*格式化时间*/
Vue.filter('formatDate',function(date,fmt){
  if(typeof date !=Date){
    date=new Date(date);
  }
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
});
