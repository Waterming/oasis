import React, {Component} from 'react';
import { Input, List, Avatar, Pagination } from 'antd';
import { Link } from "react-router-dom";
const Search = Input.Search;
export default class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            articles: [],
            total: 0,
        }
        this.searchArticle = this.searchArticle.bind(this);
    }
    componentDidMount(){
        
        const self = this;
        // 查询接口 -》 set articles searchByTitleKeywords
        var callArgs = "[\"10\",\"0\"]"; //in the form of ["args"]
        nebPay.simulateCall(dappAddress, "0", "iterate", callArgs, {    //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: function(res){
                const articles = JSON.parse(res.result);
                self.setState({
                    articles,
                    total: articles.length
                })
            }      //指定回调函数
        });
    }
    searchArticle(value) {
        const self = this;
        // 查询接口 -》 set articles searchByTitleKeywords
        var callArgs = "[\"forever\",\"" + value + "\"]"; //in the form of ["args"]
        nebPay.simulateCall(dappAddress, "0", "searchByTitleKeywords", callArgs, {    //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: function(res){
                const articles = JSON.parse(res.result);
                console.log(articles[0])
                self.setState({
                    articles,
                    total: articles.length
                })
            }      //指定回调函数
        });
    }
    changePage(page, pageSize){
        console.log(page)
    }
    render() {
        return (
            <div className="App">
            <div className="searchPanel">
            <Search placeholder="输入标题关键字" enterButton="搜索" size="large" onSearch={this.searchArticle}/>
            </div>
            {
                this.state.articles.length === 0 ? 
                <p>正在加载。。。</p> : 
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.articles}
                    renderItem={item => {
                    let date = new Date(item.postTime);
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
            
            <Pagination defaultCurrent={1} total={this.state.total} onChange={this.changePage}/>
            </div>
        )
    }
}