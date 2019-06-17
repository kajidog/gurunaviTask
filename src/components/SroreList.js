import React from 'react'

export default class StoreList extends React.Component{
  constructor(props){
    super(props);
    this.NextPage = this.NextPage.bind(this);
    this.BackPage = this.BackPage.bind(this);
    this.ChangeRange = this.ChangeRange.bind(this);
  }
  NextPage(e){
    this.props.ChangePage(this.props.response.page_offset-0+1, this.props.range);
  }
  BackPage(e){
    this.props.ChangePage(this.props.response.page_offset-0-1, this.props.range);
  }
  ChangeRange(e){
    if(e.currentTarget.getAttribute('data-number') !== this.props.range){
      this.props.ChangePage(this.props.response.page_offset-0, e.currentTarget.getAttribute('data-number'))
    }
  }

  render(){
    return(
      <div>
        {
          Object.keys(this.props.response).length? (
            <div>
              <lavel>検索範囲 : </lavel>
              <input type="button" value="300m" data-number={1} onClick={this.ChangeRange}/>
              <input type="button" value="500m" data-number={2} onClick={this.ChangeRange}/>
              <input type="button" value="1000m" data-number={3} onClick={this.ChangeRange}/>
              <p>{this.props.response.page_offset}ページ目　{this.props.response.total_hit_count}件ヒット {this.props.response.hit_per_page}件表示中</p>
              {
                this.props.response.page_offset > 1 ?
                <input type="button" value="戻る" onClick={this.BackPage} />  : null
              }
              {
                this.props.response.total_hit_count - this.props.response.page_offset * this.props.response.hit_per_page > 0?
                <input type="button" value="次へ" onClick={this.NextPage} /> : null
              }
              {this.props.response.rest.map((value)=>(
                <div style={{border:"solid 1px"}}>
                  <p>{value.name}</p>
                  {Object.keys(value.access.line).length?
                    <p>路線名 : {value.access.line}</p>
                    :
                    null
                  }
                  {Object.keys(value.access.station).length?
                    <p>駅名 : {value.access.station}</p>
                    :
                    null
                  }
                  {Object.keys(value.access.station_exit).length?
                    <p>駅出口 : {value.access.station_exit}</p>
                    :
                    null
                  }
                  {Object.keys(value.access.walk).length?
                    <p>徒歩 : {value.access.walk}分</p>
                    :
                    null
                  }
                  {Object.keys(value.access.note).length?
                    <p>備考 : {value.access.note}</p>
                    :
                    null
                  }
                  {
                    Object.keys(value.image_url.shop_image1).length?
                    <img src={value.image_url.shop_image1} alt="name" />
                    :
                    null
                  }
                </div>
              ))}
            </div>
          ) : null
        }
      </div>
    );
  }

}
