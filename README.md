# WebRTC_Focus
一. **摘要**

本研究開發一套可應用於同步和非同步教學的學習專注力估測系統，可分成三個主要部分。首先，開發專注力測試產生器，可產生簡易確認訊息、簡易學習力驗證訊息、學習進度速測訊息。其次，使用WebRTC技術來建立穿透防火牆互傳訊息的機制，自動地將專注力測試訊息傳遞至用戶端，並接收用戶端的回應訊息。最後，建立專注及學習力分析模組，針對學生訊息回覆狀況及行為偵測，進行分析統計，並將完成的報表回傳給教師。本研究模擬各種學生的學習狀況，完成本專題成果的評估實驗，後續可針對相關模組進行修正調整與精進改善。

關鍵詞：同步教學、非同步教學、學習專注力估測、WebRTC技術

二. **研究目的**

由於COVID-19的肆虐，導致許多師生無法到校進行實體上課，為了不影響到課業進度，只能透過遠距教學來解決困境。目前大多數學校使用的平台是Google meet或是Microsoft teams，使用起來方便、容易，是多數教師選擇他們的原因，此兩者平台的比較如表1所示，但這些軟體主要是運用在會議上，並非專門用在教學，只能達到即時通訊的效果，為確認學生是否有認真上課，通常都會要求學生開啟鏡頭或麥克風，但有些學生可能受環境限制或設備問題，無法滿足要求，而且兩個平台都沒有完整的一套教學系統，關於收發作業、課程考試等功能尚未成熟。

除了Google meet和Microsoft teams會議用途的平台，還有一般常見的學習平台(Moodle)，是一個開源課程管理系統(CMS)的模組化設置，可以實現特殊的教學需求，收發作業、課程考試等功能，也有對應的模組可供安裝，相比Google meet和Microsoft teams，擁有更加完善的功能，也是許多學校首選的教學平台，但此平台(Moodle)目前還尚未開發出能檢測學生專注力的部分，本計畫希望透過架設WebRTC (Web Real-Time Communication)的方式實現同步及非同步的遠距數位教學，其中非同步教學可讓學生在方便的時間、舒適的環境、精神狀態較佳的時候學習，達到最有效率的知識吸收，過去的相關研究並無針對非同步教學的監控方式作探討，因為無法得知學生是否有在認真上課，所以許多學校不承認這種教學方式，因此，如何評估線上觀看教學影片學生的專注及學習狀況，一直是教學單位與學習者，長期討論的主題。

表1、 Google Meet與Microsoft teams比較

|遠距平台|Google Meet|Microsoft Teams|
| - | - | - |
|特色|<p>視訊會議</p><p>錄製功能(付費)</p><p>螢幕分享</p><p>聊天室</p>|<p>視訊會議</p><p>錄製功能(付費)</p><p>螢幕分享</p><p>聊天室</p><p>舉手功能</p>|
|人數|100|250|
|針對人群|中、小學生|大學生|
|時間|無限|無限|
|工具|電腦網頁|電腦網頁、應用程式|
|軟體屬性|線上會議|線上會議|
|互動性|互動性高|互動性高|
|錄影存取位置|Google雲端|Microsoft teams檔案|
|缺點|<p>學生可停止教師的錄影</p><p>會議功能並非教學功能</p><p>視訊畫質不穩定</p><p>畫面延遲現象容易發生</p>|<p>學生可停止教師的錄影</p><p>會議功能並非教學功能</p><p>必須先建群才可發起會議</p>|

本研究開發一套可應用於同步及非同步教學的學習專注力評估系統，其系統架構如圖1、圖2所示，除了教師與修課的學生之外，還創建了虛擬助教。虛擬助教負責傳送資訊給每位學生，接收學生的回覆情形，等上課結束或者影片觀看期限結束，再根據學生回覆資訊的情形，統整並分析學生的學習專注狀況。

匯出分析過後的圖表或文字檔，可供教師下載，對於同步學習及非同步模式下觀看教學影片的學生，將在上課的同時，不定時地收到訊息，學生必須在限時內回應，讓虛擬助教可以掌握各學生有無在電腦前，以及是否針對教學內容有初步了解，若未能在時限內回覆，或者回覆的答案有誤，都會影響虛擬助教後續進行學習專注情況的分析與評斷結果。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.001.jpeg)

