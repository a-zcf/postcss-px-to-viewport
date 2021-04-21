export default {
    // 获取当日的开始时间和结束时间
    getDaySartEnd(){
       let sarend = {
            sart:'',
            end:'',
            currentTime:'',
            monthly:[]
        }
        function formatTen(num) { 
            return num > 9 ? (num + "") : ("0" + num); 
        }
        let getCurrentTime = new Date()
        let getSart = new Date(new Date(new Date().toLocaleDateString()).getTime())
        let getEnd = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
        // 开始时间
        sarend.sart = getSart.getFullYear()+'-'+
        formatTen(getSart.getMonth()+1)+'-'+
        formatTen(getSart.getDate())+' '+
        formatTen(getSart.getHours())+':'+
        formatTen(getSart.getMinutes())+':'+
        formatTen(getSart.getSeconds())
        //结束时间
        sarend.end = getEnd.getFullYear()+'-'+
        formatTen(getEnd.getMonth()+1)+'-'+
        formatTen(getEnd.getDate())+' '+
        formatTen(getEnd.getHours())+':'+
        formatTen(getEnd.getMinutes())+':'+
        formatTen(getEnd.getSeconds())
        // 当前时间
        sarend.currentTime = getCurrentTime.getFullYear()+'-'+
        formatTen(getCurrentTime.getMonth()+1)+'-'+ 
        formatTen(getSart.getDate())+' '+
        formatTen(getCurrentTime.getHours())+':'+
        formatTen(getCurrentTime.getMinutes())
        return sarend
    },
    //获取当前月后面12个月所有月份
    getMonthTime(){
     let monthlyArr = {
        monthly: [],
        month:''
    }
    var data = new Date();
    var mon = data.getMonth() + 1
    mon = mon < 10 ? "0" + mon : mon;
    monthlyArr.month = data.getFullYear() + "-" + mon

    data.setMonth(data.getMonth()+1, 1)//获取到当前月份,设置月份
    for (var i = 0; i < 12; i++) {
        data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
        var m = data.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        monthlyArr.monthly.push(data.getFullYear() + "-" + (m))
    }
     return monthlyArr
    }
}