import React from 'react'
import {Table, Td, Th} from '../style/StoreInformation'

export default class StoreInformation extends React.Component {
  constructor(props){
    super(props);
    this.back = this.back.bind(this);
  }

  //店一覧に戻る
  back(e){
    this.props.Default();
  }

  render(){
    //空かどうかの判定をする
    const EmptyString =(word, Mark, style, lavel="")=>{
      if(word !== ""){
        return(<Mark style={{style}}>{lavel} {word}</Mark>)
      }
      return null
    }

    //空かどうかの判定をする（テーブル用）
    const EmptyStringTable =(word, style, lavel)=>{
      if(word !== ""){
        return(
          <tr>
            <Th>{lavel}</Th>
            <Td style={style}>{word}</Td>
          </tr>
        )
      }
      return null
    }

    //アクセス情報の表示
    const Access =(info)=>{
      let a = "";
      ["line","station", "station_exit", "walk"].forEach((value, i)=>{
        if(info.value !== ""){
          if(i !== 0)a += " "
          a += info[value]
        }
      })
      if(a !== ""){
        return(
          <tr>
            <Th>アクセス</Th>
            <Td>{a}</Td>
          </tr>
        )
      }else{
        return null
      }
    }


    const Data =(info)=>(
      <div style={{ border:"solid 1px black", padding:"10px"}}>
      <button onClick={this.back}>戻る</button>
        <h2 style={{}}>{info.name}</h2>
        <div style={{display:"flex",flexWrap:"wrap"}}>
        {
          info.image_url.shop_image1 !== ""?
          <img style={{margin:"10px",height:"400px"}} src={info.image_url.shop_image1} alt="店舗画像1" />
          :
          null
        }
        {
          info.image_url.shop_image2 !== ""?
          <img style={{margin:"10px",height:"400px"}} src={info.image_url.shop_image2} alt="店舗画像2" />
          :
          null
        }
        </div>
        {EmptyString(info.pr.pr_long, "p", {color:"red"})}

        <Table style={{border:"solid 1px", padding:"10px"}}>
          {EmptyStringTable(info.name, {fontSize:"18px"}, "店名")}
          {EmptyStringTable(info.opentime, {}, "営業時間")}
          {EmptyStringTable(info.holiday, {}, "休業日")}
          {EmptyStringTable(info.tel, {}, "電話番号")}
          {EmptyStringTable(info.address, {}, "住所")}
          {EmptyStringTable(info.parking_lots, {}, "駐車場台数")}
          {Access(info.access)}
        </Table>
        {(navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') === -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0?
          <a href={info.url_mobile} target="_blank" rel="noopener noreferrer">サイトURL: ぐるなび店舗ページへ</a>
          :
          <a href={info.url} target="_blank" rel="noopener noreferrer">サイトURL(ぐるなび店舗ページ)</a>
        }
      </div>
    )
    return(
      <div>
        {this.props.display?
          Data(this.props.data)
        :
          null
        }
      </div>
    );
  }
}
