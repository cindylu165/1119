document.getElementById('rawData').innerHTML = data;
// 分割字串
data = data.split('\n');//資料.data就會變成array

data.length = data.length-1;
// 物件，直接寫建構子
// mask = {
//     size : 'adult',
//     color : 'red',
// }
// 建構子
function Mask(code, name, address, phone, adult, child, time) {
    // 機構代碼
    this.code = code;
    // 機構名稱
    this.name = name;
    // 機構地址
    this.address = address;
    // 機構電話
    this.phone = phone;
    // 成人口罩剩餘數
    this.adult = adult;
    // 兒童口罩剩餘數
    this.child = child;
    // 來源資料時間
    this.time = time;
}
let cityTable = Array();
let SumMask = 0;
for(let i=0; i<data.length; i++) {
    // 把每一筆資料切開,再丟去建成物件()
    let tmp = data[i].split(',');
    let city = tmp[2].substring(0,3);
    if(!cityTable.includes(city)) { // includes==python的in
        cityTable.push(city);
    }
    data[i] = new Mask(tmp[0],tmp[1],tmp[2],tmp[3],tmp[4],tmp[5],tmp[6]);
}
// 排序資料!!!(在切割完資料就排序好)
data.sort(compare);
// 產生縣市選單
let citySelect = document.getElementById('city');
for(let i = 0; i < cityTable.length; i++) {
    citySelect.innerHTML += `<option value = "${i}">${cityTable[i]}</option>`;
}
// 找出該縣市的藥局
function search(index) {
    let showDataDiv = document.getElementById('showData');
    showDataDiv.innerHTML = ""; // 在選擇另一個縣市時，前一個的資料要被清除，所以要把html清除，分法是把html的內容變成空字串
    let resultStr = 
    `<div>
        <div class="colNamT" style="font-weight:bold">藥局名稱</div>
        <div class="colNamT" style="font-weight:bold">地址</div>
        <div class="colTh" style="font-weight:bold">電話</div>
        <div class="colTh" style="font-weight:bold">成人口罩數</div>
        <div class="colTh" style="font-weight:bold">兒童口罩數</div>
    </div>`
    var MaskSum = 0;
    var pharmacySum = 0;
    for(let i = 0; i < data.length; i++) {
        if(data[i]['address'].startsWith(cityTable[index])) {//startsWith:確定字符串是否以指定字符串的字符開頭，是=true;否=false。
            // 若比對到，印出地址，每一個資料列完，換行
            // showDataDiv.innerHTML += data[i]['address'] + '<br>';
            // resultStr += '<div class="col">' + data[i]['code'] + '</div>';
            resultStr += '<div><div class="colNam">' + data[i]['name'] + '</div>';
            resultStr += '<div class="colNam">' + data[i]['address'] + '</div>';
            resultStr += '<div class="col">' + data[i]['phone'] + '</div>';
            resultStr += '<div class="col">' + data[i]['adult'] + '</div>';
            resultStr += '<div class="col">' + data[i]['child'] + '</div></div>';
            MaskSum += parseInt(data[i]['adult'],10) + parseInt(data[i]['child'],10);// 把成人跟兒童口罩相加一起
            pharmacySum += 1;
        }
    }
    let MaskStr = `<div style="display: inline-block;">剩餘口罩總數:`+ MaskSum +`</div>`;
    let PharStr = `<div style="display: inline-block;">,藥局總數:`+ pharmacySum +`</div>`;
    showDataDiv.innerHTML = MaskStr + PharStr + resultStr;
}
function show() {
    // 取得 value 後,要從 value 轉換成縣市
    let value = document.getElementById('city').value;
    // 再用縣市去做搜尋
    if(value != ''){
        search(value);
    }
    console.log(value);
}
function compare(a,b){//js 排序比較函數:回傳正值，b放在a前面
    if(parseInt(a.adult,10)+parseInt(a.child,10) > parseInt(b.adult,10)+parseInt(b.child,10)){
        return -1;
    }else{
        return 1;
    }
}
// 要的cityTable長這樣 = [
//     '基隆市',
//     '臺北市',
//     '新北市',
//     '桃園市',
//     '新竹縣',
//     '新竹市',
//     '苗栗縣',
//     '臺中市',
//     '彰化縣',
//     '南投縣',
//     '雲林縣',
//     '嘉義縣',
//     '嘉義市',
//     '台南市',
//     '高雄市',
//     '屏東縣',
//     '臺東縣',
//     '花蓮縣',
//     '宜蘭縣',
//     '澎湖縣',
//     '金門縣',
//     '連江縣'
// ]