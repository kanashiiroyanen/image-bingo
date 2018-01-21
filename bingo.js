var id; // 繰り返し処理の id
var img = new Array(); // 画像を格納する配列
var generated = new Array(); // 表示した画像の係数(ランダム値)を格納する配列
var generated_count = 0; // 表示した画像の係数の個数をカウント
var rand = 0;
var img_num = 75;

// 配列の初期化
for (var i = 1; i < img_num + 1; i++) {
    img[i] = new Image();
    img[i].src = "./picture/" + i + ".jpg";
}

// 画像をランダム表示にさせる関数
function display() {
    rand = Math.floor(Math.random() * img_num+1-1)+1;
    // ランダム値が重複していないか判定
    for (var i = 0; i < generated_count; i++) {
        if (rand == generated[i]) {
            rand = Math.floor(Math.random() * 75+1-1)+1;
            i = -1;
        }
    }
    document.getElementById("pic").src = img[rand].src;
}

// start ボタン押した際に呼ばれる関数
function start() {

    document.getElementById("stop_btn").disabled = "";
    document.getElementById("start_btn").disabled = "disabled";

    if (generated_count == img_num) {
        document.write("No Image\n");
        exit;
    }

    id = setInterval("display()", 20);
}

// stop ボタン押した際に呼ばれる関数
function stop() {

    if (generated_count == img_num) { // 75枚表示したら終了
        document.write("No Image\n");
        exit;
    }

    document.getElementById("start_btn").disabled = "";

    clearInterval(id);
    generated[generated_count] = rand;
    generated_count++;

    var countText = document.getElementById("count");
    countText.innerHTML = generated_count;

    document.getElementById("stop_btn").disabled = "disabled";
}

// すべて or 表示した画像の一覧をoutput
function display_list(p, generated, generated_count) {

    var light_g = document.getElementById("lightgallery");

    if (p == "disp_list") { /* 表示した画像の一覧 */
        for (var i = 0; i < generated_count; i++) {
            var elemA = document.createElement('a'); // aタグの追加
            elemA.href = "./picture/" + generated[i] + ".jpg";

            var elemImg = document.createElement("img"); // imgタグの追加
            elemImg.setAttribute("src", "./picture/" + generated[i] + ".jpg");
            elemA.appendChild(elemImg);

            light_g.appendChild(elemA);
        }
    } else { /* すべての画像の一覧 */
        for (var i = 1; i < img_num + 1; i++) {
            var elemA = document.createElement('a'); // aタグの追加
            elemA.href = "./picture/" + i + ".jpg";

            var elemImg = document.createElement("img"); // imgタグの追加
            elemImg.setAttribute("src", "./picture/" + i + ".jpg");
            elemA.appendChild(elemImg);

            light_g.appendChild(elemA);
        }
    }
}

// 表示した画像の一覧をoutputするメイン関数
function disp_list_main() {
    var p = "disp_list";
    window.open("./pic_bingo_list.html?p=" + p + "&generated=" + generated + "&count=" + generated_count);
}

// すべての画像の一覧をoutputするメイン関数
function list_main() {
    var p = "list";
    window.open("./pic_bingo_list.html?p=" + p + "&generated=\"\"" + "&count=\"\"");
}

function shuffleAry(ary) {
    var i = ary.length;
    while(i) {
        var j = Math.floor(Math.random()*i);
        var t = ary[--i];
        ary[i] = ary[j];
        ary[j] = t;
    }
    return ary;
}

function create_card() {

    var ary = ["君の名は。", "ピコ太郎", "ドラえもん", "ポケモン", "クレしん", "大谷翔平", "欅坂46", "ゲゲゲの鬼太郎", "ぺこ&りゅうちぇる","ドリー", "バイオハザード", "キティちゃん", "ガッキー", "桐谷美玲", "広島カープ", "ちびまる子", "ベッキー&ゲス川谷", "アモーレ", "シン・ゴジラ", "海の声", "おじゃる丸", "広瀬すず", "ミッキー", "うまるちゃん", "真田丸", "車", "いないいないばぁ", "斎藤飛鳥", "ポケモンGO", "キュウビ", "ぐっとずっと", "メイプル超合金", "pepperくん", "SMAP", "プーさん", "暗殺教室", "トレンディエンジェル", "プレステVR", "貞子VS伽椰子", "ジバニャン", "コードギアス", "忍たま", "ぐでたま", "安倍総理", "耐塩用高圧ピンがいし", "トーマス", "コナン", "オロチ", "サザエさん", "プリキュア", "ズートピア", "仮面ライダー", "ポムポムプリン", "アイカツ!", "清原", "成宮寛貴", "初音ミク", "PERFECT HUMAN", "星野源", "逃げ恥", "アンパンマン", "東京オリンピック", "平野ノラ", "リオオリンピック", "ワンピース", "しまねっこ", "サンシャイン斎藤", "鳥害防止具SG型ポリ菅", "すみっコぐらし", "インサイドヘッド", "小峠", "トランプ", "シナモロール", "セブンイレブン", "藤田ニコル"];

    ary = shuffleAry(ary); // 配列の要素をシャッフル
    
    var rows = [];
    var bingo = ['O', 'G', 'N', 'I', 'B'];
    var table = document.createElement("table");
    table.className = 'sample_02';
    var count = 0;
    var m = 0;

    /* テーブル(ビンゴカード)の作成 */
    while (m < 2) { // A4 に2枚印刷できるように出力
        for (var i = 0; i < 6; i++) {

            rows.push(table.insertRow(-1));

            for (var j = 0; j < 5; j++) {
                if (i == 0) { // BINGO を出力
                    var cell = document.createElement("th");
                    cell.innerHTML = bingo[j];
                    table.insertBefore(cell, table.firstChild);
                }  
                else if (count != 12 && count != 37) { // 画像の名前を出力
                    var cell = rows[i].insertCell(-1);
                    cell.appendChild(document.createTextNode(ary[count]));
                    count++;
                } else { // 真ん中の free を出力
                    var cell = rows[i].insertCell(-1);
                    cell.appendChild(document.createTextNode("free!"));
                    count++;
                }
            }
        }

        document.getElementById("table1").appendChild(table);
        m++;

    }
}

/* create_card のメイン関数 */
function create_card_main() {
    window.open("./card.html");
}
