import React, {Component} from 'react';
import { Input, List, Avatar, Pagination, Modal } from 'antd';
import { Link } from "react-router-dom";
const Search = Input.Search;
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            articles: [],
            total: 0,
            visible: false,
            input:'',
            pageSize: 10,
            start: 0,
        }
        this.searchArticle = this.searchArticle.bind(this);
        this.changePage = this.changePage.bind(this);
        this.getTotal = this.getTotal.bind(this);
    }
    componentDidMount(){
        // 查询接口 -》 set articles searchByTitleKeywords
      this.getTotal().then(() => {
        const {pageSize, total} = this.state;
        let start = 0;
        if(total >= pageSize){
            start = total - pageSize;
        }
        this.searchArticle("", pageSize, start);
      });

    }
    getTotal() {
        var value = "0";
        var nonce = "0";
        var gas_price = "1000000";
        var gas_limit = "2000000";
        var callFunction = "count";
        var callArgs = `[""]`; // in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        };
        return new Promise((resolve,reject) => {
            neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then((res) => {
                this.setState({
                    total: parseInt(res.result)
                },resolve);
                
           });
        })
        
    }
    searchArticle(input,limit=10,offset=0) {
        if(input){
            if(/n1/.test(input)){
                this.searchByAddress(input, limit, offset);
            }else {
                this.searchByTitleKeywords(input);
            }
        }else {
            var value = "0";
            var nonce = "0";
            var gas_price = "1000000";
            var gas_limit = "2000000";
            var callFunction = "iterate";
            var callArgs = `["${limit}", "${offset}"]`; // in the form of ["args"]
            var contract = {
                "function": callFunction,
                "args": callArgs
            };
            neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then((res) => {
                const articles = JSON.parse(res.result).reverse();
                        this.setState({
                            articles,
                        })
            });
        }
        
    }
    searchByAddress(input, limit, offset){
        var value = "0";
        var nonce = "0";
        var gas_price = "1000000";
        var gas_limit = "2000000";
        var callFunction = "searchByAddress";
        var callArgs = `["${input}","${limit}","${offset}"]`; // in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        };
        neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then((res) => {
            const articles = JSON.parse(res.result).reverse();;
                this.setState({
                    articles,
                })
        });
    }
    searchByTitleKeywords(input){
        // 查询接口 -》 set articles searchByTitleKeywords
        var value = "0";
        var nonce = "0";
        var gas_price = "1000000";
        var gas_limit = "2000000";
        var callFunction = "searchByTitleKeywords";
        var callArgs = `["forever","${input}"]`; // in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        };
        neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then((res) => {
            const articles = JSON.parse(res.result);
                this.setState({
                    articles,
                    total: articles.length
                })
        });
    }
    changePage(page, pageSize){
        console.log(page)
        // this.searchArticle(this.state.input,pageSize, this.state.start - pageSize)
        this.getTotal().then(() => {
          const {total} = this.state;
          let start = 0;
          let size = pageSize;
          if(total >= pageSize){
              if(total - pageSize * page > 0){
                start = total - pageSize * page;
              }else {
                  size = total - (pageSize * page ) + pageSize;
              }
          }
          this.searchArticle("", size, start);
        });
    }
    render() {
        return (
            <div className="App">
            <div className="searchPanel">
            <Search placeholder="输入标题关键字或星云链钱包地址" enterButton="搜索" size="large" onSearch={(val) => {this.setState({input:val});this.searchArticle(val);} }/>
            </div>
            {
                this.state.articles.length === 0 ? 
                <p>正在加载。。。</p> : 
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.articles}
                    renderItem={item => {
                    let date = new Date(item.postTime * 1000);
                    let dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}   ${date.getHours()}:${date.getMinutes()}`;
                    return (
                    <List.Item>
                        <List.Item.Meta
                        title={<Link to={`/article/${item.id}`} >{item.title}</Link>}
                        description={`作者：${item.authorName}    日期：${dateStr}`}
                        />
                    </List.Item>
                    )}}
                />
            }
            
            <Pagination defaultCurrent={1} total={this.state.total} onChange={this.changePage} pageSize={this.state.pageSize}/>
            </div>
        )
    }
}