圖1、學習專注力估測架構 (同步模式)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.002.jpeg)

圖2、學習專注力估測架構（非同步模式）


三. **文獻回顧與探討**

網頁即時通訊(WebRTC)[1]是一個支援網頁瀏覽器進行即時語音對話或影片對話的應用程式介面(API)，實作於Chrome、Firefox、Edge等瀏覽器平台，兩個網頁服務器(web server)可以使用標準信號協議(standard signaling protocol)進行通信，或者使用專有信號協議(proprietary signaling protocol)，通過超文本傳輸協定(HTTP)或網路傳輸協定(WebSocket)傳輸，無需在額外安裝外掛程式，即可達到即時通訊，如圖3所示。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.003.png)

圖3、網頁即時通訊 [4]

發送信號後(signaling)，使用互動式連接建立(Interactive Connectivity Establishment)去克服網路位址轉換(NAT)和防火牆(firewall)問題，互動式連接建立(ICE) [2]是一種允許雙方建立連接的機制，客戶(customer)通過網絡設備或路由器(router)獲取公有IP位址，連接到互聯網(Internet)，如圖4所示，互動式連接建立(ICE)使用STUN/TURN [3]協議使對等點(peers)建立連接。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.004.jpeg)

圖4、網路位址轉換

當網路位址轉換時路由器可能將一個公有IP位址映射(map)到多的私有IP位址，每一個設備(智慧型手機、個人電腦)只知道其私有IP位址，不會獲取到路由器的公有IP位址，這可能導致WebRTC產生問題，因為互動式連接建立時(由瀏覽器產生)包含設備的是私有IP位址而非公有IP位址， 透過STUN服務器解決此問題，當設備向STUN服務器發出請求時，STUN服務器會返回一條消息(message)包含該設備所連接的路由器公有IP位址，如圖5所示。

多數設備都位於一層或多層防火牆之後，由於 WebRTC 使用許多非標準端口，因此某些防火牆不允許兩個瀏覽器之間建立連接(direct connection)，需要藉由TURN服務器解決此問題，TURN服務器充當中繼(relay)服務器，如果連接(peer-to-peer)失敗，則直接在兩個對等方之間進行中繼流量(traffic)，如圖5所示。

![STUN + TRUN servers | 老洪的 IT 學習系統](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.005.png)

圖5、STUN/TURN [5]

由於COVID-19席捲全球，多數學生無法到校上課，師生必須透過遠距教學機制，作為實體教學的替代方式。遠距教學可分為同步與非同步教學兩種方式，同步教學即是師生透過通訊網路、視訊頻道等傳輸媒體，以即時互動方式進行之教學；而非同步教學即是教師製作數位教材，並提供至教學平台，由學生上網自行學習。然而遠距教學相較於實體教學，授課教師如何判斷學生的學習專注力，以調整上課機制與教材內容，也帶給學校和師生一個全新的挑戰。有許多透過分析學生的臉部特徵(如臉部方位、眼睛開闔、注視方向等)來測試線上學習專注力的相關研究[6-11]。但此類方法必須要求學生將網路攝影機(WebCam)開啟並正對自己，通常使用在同步教學模式上，但往往會因學生無網路攝影機設備或者因隱私考量而不願開啟，造成推動上的困難度。至於非同步教學機制上，無法強制要求學生開啟攝影機，如何測試線上學習者的專注力，目前的研究相對較少，也是本計畫的主要研究主題。

四. **研究方法**
1) **建置WebRTC與穿透防火牆**

在Ubuntu上設置環境並安裝相關套件，下載所需壓縮包進行解壓縮，執行步驟指令等，檢查程式碼，修改配置文件包含網卡名稱、端口等，如圖6所示。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.006.png)

圖6、 配置文件

查看防火牆的狀態，啟用防火牆，允許監聽通訊埠(listening-port)的端口，如圖7所示，執行步驟指令等，如圖8所示，到瀏覽器(Trickle ICE)測試，如圖9所示，允許自定義端口(3000)，修改程式碼，如圖10所示。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.007.png)

圖7、 防火牆狀態

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.008.png)

圖8、 步驟指令

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.009.png)

圖9、Trickle ICE

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.010.png)

圖10、 config.js

2) **利用Socket.IO傳輸技術發送學習監督信息**

Socket.IO是建立在 Node.js 架構之上的工具，在做開發之前要先將Node.js下載、安裝好，如圖11所示，並檢查Node.js和NPM的版本，如圖12所示。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.011.png)

