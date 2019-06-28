import React from 'react'
import {Button, Img, Lists, List, DetailsButton, StoreName} from '../style/StoreList'

export default class StoreList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cerect:-1,
      height:"calc(100vh - 65px)"
    }
    this.node = React.createRef.bind(this);
    this.ToStoreInformation = this.ToStoreInformation.bind(this);
    this.PageMove = this.PageMove.bind(this);
    this.ChangePage = this.ChangePage.bind(this);
  }
  componentWillReceiveProps(){
    if(this.props.expansion){
      this.setState({cerect:-1,height:"calc(100vh - 65px)"})
    }
  }
  //スクロールの監視
  scrollEvent = (e) => {
    const currentPosition = this.node.scrollHeight-this.node.clientHeight-this.node.scrollTop;
    if(currentPosition < 100){
      //高さが100以下で次のデータを持ってくる
      if(!this.props.comunication){
        const a = this.props.response.length-1;
        if(this.props.response[a].hit_per_page * this.props.response[a].page_offset < this.props.response[a].total_hit_count){
          this.props.ChangePage({offset_page:this.props.response[a].page_offset+1, hit_per_page:100},  this.props.url, 2)
        }
      };
    }
  }
  ChangePage(e){
    const a = this.props.response.length-1;
    if(this.props.response[a].hit_per_page * this.props.response[a].page_offset < this.props.response[a].total_hit_count){
      this.props.ChangePage({offset_page:this.props.response[a].page_offset+1, hit_per_page:100},  this.props.url, 2)
    }
  }
  // クリックされて店の情報を表示
  ToStoreInformation(e){
    let a = e.currentTarget.getAttribute('data-number')-0;
    let b = 0;

    b = this.props.response[Math.floor(a / 100)].rest[a % 100];
    this.props.ClickShop(b.name, b.latitude-0, b.longitude-0)
    this.props.Map();
    this.setState({cerect:a, height:"calc(100vh - ( 65px + 32vh ))"})
  }

  //店の詳細画面に
  PageMove(e){
    let a = e.currentTarget.getAttribute('data-number')-0;
    this.props.Information(this.props.response[Math.floor(a / 100)].rest[a % 100]);
  }

  render(){
    const Access =(data, reserve)=>(
      Object.keys(data).length ?
      <Button>{data}{reserve}</Button>
      :
      null
    )

    const HitPage =
    this.props.response[0] !== null ?
      !this.props.err ?(
        <div style={{margin:"10px", padding:"30px 0"}}>
          <p>{this.props.response[0].total_hit_count}件ヒット</p>
        {this.props.response.map((value, j)=>
          value.rest.map((value, i)=>(
          this.state.cerect !== 100 * j + i ?
          <List data-number={100 * j + i} onClick={this.ToStoreInformation} key={i}>
          {
          Object.keys(value.image_url.shop_image1).length?
          <Img width="300px" url={value.image_url.shop_image1} />
          :
          Object.keys(value.image_url.shop_image2).length?
          <Img width="auto" url={value.image_url.shop_image2} />
          :
            null
          }
          <div style={{margin:"0 auto 0 0"}}>
            <StoreName size="15px">{value.name}</StoreName>
            {value.code.category_name_l.map((value, i)=>(
              value === "" ?
              null
              :
              <Button key={i}>{value}</Button>
            ))}
            {value.code.category_name_s.map((value, i)=>(
              value === "" ?
              null
              :
              <Button key={i}>{value}</Button>
            ))}

          </div>

          </List>
          :
          <div key={i} style={{margin:"25px auto", width:"80%", boxShadow:"3px 3px 10px 4px rgba(170, 170, 170, 0.2)", padding:"10px", borderRadius:"0.65rem"}}>
            <StoreName size="19px">{value.name}</StoreName>
              <div style={{padding:"5px", display:"flex"}}>
              {
                Object.keys(value.image_url.shop_image1).length?
                <Img width="300px" url={value.image_url.shop_image1} />
                :
                null
              }
              {
                Object.keys(value.image_url.shop_image2).length?
                <Img width="300px" url={value.image_url.shop_image2} />
                :
                null
              }
            </div>
            <div>
              <p style={{textAlign:"center", }}>{value.pr.pr_short}</p>
              {value.opentime === "" ?
              null
              :
              <p style={{}}>営業時間　{value.opentime}</p>
              }
              {value.budget === "" ?
              null
              :
              <p style={{}}>平均予算　{value.budget}円</p>
              }
              <p>アクセス</p>
              <div style={{display:"flex", flexWrap:"wrap"}}>
              {Access(value.access.line)}
              {Access(value.access.station)}
              {Access(value.access.station_exit)}
              {Access(value.access.walk, "分")}
              </div>
            </div>
            <div>
              <p>カテゴリー</p>
              <div style={{display:"flex", flexWrap:"wrap"}}>
            {value.code.category_name_l.map((value, i)=>(
              value === "" ?
              null
              :
              <Button key={i}>{value}</Button>
            ))}
            {value.code.category_name_s.map((value, i)=>(
              value === "" ?
              null
              :
              <Button key={i}>{value}</Button>
            ))}
              </div>
            </div>
            <DetailsButton data-number={100 * j + i} onClick={this.PageMove}>詳しく見る</DetailsButton>
          </div>

        )))}
          {
            this.props.comunication ?
            <p style={{textAlign:"center"}}>通信中</p>
            :
            null
          }
        </div>
      )
      :
      <div>
      <p>データを取得できませんでした</p>
      <button onClick={this.ChangePage}>再試行</button>
      </div>
    : this.props.comunication ?
    <p>通信中</p>
    : this.props.err?
    <p>データを取得できませんでした</p>
    :
    <p>準備中</p>

    return(
      <div>
        {this.props.display?
          <div style={{borderTop:"1px solid rgb(148, 148, 148)",height:`${this.state.height}`}}>
            <Lists onScroll={this.scrollEvent}ref={(node) => this.node = node}>
              <h2>周辺の飲食店一覧</h2>
              <a style={{float:"right"}} href="https://api.gnavi.co.jp/api/scope/" rel="noopener noreferrer">
                <img src="https://api.gnavi.co.jp/api/img/credit/api_90_35.gif"style={{width:"90",height:"35",border:"0"}} alt="グルメ情報検索サイト　ぐるなび" />
              </a>

              {HitPage}
            </Lists>
          </div>
        :
          null
        }
      </div>
    );
  }

}
