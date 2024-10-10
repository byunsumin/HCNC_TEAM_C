(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("Form_Login");
            this.set_titletext("New Form");
            this.set_color("#000000");
            this.set_background("#000033");
            this.set_scrollbartype("none");
            if (Form == this.constructor)
            {
                this._setFormPosition(1280,720);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_login", this);
            obj._setContents("<ColumnInfo><Column id=\"user_id\" type=\"STRING\" size=\"256\"/><Column id=\"password\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_email", this);
            obj._setContents("<ColumnInfo><Column id=\"email\" type=\"STRING\" size=\"256\"/><Column id=\"maskedEmail\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_Auth", this);
            obj._setContents("<ColumnInfo><Column id=\"authKey\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("ds_AuthCheck", this);
            obj._setContents("<ColumnInfo><Column id=\"authCheck\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Div("div_AuthForm","680","160","380","370",null,null,null,null,null,null,this);
            obj.set_taborder("12");
            obj.set_background("#ffffff");
            this.addChild(obj.name, obj);

            obj = new Div("div_LoginForm","262","160","380","370",null,null,null,null,null,null,this);
            obj.set_taborder("11");
            obj.set_background("#ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("sta_FindLoginInfo","218","275","135","25",null,null,null,null,null,null,this.div_LoginForm.form);
            obj.set_taborder("0");
            obj.set_text("아이디 및 비밀번호 찾기");
            this.div_LoginForm.addChild(obj.name, obj);

            obj = new Button("btn_Login","465","360","150","60",null,null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_text("인증번호 발송");
            obj.set_cssclass("btn_normal");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_AuthCheck","840","290","200","60",null,null,null,null,null,null,this);
            obj.set_taborder("1");
            this.addChild(obj.name, obj);

            obj = new Button("btn_AuthCheck","890","360","150","60",null,null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("인증하기");
            obj.set_cssclass("btn_normal");
            this.addChild(obj.name, obj);

            obj = new Static("sta_AuthCheck","720","290","115","60",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("인증번호 입력 :");
            obj.set_font("bold 15px/normal \"Arial\",\"Malgun Gothic\",\"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta_Id","310","210","90","60",null,null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("아이디 입력 :");
            obj.set_font("bold 15px/normal \"Arial\",\"Malgun Gothic\",\"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Static("sta_Password","295","290","115","60",null,null,null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_text("비밀번호 입력 :");
            obj.set_font("bold 15px/normal \"Arial\",\"Malgun Gothic\",\"Gulim\"");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_Id","415","210","200","60",null,null,null,null,null,null,this);
            obj.set_taborder("6");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_Password","415","290","200","60",null,null,null,null,null,null,this);
            obj.set_taborder("7");
            obj.set_password("true");
            this.addChild(obj.name, obj);

            obj = new Button("btn_Pass","9","10","143","124",null,null,null,null,null,null,this);
            obj.set_taborder("8");
            obj.set_text("넘어가기");
            this.addChild(obj.name, obj);

            obj = new Edit("edt_MaskedEmail","840","210","200","60",null,null,null,null,null,null,this);
            obj.set_taborder("9");
            obj.set_readonly("true");
            obj.set_background("#ffffff");
            this.addChild(obj.name, obj);

            obj = new Static("sta_MaskEmail","710","210","120","60",null,null,null,null,null,null,this);
            obj.set_taborder("10");
            obj.set_text("발송받은 이메일 :");
            obj.set_font("bold 15px/normal \"Arial\",\"Malgun Gothic\",\"Gulim\"");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1280,720,this,function(p){});
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","edt_AuthCheck","value","ds_AuthCheck","authCheck");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","edt_Id","value","ds_login","user_id");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","edt_Password","value","ds_login","password");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item3","edt_MaskedEmail","value","ds_email","maskedEmail");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {

        };
        
        // User Script
        this.registerScript("Form_Login.xfdl", function() {
        // 인증번호 발송(로그인) 버튼
        this.btn_Login_onclick = function(obj,e) {

            var userId = this.ds_login.getColumn(0, "user_id");
            var password = this.ds_login.getColumn(0, "password");

            // 아이디 유효성 검사
            if(userId == null || userId == '' || typeof userId === 'undefined') {
                alert("아이디를 입력하세요.");
                return;
            }

            // 비밀번호 유효성 검사
            if(password == null || password == '' || typeof password === 'undefined') {
                alert("비밀번호를 입력하세요.");
                return;
            }

            // 로그인 함수 호출
            this.fnLogin();
        };


        // 인증번호 발송 함수
        this.fn_Auth = function() {

            var email = nexacro.getApplication().ds_userInfo.getColumn(0, "email");
            this.ds_email.setColumn(0, "email", email);  // 데이터셋에 이메일 설정

            var strSvcId    = "NexaAuth";
            var strSvcUrl   = "svc::NexaAuth.do";
            var inData      = "ds_email=ds_email";  // 입력 데이터셋
            var outData     = "ds_Auth=ds_Auth";  // 출력 데이터셋 (서버에서 응답받을 데이터)
            var strArg      = "";  // 추가적인 파라미터 (필요시 사용)
            var callBackFnc = "fnCallback";  // 콜백 함수 이름
            var isAsync     = true;  // 비동기 설정

        	console.log(this.ds_email.getColumn(0, "email"));

            // 서버와의 트랜잭션 호출
            this.transaction(strSvcId, strSvcUrl, inData, outData, strArg, callBackFnc, isAsync);
        };

        // 서버 응답 처리 콜백 함수
        this.fnCallback = function(strSvcId, nErrorCode, strErrorMsg) {
            // 통신 성공 시 처리
            if (nErrorCode == 0) {
                console.log("Success: " + strSvcId);

        		alert("인증 번호가 발송되었습니다.");

        		this.ds_email.setColumn(0, "maskedEmail", this.maskEmail(this.ds_email.getColumn(0, "email")));

                // 서버에서 넘어온 인증 키(authKey)를 확인
                var authKey = this.ds_Auth.getColumn(0, "authKey");
                console.log("Received AuthKey: " + authKey);

            } else {
                // 통신 실패 시 에러 처리
                console.log("Error: " + strErrorMsg);
                alert("Error occurred: " + strErrorMsg);
            }
        };

        // 로그인 성공 시 메인 화면으로 전환
        this.fn_LoginSuccess = function() {

        	//로그인 성공 시에 workFrame 첫 화면
        	nexacro.getApplication().mainframe.VFrameSet00.HFrameSet00.WorkFrame.set_formurl("FrameBase::Form_Post.xfdl");

        	//Top, HFrameSet00, Login 3개 영역을 조정하여 로그인 화면이 보이지 않도록 설정
            nexacro.getApplication().mainframe.VFrameSet00.set_separatesize("65,*,0");

        	//로그인 폼의 edt 모두 초기화
        	this.ds_login.setColumn(0, "user_id", '');
        	this.ds_login.setColumn(0, "password", '');
        	this.ds_Auth.setColumn(0, "authKey", '');
        	this.ds_AuthCheck.setColumn(0, "authCheck", '');
        	this.ds_email.setColumn(0, "email", '');
        	this.ds_email.setColumn(0, "maskedEmail", '');
        }

        //인증하기
        this.btn_AuthCheck_onclick = function(obj,e)
        {
        	if(this.ds_Auth.getColumn(0, "authKey") == '' || this.ds_Auth.getColumn(0, "authKey") == null || this.ds_Auth.getColumn(0, "authKey") == 'undefined') {
        		alert("인증번호를 먼저 발급받으세요.");
        		return;
        	}

        	if(this.ds_Auth.getColumn(0, "authKey") != this.ds_AuthCheck.getColumn(0, "authCheck")) {
        		alert("인증번호가 일치하지 않습니다.");
        		return;
        	}

        	if(this.ds_Auth.getColumn(0, "authKey") == this.ds_AuthCheck.getColumn(0, "authCheck")) {
        		alert("인증번호가 확인되었습니다.");
        		this.fn_LoginSuccess();
        	}
        };

        // 로그인 함수
        this.fnLogin = function() {

            //console.log(this.ds_login.saveXML());  // DataSet 내용 확인

            var strSvcId = "Nexalogin";
            var strSvcUrl = "svc::Nexalogin.do";
            var inData = "ds_login=ds_login";
            var outData = "ds_userInfo=ds_userInfo";  // 서버로부터 받아온 데이터를 받을 데이터셋
            var strArg = "";
            var callBackFnc = "fnLoginCallback";  // 콜백 함수
            var isAsync = true;

            this.transaction(strSvcId, strSvcUrl, inData, outData, strArg, callBackFnc, isAsync);

        	console.log(this.ds_login.saveXML());
        };

        // 로그인 함수 콜백
        this.fnLoginCallback = function(strSvcId, nErrorCode, strErrorMsg) {
           objApp=nexacro.getApplication();

            if (nErrorCode < 0) {
                alert("로그인 실패");
            }
            else {

        	  // 인증번호 발송
        	  this.fn_Auth();

            }
        };

        this.maskEmail = function(email) {
            // '@'의 위치 찾기
            var index = email.indexOf("@");

            if (index > 0) {
                // '@' 앞의 부분 추출
                var id = email.substring(0, index);

                var markedId = "";

                // 아이디 길이가 1 이상이면 마스킹 처리 시작
                if (id.length > 1) {
                    // 첫 글자는 그대로
                    markedId += id.substring(0, 1);

                    // 중간 부분 마스킹
                    for (var i = 1; i < id.length - 1; i++) {
                        markedId += '*';
                    }

                    // 마지막 글자 추가
                    markedId += id.substring(id.length - 1);
                } else {
                    // 길이가 1인 경우는 그냥 그대로 사용
                    markedId = id;
                }

                // 전체 마스킹된 이메일 반환
                return markedId + email.substring(index);
            }

            // '@'가 없는 경우 원래 이메일 반환
            return email;
        };

        // 임시로 넘어가기 버튼
        this.btn_Pass_onclick = function(obj,e)
        {
        	this.fn_LoginSuccess()
        };

        // 아이디 및 비밀번호 static영역에 들어왔을 때
        this.div_LoginForm_sta_FindLoginInfo_onmouseenter = function(obj,e)
        {

        };
        // 아이디 및 비밀번호 static영역에서 나갔을 때
        this.div_LoginForm_sta_FindLoginInfo_onmouseleave = function(obj,e)
        {

        };

        // 아이디 및 비밀번호를 클릭했을 때
        this.div_LoginForm_sta_FindLoginInfo_onclick = function(obj,e)
        {
        	this.showFindLoginInfo();
        };

        // FindLoginInfo 팝업 호출 함수
        this.showFindLoginInfo = function (objParam)
        {
        	popup = new nexacro.ChildFrame;
        	popup.init("popupFindLoginInfo", 0, 0, 600, 500, null, null, "FrameBase::Popup_FindLoginInfo.xfdl");
        	popup.set_dragmovetype("all");
        	popup.set_layered("true");
        	popup.set_autosize(true);
        	popup.set_showtitlebar("아이디 및 비밀번호 찾기");
        	popup.set_showstatusbar(false);
        	popup.set_resizable(true);
        	popup.set_openalign("center middle");
        	popup.showModal(this.getOwnerFrame(), objParam, this, "fn_popupCallback", true);
        	popup.style.set_overlaycolor("#6666664C");
        	popup.form.style.set_border("1 solid #4c5a6f");

        }
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.div_LoginForm.form.sta_FindLoginInfo.addEventHandler("onmouseleave",this.div_LoginForm_sta_FindLoginInfo_onmouseleave,this);
            this.div_LoginForm.form.sta_FindLoginInfo.addEventHandler("onmouseenter",this.div_LoginForm_sta_FindLoginInfo_onmouseenter,this);
            this.div_LoginForm.form.sta_FindLoginInfo.addEventHandler("onclick",this.div_LoginForm_sta_FindLoginInfo_onclick,this);
            this.btn_Login.addEventHandler("onclick",this.btn_Login_onclick,this);
            this.btn_AuthCheck.addEventHandler("onclick",this.btn_AuthCheck_onclick,this);
            this.btn_Pass.addEventHandler("onclick",this.btn_Pass_onclick,this);
        };
        this.loadIncludeScript("Form_Login.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