圖11、下載node.js [12]

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.012.png)

圖12、檢查Node.js和NPM版本

Socket.IO使用網路傳輸協定(WebSocket)來傳輸，但提供的功能比網路傳輸協定(WebSocket)還要豐富多元，不但可實現低延遲、雙向溝通的能力，且方便開發即時性的網頁應用程式，除了基本訊息傳播之外還可建立虛擬聊天室，本實驗透過指令socket.join(room)加入指定房間，進入房間(room)後可以藉由相關指令呼叫函數並傳送資料如：socket.emit()、socket.in(room).emit()、socket.on()…等，發送出群播事件(event)給相同房間(room)內的其他用戶，並進行後續學習專注力情況的分析。

本研究針對專注力測試的實作方式，依據教師授課時狀況，產生多組互動訊息資訊，透過學生是否點選、是否正確點選和是否及時點選等反應資訊，可用以評估學生學習專注力，並於後續模組完成專注力分析後，回傳給任課教師，以此作為評估學生學習成效的參考依據。

3) **嵌入教學影片(非同步模式)**

此研究在非同步模式下希望在網頁中建立串流(streaming)點播工具，教師將教學檔案資源上傳至影片分享網站(YouTube)，接著將影片嵌入碼輸入教授端指定欄位，按下確認鍵即可將影片呈現在畫面中，學生端在期限結束前至瀏覽器中觀看影音教材，進行線下學習，並於時限內回覆訊息，得以檢測學習專注力狀態。 

4) **提供教師備課設定機制**

同步模式中，網頁提供了教師設置題目的區塊，可預先出好題目，待教師認為合適的時間點，勾選想發送的問題並按下發送鍵，至於非同步模式，因教師事先已知教學影片的內容進度，故需額外設定每題題目欲發送的起始點。

5) **建立輔助線上教學之立即呈現機制(同步模式)**

在同步教學模式下提供教師發送教學資料或google表單功能，會將google表單結果回傳給表單建立者，google表單已具備統計分析模組，因此表單回覆的內容並不會在瀏覽器中進行分析。

6) **彙整顯示與匯出學習專注力統計結果**

在同步模式下當教師結束課程時或非同步模式下教師決定的觀看期限結束後，待虛擬助教分析、統整學生的學習專注情況後，將專注力及學習力的統計圖表繪製並以pdf檔案形式匯出，或是以csv檔案形式匯出文字檔，以此教師可將上課情形完整保存。

五. **結果與討論**

本研究開發一套可應用於同步及非同步遠距教學的學習專注力估測系統，成果可分成四個部分：**建立穿透防火牆互傳訊息機制**、**開發專注力測試訊息之動態顯示方式**、**完成專注及學習分析模組**及進行**模擬實驗與成果驗證**。

1) **建立穿透防火牆互傳訊息機制**

WebRTC可以讓瀏覽器上不同的使用者在不需要安裝瀏覽器外掛(plugin)的前提下進行點對點(peer-to-peer)的語音、視訊通話以及資料傳輸，因透過點對點的使用者資料包協定(UDP)來傳送串流資料，具有接近超低延遲的優勢(real-time)，但是由於每一個點(peer)可能是位於防火牆或者是網路位址轉換(NAT)架構之下，所以需要一套可以穿透網路位址轉換的協定來協調並保證端點間具有一定的網路穿透性，目前WebRTC用的是互動式連接建立(ICE)，算是把STUN跟TURN結合起來，然後根據不同的環境下，選擇相對適合的協定，其中STUN可以簡單想成是一種網路位址轉換的使用者資料包協定打洞機制，TURN則是當成多媒體串流的中繼伺服器機制，主要是當前者失效時的一種備援機制。

本研究使用WebRTC的技術達到穿透防火牆的功能，穿透防火牆後，每過一段時間(不定時)，虛擬助教得以發送數據庫內的測試資訊給上課中的每位學生，學生必須在限定的時間內回答虛擬助教傳送的問題，此達到互傳訊息的功能(Socket.IO)，根據學生回覆資訊的情形，將互傳訊息的內容統整，並分析數據整理出學生的學習專注狀況。

2) **開發專注力測試訊息之動態顯示方式**

