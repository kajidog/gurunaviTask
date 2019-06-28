import React from 'react'
import {Nav,ConditionsButton, Ul, Li, TextBox1, Select, ShowandHide, SearchBtn, ConditionList, InputForm, Heading} from '../style/ConditionForm'

export default class ConditionForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      keyword:"",
      mode:false,
      range:1,
      rangeValue:"300m",
      conditions:{conditions:[{value:"ランチ営業あり", para:"lunch"}, {value:"禁煙席あり", para:"no_smoking"}, {value:"カード利用可", para:"card"}, {value:"携帯の電波が入る", para:"mobilephone"},
        {value:"飲み放題あり", para:"bottomless_cup"}, {value:"日曜営業あり", para:"sunday_open"}, {value:"テイクアウトあり", para:"takeout"}, {value:"個室あり", para:"private_room"},
        {value:"深夜営業あり", para:"midnight"}, {value:"駐車場あり", para:"parking"}, {value:"法事利用可", para:"memorial_service"}, {value:"誕生日特典あり", para:"birthday_privilege"}, {value:"結納利用可", para:"betrothal_present"},
        {value:"キッズメニューあり", para:"kids_menu"}, {value:"電源あり", para:"outret"}, {value:"wifeあり", para:"wifi"}, {value:"マイクあり", para:"microphone"}, {value:"食べ放題あり", para:"buffet"},
        {value:"14時以降のランチあり", para:"late_lunch"}, {value:"スポーツ観戦可", para:"sports"}, {value:"朝まで営業あり", para:"until_morning"}, {value:"ランチデザートあり", para:"lunch_desert"},
        {value:"プロジェクター・スクリーンあり", para:"projecter_screen"}, {value:"ペット同伴可", para:"with_pet"}, {value:"デリバリーあり", para:"deliverly"}, {value:"土曜日特別ランチあり", para:"special_holiday_lunch"},
        {value:"電子マネー利用可", para:"e_money"}, {value:"ケータリングあり", para:"caterling"}, {value:"モーニング・朝ごはんあり", para:"breakfast"}, {value:"デザートビュッフェあり", para:"desert_buffet"},
        {value:"ランチビュッフェあり", para:"lunch_buffet"}, {value:"お弁当あり", para:"bento"}, {value:"ランチサラダバーあり", para:"lunch_salad_buffet"}, {value:"ダーツあり", para:"darts"}, {value:"Web予約可", para:"web_reserve"}],
      },
      categoryC:{
        title:"条件",
        url:"",
        hit:[],
        hitTop:[0, 1, 2, 3, 4],
        choice:[],
        hide:false,
      },
      categoryCS:{
        title:"カテゴリーS",
        url:"",
        hit:[],
        hitTop:[0, 1, 2, 3, 4],
        choice:[],
        hide:false,
      },
      categoryCL:{
        title:"カテゴリーL",
        url:"",
        hit:[],
        hitTop:[0, 1, 2, 3, 4],
        choice:[],
        hide:false,

      }
    }
    this.ChangeRange = this.ChangeRange.bind(this);
    this.ChangeMode = this.ChangeMode.bind(this);
    this.SetKeyWord = this.SetKeyWord.bind(this);
    this.Deselect = this.Deselect.bind(this);
    this.AddConditions = this.AddConditions.bind(this);
    this.AddConditionsTop = this.AddConditionsTop.bind(this);
    this.DeselectCategoryS = this.DeselectCategoryS.bind(this);
    this.AddCategoryS = this.AddCategoryS.bind(this);
    this.AddCategorySTop = this.AddCategorySTop.bind(this);
    this.DeselectCategoryL = this.DeselectCategoryL.bind(this);
    this.AddCategoryL = this.AddCategoryL.bind(this);
    this.AddCategoryLTop = this.AddCategoryLTop.bind(this);
    this.displayC = this.displayC.bind(this);
    this.displayCS = this.displayCS.bind(this);
    this.displayCL = this.displayCL.bind(this);
    this.PrepareData = this.PrepareData.bind(this);
  }

  ChangeMode(e){
    this.setState({mode:!this.state.mode})
    this.state.mode?
    this.props.Default()
    :
    this.props.FormExpansion()
  }
  //検索範囲が変更された時の処理
  ChangeRange(e){
    const a =[0, "300m", "500m", "1000m"];
    this.setState({
      range:e.target.value-0,
      rangeValue:a[e.target.value],
    })
    this.props.send({hit_per_page:100}, ["&range="+e.target.value, "&latitude="+this.props.lat, "&longitude="+this.props.lng,
      this.state.categoryCL.url, this.state.categoryCS.url, this.state.categoryC.url])
  }

  //範囲指定のドロップダウンメニューの生成
  option(index, value){
    if(index === this.state.range){
      return null;
    }
    return(<option value={index}>{value}</option>)
  }

  //キーワード検索で入力されたとき
  SetKeyWord(e){
    this.setState({keyword:e.target.value})
    let a = [];
    let b = [];
    let c = [];
    if(e.target.value !== ""){
      this.state.conditions.conditions.forEach((value, i)=>{
        if(value.value.indexOf(e.target.value) !== -1)a.push(i)
      })
      if(this.props.categoryS !== null){
        this.props.categoryS.category_s.forEach((value, i)=>{
          if(value.category_s_name.indexOf(e.target.value) !== -1)b.push(i)
        })
      }
      if(this.props.categoryL !== null){
        this.props.categoryL.category_l.forEach((value, i)=>{
          if(value.category_l_name.indexOf(e.target.value) !== -1)c.push(i)
        })
      }
    }
    this.setState({
      categoryC:{
        ...this.state.categoryC,
        hit:a
      },
      categoryCS:{
        ...this.state.categoryCS,
        hit:b
      },
      categoryCL:{
        ...this.state.categoryCL,
        hit:c
      }
    });
  }

  //urlを作ってレストラン情報を取得
  PrepareData(categorySChoice, categoryLChoice, conditionsChoice){
    let a = ""
    categorySChoice.forEach((value,i)=>{
      if(i !== 0)a = a + ","
      a = a + this.props.categoryS.category_s[value].category_s_code
    })
    if(a !== ""){
      a = "&category_s=" + a
    }
    let b = ""
    categoryLChoice.forEach((value,i)=>{
      if(i !== 0)b = b + ","
      b = b + this.props.categoryL.category_l[value].category_l_code
    })
    if(b !== ""){
      b = "&category_l=" + b
    }
    let c = "";
    conditionsChoice.forEach((value, i)=>{
      c += "&"+this.state.conditions.conditions[value].para + "=1"
    })

    //データを送る
    this.props.send({hit_per_page:100}, ["&range="+this.state.range, "&latitude="+this.props.lat, "&longitude="+this.props.lng, a, b, c])
    return {c:c, cs:a, cl:b}
  }

  //選択解除
  Deselect(e){
    const a = this.state.categoryC.choice.filter(n => n !== e.currentTarget.getAttribute('data-number')-0);
    const b = this.PrepareData(this.state.categoryCS.choice, this.state.categoryCL.choice, a)
    this.setState({categoryC:
      {
      ...this.state.categoryC,
      choice:a,
      url:b.c,
      },
      categoryCS:{
        ...this.state.categoryCS,
        url:b.cs
      },
      categoryCL:{
        ...this.state.categoryCL,
        url:b.cl
      }
    });
  }

  //選択解除
  DeselectCategoryS(e){
    const a = this.state.categoryCS.choice.filter(n => n !== e.currentTarget.getAttribute('data-number')-0)
    const b = this.PrepareData(a, this.state.categoryCL.choice, this.state.categoryC.choice)
    this.setState({
      categoryC:{
        ...this.state.categoryC,
        url:b.c,
      },
      categoryCS:{
        ...this.state.categoryCS,
        choice:a,
        url:b.cs
      },
      categoryCL:{
        ...this.state.categoryCL,
        url:b.cl
      }
    });
  }
  //選択解除
  DeselectCategoryL(e){
    const a = this.state.categoryCL.choice.filter(n => n !== e.currentTarget.getAttribute('data-number')-0)
    const b = this.PrepareData(this.state.categoryCS.choice, a, this.state.categoryC.choice)
    this.setState({
      categoryC:{
        ...this.state.categoryC,
        url:b.c,
      },
      categoryCS:{
        ...this.state.categoryCS,
        url:b.cs
      },
      categoryCL:{
        ...this.state.categoryCL,
        choice:a,
        url:b.cl
      }
    });
  }

  Add(e, category, mode=0){
    let a = [];
    let b = true;
    let c = []
    if(mode === 0){
    c = category.hit[e.currentTarget.getAttribute('data-number')]
  }else{
    c = category.hitTop[e.currentTarget.getAttribute('data-number')]
  }
    category.choice.forEach(value =>{
      if(value === c) b = false;
      a.push(value)
    })

    if(b){
      a.push(c);
    }else{
      a = a.filter(n => n !== c);
    }
    return a

  }
  AddConditions(e){
    const a = this.Add(e, this.state.categoryC)
    const b = this.PrepareData(this.state.categoryCS.choice, this.state.categoryCL.choice, a)
    this.setState({
      categoryC:{
        ...this.state.categoryC,
        choice:a,
        url:b.c,
      },
      categoryCS:{
        ...this.state.categoryCS,
        url:b.cs
      },
      categoryCL:{
        ...this.state.categoryCL,
        url:b.cl
      }
    });
  }
  AddCategoryS(e){
    const a = this.Add(e, this.state.categoryCS)
    const b = this.PrepareData(a, this.state.categoryCL.choice, this.state.categoryC.choice)
    this.setState({
      categoryC:{
        ...this.state.categoryC,
        url:b.c,
      },
      categoryCS:{
        ...this.state.categoryCS,
        choice:a,
        url:b.cs
      },
      categoryCL:{
        ...this.state.categoryCL,
        url:b.cl
      }
    });
  }
  AddCategoryL(e){
    const a = this.Add(e, this.state.categoryCL)
    const b = this.PrepareData(this.state.categoryCS.choice, a, this.state.categoryC.choice)
    this.setState({
      categoryC:{
        ...this.state.categoryC,
        url:b.c,
      },
      categoryCS:{
        ...this.state.categoryCS,
        url:b.cs
      },
      categoryCL:{
        ...this.state.categoryCL,
        choice:a,
        url:b.cl
      }
    });
  }

  //キーワードが入力されてないとき用
  AddConditionsTop(e){
    const a = this.Add(e, this.state.categoryC, 1)
    const b = this.PrepareData(this.state.categoryCS.choice, this.state.categoryCL.choice, a)
    this.setState({
      categoryC:{
        ...this.state.categoryC,
        choice:a,
        url:b.c,
      },
      categoryCS:{
        ...this.state.categoryCS,
        url:b.cs
      },
      categoryCL:{
        ...this.state.categoryCL,
        url:b.cl
      }
    });
  }
  AddCategorySTop(e){
    const a = this.Add(e, this.state.categoryCS, 1)
    const b = this.PrepareData(a, this.state.categoryCL.choice, this.state.categoryC.choice)
    this.setState({
      categoryC:{
        ...this.state.categoryC,
        url:b.c,
      },
      categoryCS:{
        ...this.state.categoryCS,
        choice:a,
        url:b.cs
      },
      categoryCL:{
        ...this.state.categoryCL,
        url:b.cl
      }
    });
  }
  AddCategoryLTop(e){
    const a = this.Add(e, this.state.categoryCL, 1)
    const b = this.PrepareData(this.state.categoryCS.choice, a, this.state.categoryC.choice)
    this.setState({
      categoryC:{
        ...this.state.categoryC,
        url:b.c,
      },
      categoryCS:{
        ...this.state.categoryCS,
        url:b.cs
      },
      categoryCL:{
        ...this.state.categoryCL,
        choice:a,
        url:b.cl
      }
    });
  }

  //隠したりすべて表示したりの切り替え
  displayC(e){
    const a = this.display(this.state.categoryC.hide, this.state.conditions.conditions)
    this.setState({
      categoryC:{
        ...this.state.categoryC,
        hide:a.hide,
        hitTop:a.hitTop
      }
    })
  }
  displayCS(e){
    const a = this.display(this.state.categoryCS.hide, this.props.categoryS.category_s)
    this.setState({
      categoryCS:{
        ...this.state.categoryCS,
        hide:a.hide,
        hitTop:a.hitTop
      }
    })
  }
  displayCL(e){
    const a = this.display(this.state.categoryCS.hide, this.props.categoryL.category_l)
    this.setState({
      categoryCL:{
        ...this.state.categoryCL,
        hide:a.hide,
        hitTop:a.hitTop
      }
    })
  }
  display(hide, lavel){
    let a = []
    hide ?
    a =[0, 1, 2, 3, 4]
    :
    lavel.forEach((value, i)=>a.push(i))
    return {hide:!hide, hitTop:a}
  }

  render(){
    //検索範囲の選択ボタン
    const Range = (
      <li style={{display:"inline-block"}}>
        <Select value={this.state.rangeValue} onChange={this.ChangeRange}>
          <option value={this.state.range} defaultValue>検索範囲 : {this.state.rangeValue}</option>
          {this.option(1, "300m")}
          {this.option(2, "500m")}
          {this.option(3, "1000m")}
        </Select>
      </li>
    )

    //選ばれている条件の表示
    const Choice = (
      <div  style={{display:"flex"}}>
        {this.state.categoryC.choice.map((value, i)=>(
          <Li>
            <ConditionsButton data-number={value} onClick={this.Deselect}>{this.state.conditions.conditions[value].value}</ConditionsButton>
          </Li>
        ))}
        {this.state.categoryCS.choice.map((value, i)=>(
          <Li key={i}>
            <ConditionsButton data-number={value} onClick={this.DeselectCategoryS}>{this.props.categoryS.category_s[value].category_s_name}</ConditionsButton>
          </Li>
        ))}
        {this.state.categoryCL.choice.map((value, i)=>(
          <Li key={i}>
            <ConditionsButton data-number={value} onClick={this.DeselectCategoryL}>{this.props.categoryL.category_l[value].category_l_name}</ConditionsButton>
          </Li>
        ))}
      </div>
    )
    //ヒットの一覧の表示
    const Category =(category, hit, data, action, tag)=>(
      <div>
        <Heading>{category.title}</Heading>
        {data.data !== null ?(
          <div>
            {hit.length > 0 ? (
              <div>
                {hit.map((value, i)=>(  //ヒットした一覧の表示
                  <div key={i}>
                    {category.choice.indexOf(value) !== -1? //選択しているかの判定
                      <ConditionList padding="10px 30px" onClick={action} data-number={i}>✔{data.data[tag.tag1][value][tag.tag2]}</ConditionList>
                      :
                      <ConditionList onClick={action} data-number={i}> {data.data[tag.tag1][value][tag.tag2]}</ConditionList>
                    }
                  </div>
                ))}
                </div>
              )
              :
              <p>見つかりませんでした</p>
            }
          </div>)
          :
          data.err ?<p>データを取得できませんでした</p>
          :
          data.comunication ?<p>通信中</p>
          :
          <p>準備中</p>
        }
      </div>
    )
    const HitConditions = (
      Category(this.state.categoryC,this.state.categoryC.hit,
        {data:this.state.conditions}, this.AddConditions, {tag1:"conditions", tag2:"value"})
    )

    const HitCategoryS = (
        Category(this.state.categoryCS,this.state.categoryCS.hit,
          {data:this.props.categoryS, err:this.props.categorySE, comunication:this.categorySC},
          this.AddCategoryS,{ tag1:"category_s", tag2:"category_s_name"})
    )
    const HitCategoryL = (
        Category(this.state.categoryCL,this.state.categoryCL.hit,
          {data:this.props.categoryL, err:this.props.categoryLE, comunication:this.categoryLC},
          this.AddCategoryL,{ tag1:"category_l", tag2:"category_l_name"})
    )
    const Hide=(hide, action)=>
      hide ?
        <ShowandHide type="button" value="隠す" onClick={action} />
      :
        <ShowandHide type="button" value="すべて表示" onClick={action} />

    const HitConditionsTop = (
      <div style={{padding:"30px",borderBottom:"1px solid rgba(246, 95, 117, 0.7)"}}>
        {
          Category(this.state.categoryC,this.state.categoryC.hitTop, {data:this.state.conditions},
             this.AddConditionsTop, {tag1:"conditions", tag2:"value"})
        }
        {Hide(this.state.categoryC.hide, this.displayC)}{/* 隠しボタンとかの表示 */}
      </div>

    )
    // かてごりーSの一覧の表示
    const HitCategorySTop = (
      <div style={{padding:"30px",borderBottom:"1px solid rgba(246, 95, 117, 0.7)"}}>
        {
          Category(this.state.categoryCS,this.state.categoryCS.hitTop,
            {data:this.props.categoryS, err:this.props.categorySE, comunication:this.categorySC},
          this.AddCategorySTop,{ tag1:"category_s", tag2:"category_s_name"})
        }
        {Hide(this.state.categoryCS.hide, this.displayCS)}{/* 隠すボタンとか */}


      </div>
    )
    // かてごりーLの一覧の表示
    const HitCategoryLTop = (
      <div style={{padding:"30px", borderBottom:"1px solid rgba(255, 64, 92, 1)"}}>
        {

          Category(this.state.categoryCL,this.state.categoryCL.hitTop,
            {data:this.props.categoryL, err:this.props.categoryLE, comunication:this.categoryLC},
          this.AddCategoryLTop,{ tag1:"category_l", tag2:"category_l_name"})
        }{/*  */}
        {Hide(this.state.categoryCL.hide, this.displayCL)}{/* 隠すボタンとかの表示 */}
      </div>
    )




    return(
      <div>
      {this.props.display?
      this.state.mode?
        //条件を入力するモード
        <div style={{width:"100%", height:"100vh"}}>

          <div style={{overflow:"hidden", width:"100%", height:"60px"}}>
            <Nav><Ul>
              {Range}
              {Choice}
              <Li>
                <div style={{height:"40px", marginRight:"10px"}}>
                  <InputForm placeholder="キーワード" value={this.state.keyword} onChange={this.SetKeyWord}/>
                </div>
              </Li>
            </Ul></Nav>
          </div>

          <div style={{width:"100%", backgroundColor:"white", height:"calc(100% - 60px)", overflowY:"scroll"}}>
            {this.state.keyword !== "" ?
            <div style={{width:"100%"}}>
              {HitConditions}
              {HitCategoryS}
              {HitCategoryL}
              <SearchBtn type="button" onClick={this.ChangeMode}>検索</SearchBtn>
            </div>
            :
            <div>
              <div>
              {HitConditionsTop}
              {HitCategorySTop}
              {HitCategoryLTop}
              </div>
              <SearchBtn type="button"  onClick={this.ChangeMode}>検索</SearchBtn>
            </div>
          }
          </div>
        </div>

        :

        //最初のモード
        <div style={{overflow:"hidden", width:"100%", height:"60px"}}>
          <Nav>
            <Ul>
              <Li>
                <div style={{height:"40px", marginRight:"10px"}}>
                  <h4 style={{margin:"0", padding:"10px"}}>レストラン検索</h4>
                </div>
              </Li>
              {Range}
              {Choice}
              <Li>
                <div style={{height:"40px", marginRight:"10px"}} onClick={this.ChangeMode}>
                  <TextBox1>絞り込み</TextBox1>
                </div>
              </Li>
            </Ul>
          </Nav>
        </div>
        :
        null
      }
      </div>
    )
  }
}
