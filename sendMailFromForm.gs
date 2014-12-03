function sendMailFromForm() {
    Logger.log('sendMailFromForm() debug start');

    //------------------------------------------------------------
    // 設定エリアここから
    //------------------------------------------------------------

    // 件名、本文、フッター
    var subject = "[注文受付 自動返信メール]"; 
    var contents
        = "この度はご注文いただき有難うございます。\n\n"
        + "本メールと引き換えに商品をお渡しいたします。\n "
    var footer
        = "\n\n＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝\n\n"
        + "■ご注文の取り消しが発生した場合は、直接担当者まで連絡をお願いします\n"
        + "\n"
  　　　  + "注文受付担当　山田花子\n";

    // 入力カラム名の指定(フォームのタイトル名とあわせてください)
    var COLNUM_NAME     = 2;
    var COLNUM_ADDRESS  = 3;
    var COLNUM_SIZE     = 4;
    var COLNUM_COLOR    = 5;
    var COLNUM_EMAIL    = 6;

    // メール送信先
    var admin = "your email address"; // 管理者（必須）
    var cc    = ""; // Cc:
    var bcc   = admin; // Bcc:(管理者にもメールが届くようにしています)
    var reply = admin; // Reply-To:
    var to    = "";    // To: （入力者のアドレスが自動で入ります）

    //------------------------------------------------------------
    // 設定エリアここまで
    //------------------------------------------------------------
    try{
      //初期化
      var contents ="";
      var header ="";
      //var target_row ="";
          
       // 送信先オプション
        var options = {};
        if ( cc )    options.cc      = cc;
        if ( bcc )   options.bcc     = bcc;
        if ( reply ) options.replyTo = reply;
      
        // スプレッドシートの操作
        var sh   = SpreadsheetApp.getActiveSheet();
        var rows = sh.getLastRow();
        var cols = sh.getLastColumn();
        var rg   = sh.getDataRange();
     
        // メール件名・本文作成と送信先メールアドレス取得
      　contents += "【受付番号】"+ rows + "\n\n";
        contents += "【おなまえ】"+rg.getCell(rows, COLNUM_NAME).getValue() + "\n";
        contents += "【住所】"    +rg.getCell(rows, COLNUM_ADDRESS).getValue()+ "\n";
        contents += "【サイズ】"  +rg.getCell(rows, COLNUM_SIZE).getValue()+ "\n";
        contents += "【色】"      +rg.getCell(rows, COLNUM_COLOR).getValue()+ "\n";
        //送信先メールアドレス
        to = rg.getCell(rows, COLNUM_EMAIL).getValue();
                             
        // メール送信
        if ( to ) {
           contents += footer;
           MailApp.sendEmail(to, subject, contents, options);
        }else{
           MailApp.sendEmail(admin, "【失敗】Googleフォームにメールアドレスが指定されていません", body);
        }
    //エラー発生時
    }catch(e){
        MailApp.sendEmail(admin, "【失敗】Googleフォームからメール送信中にエラーが発生", e.message);
    } 
}