本計畫預計將產生的專注力測試訊息，可分成三個層次：**簡易確認訊息**、**簡易學習力驗證訊息**及**學習進度速測訊息**。 

i. 簡易確認訊息（專注驗證）

同步模式下，教師在上課中，可不定時傳送設有時間限制的專注驗證訊息，傳送後學生端瀏覽器會跳出一個簡易確認訊息，如圖13所示，此訊息框會顯示在頁面最上層，方便學生點擊，及時回覆訊息給虛擬助教。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.013.png)

圖13、簡易確認訊息

ii. 簡易學習力驗證訊息

學生在線上同步學習或觀看教學影片時，若心不在焉，突然被問一個簡易的題目，可能根本沒看到(已離開、未注視螢幕或眼睛已閉上)，或者無法短時間內反應並正確回覆。因此，本系統可讓教師傳送簡易的學習力驗證訊息，如圖14所示。此類訊息的特色是主題簡單、選項明確、並可迅速回答。簡易學習力驗證訊息可讓教師在備課時，透過本系統提供的功能，預先設定幾組題目與答案。在同步模式下，本系統可由教師視需要主動選擇特定題目後，傳送給所有聽課學生，學生並須在時間限制內回覆。在非同步模式下，本系統則提供授課教師設定簡易學習力驗證訊息欲發送的起始點，系統會依據學生觀看教學影片的時間，自動發送驗證訊息給學生，並驗證學生回覆的答案。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.014.png)

圖14、簡易學習力驗證訊息

iii. 學習進度速測訊息

遠距教學限制下，教師視訊上課或讓學生觀看教材影片，當然也希望能有實  體上課一樣的效果，教師可在授課時間內，以簡易題目讓學生演練，並了解學生是否吸收課程內容。在同步教學模式中，教師可根據當下授課的進度，不定時發送限時問題給學生，由虛擬助教來統計並分析學生的學習狀況。對於非同步教學模式，由於教學影片是事先錄製好的，修課學生也非同一時間上線，因此必須透過本研究開發出的虛擬助教，當該學生的教學影片播放至特定時間點之後，此時間點為教師出題時所設置，如授課主題告一段落，等待隨機一小段時間，即可自動發出學習進度速測訊息，學生需在限定時間內作答(類似選擇題)，學生無法預測何時會有問題訊息跳出，在此需學生端在觀看教材影片時手動計時。虛擬助教將彙整所有學生的回答狀況，提供授課教師了解學生的學習狀態。此類學習進度速測訊息，如圖15所示，利用授課主題與搭配選項方式出題，主題、選項與答案，都是由授課教師事先設定，非同步模式需另外設置題目發送起始點。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.015.png)

圖15、學習進度速測訊息

為避免學生可能會彼此溝通答案選項，本系統後續虛擬助教改善機制如下，將動態地產生各種排列組合的答案選項，如圖16所示，分別傳送給不同的修課學生，不管是在同步或者非同步教學模式下，針對簡易學習力驗證訊息或是學習進度速測訊息，達到題目相同但選項順序各異的動態產生機制，以做到更精確的學習專注檢測功能。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.016.png)

圖16、動態產生題目

3) **完成專注及學習分析模組**

本研究開發一套專注及學習分析模組，其目的是判斷學生是否在認真上課，以及學生的學習成效等，做一個大致的評估，有利於教師掌握每位學生學習狀況。首先，由虛擬助教統計學生的各種數據，包括時限內回覆專注測試的次數、回覆學習測試訊息的次數，回答正確選項或錯誤選項分開統計，分別以長條圖的型態呈現，如圖17所示、圖18所示，此分析過後的長條圖能在教授端瀏覽器即時呈現，並提供統計圖表或文字檔讓教師下載，得以掌握學生上課情形或日後教學方式調整的參考依據。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.017.png)

圖17、學生專注狀況

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.018.png)

圖18、學生學習狀況

目前本系統的學習專注力分析機制，是根據不同學生於同一堂課所統計出的資料。未來，可在這個基礎上做更多的延伸，例如，虛擬助教除了可以收集學生們針對不同動態訊息的回覆情形，也可統計各學生在不同堂課的訊息回覆情況，以折線圖的型態呈現，提供給該課程的任課教師各學生的學習專注力變化，專注力逐漸提升或逐漸降低，如圖19所示，以作為學生評分依據與教學方式調整的參考。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.019.png)

圖19、學生於特定課程之學習變化

