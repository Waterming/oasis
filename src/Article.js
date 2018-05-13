import React, {Component} from 'react';
import SimpleMDE from 'simplemde'
import marked from 'marked'
import { Form, Input, Button, Tag, Modal} from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
export default class Article extends Component {
    constructor(props){
        super(props);
        this.state={
                title: "正在加载。。。",
                contents: "",
                autor: "",
                date: "",
                address: '',
                visible: false,
        };
    }
    componentDidMount() {
        const articleId = this.props.match.params.id;
        const self = this;
        var value = "0";
        var nonce = "0";
        var gas_price = "1000000";
        var gas_limit = "2000000";
        var callFunction = "get";
        var callArgs = `["${articleId}"]`; // in the form of ["args"]
        var contract = {
            "function": callFunction,
            "args": callArgs
        };
        neb.api.call(from, dappAddress, value, nonce, gas_price, gas_limit, contract).then((res) => {
            const article = JSON.parse(res.result);
                    let date = new Date(article.postTime * 1000);
                    let dateStr = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}`;
                    document.getElementById('content').innerHTML = marked(article.content);
                    self.setState({
                           title: article.title,
                           autor: article.authorName,
                           date: dateStr,
                           address: article.authorAddress
                    })
        });
    }
    showModal = () => {
        this.setState({
          visible: true,
        });
      }
      handleOk = (e) => {
        window.open('https://github.com/ChengOrangeJu/WebExtensionWallet');
        this.setState({
          visible: false,
        });
      }
      handleCancel = (e) => {
        this.setState({
          visible: false,
        });
      }
    goodPay(address,author) {
        if(typeof(webExtensionWallet) === "undefined"){
            this.showModal();
            return;
        }
        var serialNumber = nebPay.pay(address, 1, {
            qrcode: {
                showQRCode: false
            },
            goods: {
                name: "Oasis goodPay",
                desc: "goodPay to "+author,
            },
            listener: function(){
                alert("打赏成功")
            }  //set listener for extension transaction result
        });
    }
    
    render() {
        const {title,contents,autor,date,address} = this.state;
        return (
            <div className="App">
                    <h1>{title}</h1>
                    <div className="tag">
                    <span>{autor}</span>
                    <span style={{color:'#000'}}>{date}</span>
                    </div>
                    <hr/>
                    <div id="content"></div>
                    <Button type="primary" onClick={() => {this.goodPay(address, autor)}} >打赏星云币</Button>
                    <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="去下载"
                    cancelText="取消"
                    >
                    <p>请安装 chrome星云链钱包 插件</p>
                    </Modal>
            </div>
        )
    }
}