4) **進行模擬實驗與成果驗證**

教授端與學生端實際運作流程圖，如圖20、圖21所示，各步驟的過程及成果說明如下。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.020.png)

圖20、教授端流程圖

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.021.png)

圖21、學生端流程圖

i. 同步教學模式
1. 教師輸入教室號碼(room)及個人身分號碼(id)，如圖22、圖23所示，出簡易學習力驗證訊息與學習進度速測訊息的題目、設定答案，如圖24所示，教師將教室號碼告知修課學生。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.022.png)

圖22、輸入教室號碼(教授端)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.023.png)

圖23、輸入個人身分號碼(教授端)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.024.png)

圖24、學習力測試訊息(教授端)

2. 修課學生輸入教室號碼(room)及個人身分號碼(id)。 
3. 待學生進入教室或上課時間開始，教師及學生至線上教學平台(如Microsoft teams)，開始遠距視訊上課。
4. 課程進行中教師隨時可發送專注力測試訊息，點擊按鈕(Click\_focus)，如圖25所示，學生端的WebRTC瀏覽器會跳至最上層並收到專注力測試訊息，學生需在限時內回覆專注力測試訊息(點擊按鈕Here)，頁面上會有倒數計時 ，如圖26所示。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.025.png)

圖25、發送專注力測試訊息(教授端)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.026.png)

圖26、回覆專注力測試訊息(學生端)

5. 教師可點擊按鈕(State)，WebRTC瀏覽器將繪製即時的學生專注力圖表，橫軸為學生個人身分號碼，縱軸為發送專注力測試次數，如圖27所示。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.027.png)

圖27、學生即時專注力圖表(教授端)

6. 課程進行一個段落後教師隨時可發送學習力測試訊息，先選擇欲發送題號，接著點擊按鈕(sendQus)，如圖28所示，學生端的WebRTC瀏覽器會跳至最上層並收到訊息，學生需在限時內回覆學習力測試訊息(點擊正確選項，按鈕A或B或C) ，頁面上會有倒數計時，如圖29所示。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.028.png)

圖28、發送學習力測試訊息(教授端)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.029.png)

圖29、回覆學習力測試訊息(學生端)

7. 教師可點擊按鈕(learning\_ability)，網頁將繪製即時的學生學習力圖表，橫軸為學生個人身分號碼，縱軸為發送學習力測試訊息次數，內容為學生回答題目狀況統計(回覆正確及錯誤選項次數)，如圖30所示。

![ref1]

圖30、學生即時學習力圖表(教授端)

8. 教師可發送google表單，輸入表單連結至指定欄位，點擊按鈕(send)，如圖31所示。學生端會跳出google表單至網頁最上層，學生填寫表單，如圖32所示，測驗結果將回傳給表單建立者，如圖33所示。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.031.png)

圖31、發送google表單(教授端)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.032.png)

圖32、填寫表單(學生端)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.033.png)

圖33、測驗結果(教授端)

9. 上課結束後教師可點擊按鈕(CSV)，下載該節課學習專注力狀況(CSV檔) ，如圖34所示，內容包含學生個人身分號碼(StudentID)、專注力測試回復情形(Intime)、學習力測試回覆情形(Right, Wrong)，學習力測試訊息次數(#question)、專注力測試次數(#focus)，如圖35所示。

![ref2]

圖34、下載學習專注力狀況(教授端)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.035.png)

圖35、學習專注力狀況(教授端)

10. 上課結束後教師可點擊按鈕(Save as PDF)，下載該節課學習專注力狀況(PDF檔)，如圖36所示，內容包含學生即時專注力及學習力圖表，如圖37所示。

![ref3]

圖36、下載學習專注力狀況(教授端)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.037.png)

圖37、學習專注力狀況(教授端)

ii. 非同步教學模式
   1. 教師輸入教室號碼(room)及個人身分號碼(id)。
   2. 教師將教材影片嵌入碼輸入教授端指定欄位，按下確認鍵(點擊按鈕Video)，如圖38所示。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.038.png)

圖38、教材影片嵌入碼(教授端)

3. 教師出簡易學習力驗證訊息與學習進度速測訊息的題目、答案，設置題目發送起始點(第一個欄位為小時、第二個欄位為分鐘)，按下確認鍵(Check)，如圖39所示，教師將教室號碼和觀看期限告知修課學生。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.039.png)

圖39、學習力測試訊息(教授端)

4. 修課學生於觀看期限前輸入教室號碼(room)及個人身分號碼(id)，進入教室上課，進行線下學習。 
5. 學生至WebRTC瀏覽器中進行影音教材播放，觀看教材的同時需手動計時觀看影片長度，點擊按鈕(Timer)開始計時，點擊按鈕(Stop)暫停計時，如圖40所示，得以完成後續檢測學習力狀態。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.040.png)

圖40、影音教材播放(學生端)

6. 學生端計時器達到教師所設置題目發送起始點時，虛擬助教隨機等待一小段時間後自動發出問題至學生端，學生無法預測何時會有訊息跳出，學生需在限定時間內回覆學習力測試訊息(點擊正確選項，按鈕A或B或C) ，頁面上會有倒數計時，如圖41所示。

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.041.png)

圖41、回覆學習力測試訊息(學生端)

7. 觀看期限結束後教師可點擊按鈕(learning\_ability)，網頁將繪製學生學習力圖表，橫軸為學生個人身分號碼，縱軸為發送學習力測試訊息次數，內容為學生回答題目狀況統計(回覆正確及錯誤選項次數)，如圖42所示。

![ref4]

圖42、學生學習力圖表(教授端)

8. 觀看期限結束後教師可點擊按鈕(CSV)，下載該節課學習力狀況(CSV檔)，如圖43所示，內容包含學生個人身分號碼(StudentID)、學習力測試訊息回覆情形(Right, Wrong)，學習力測試訊息次數(#question)，如圖44所示。

   ![ref5]

圖43、下載學習力狀況(教授端)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.044.png)

圖44、學習力狀況(教授端)

9. 觀看期限結束後教師可點擊按鈕(Save as PDF)，下載該節課學習力狀況(PDF檔)，如圖45所示，內容包含學生的學習力圖表，如圖46所示。

![ref6]

圖45、下載學習力狀況(教授端)

![](https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.046.png)

圖46、學習力狀況(教授端)

1. **參考文獻**
1. S. Loreto and S. P. Romano, “Introduction: WebRTC Architecture”, *Real-Time Communication with WebRTC: Peer-to-Peer in the Browser*, O’Reilly Media, Inc., Sebastopol, CA, pp. 2-3, 2014.
1. A. Sergiienko, “WebRTC Blueprints”, *Packt Publishing Ltd*, Birmingham, UK, 2014
1. I. Grigorik, “Building Blocks of UDP: UDP and Network Address Translators”, *High Performance Browser Networking*, O’Reilly Media, Inc., Sebastopol, CA, 2013
1. https://reurl.cc/NRQ1G5
1. https://reurl.cc/pM3n6r
1. 劉育名, "植基於臉部特徵與眨眼檢測之線上學習專注力評估系統," 碩士, 多媒體設計系碩士班, 國立臺中科技大學, 台中市, 2021.
1. T. Mita, T. Kaneko and O. Hori, “*Joint haar-like features for face detection*”, Tenth IEEE International Conference on Computer Vision, pp. 1619-1626, 2005.
1. M. A. Hearst, S. T. Dumais, E. Osuna, J. Platt and B. Scholkopf, “*Support vector machines*”, IEEE Intelligent Systems and their Applications, vol: pp. 13, 1998.
1. C. Richards and D. Ridley, “*Factors affecting college students’ persistence in on-line computer-managed instruction*”, Coll. Stud. J., vol. 31, no. 4, pp. 490-495, 1997.
1. S. Shaw and S. Polovina, “*Practical Experiences of, and Lessons Learnt from, Internet Technologies in Higher Education*”, J. Educ. Technol. Soc., vol. 2, no. 3, pp. 16–24, 1999.
1. Zaletelj and A. Košir, “*Predicting students’ attention in the classroom from Kinect facial and body features*”, EURASIP Journal on Image and Video Processing, pp. 1-12, 2017.
1. https://nodejs.org/zh-tw/download/


[ref1]: https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.030.png
[ref2]: https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.034.png
[ref3]: https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.036.png
[ref4]: https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.042.png
[ref5]: https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.043.png
[ref6]: https://github.com/jaifenny/WebRTC_Focus/blob/main/picture/Aspose.Words.db2d27a1-bdf6-4587-9576-fa9984c5dce8.045.png

