import React, {Component} from 'react';
import SimpleMDE from 'simplemde'
import marked from 'marked'
import { Form, Input, Button, Modal} from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
class Publish extends Component {
    constructor(props){
        super(props);
        this.state={
            article: {},
            visible: false,
        };
        this.smde = null;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if(typeof(webExtensionWallet) === "undefined"){
            this.showModal();
            return;
        }
        this.smde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,
            autoDownloadFontAwesome: false,
            autofocus: true,
            autosave: true,
            previewRender: function(plainText) {
                    return marked(plainText,{
                            renderer: new marked.Renderer(),
                            gfm: true,
                            pedantic: false,
                            sanitize: false,
                            tables: true,
                            breaks: true,
                            smartLists: true,
                            smartypants: true
                    });
            },
        })
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
    handleSubmit = (e) => {
        e.preventDefault();
        if(typeof(webExtensionWallet) === "undefined"){
            this.showModal();
            return;
        }
        const articleData = {
            title: this.props.form.getFieldsValue().title,
            contents: this.smde.value(),
            autor: this.props.form.getFieldsValue().autor || "oasis_author",
        };
        let argArray = new Array();
        argArray.push(articleData.title);
        argArray.push(articleData.autor);
        argArray.push(articleData.contents);
        let callArgs = JSON.stringify(argArray);
        var serialNumber;
        serialNumber = nebPay.call(dappAddress, "0", "save", callArgs, {    //使用nebpay的call接口去调用合约,
            callback: config[netType].callBackObj,
            listener: (res) => {
                // console.log("response of push: " + JSON.stringify(res));
                if (res && res.txhash) {
                } else {
                  const modal = Modal.error({
                    title: '提示',
                    content: '发布终止',
                  });
                }
            }
        });
        const waitmodal = Modal.success({
            title: '提示',
            content: '正在提交中...',
        });
        let intervalQuery = setInterval(() => {
            nebPay.queryPayInfo(serialNumber,{callback: config[netType].callBackObj})   //search transaction result from server (result upload to server by app)
              .then((resp) => {
                console.log("交易结果: " + resp);
                var respObject = JSON.parse(resp);
      
                if(respObject.code === 0){
                    if(respObject.data.status === 1) {
                        waitmodal.destroy();
                        const modal = Modal.success({
                            title: '提示',
                            content: '发布成功',
                        });
                      clearInterval(intervalQuery);
                      this.props.history.push(`/`);
                    }
                    
                }
              })
              .catch((err) => {
                clearInterval(intervalQuery);
              });
          }, 10000);
      }
    render() {
        return (
            <div className="App">
                <div>
                <Form>
                    <FormItem label="文章标题">
                        {this.props.form.getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题' }],
                        })(
                            <Input size="large" placeholder="输入标题" />
                        )}
                        
                    </FormItem>
                    <FormItem label="作者">
                        {this.props.form.getFieldDecorator('autor')(
                            <Input placeholder="输入名字" />
                        )}
                        
                    </FormItem>
                    <FormItem label="文章内容">
                        <TextArea id="editor" rows={20} />
                    </FormItem>
                </Form>
                </div>
                <Button type="primary" onClick={this.handleSubmit} >发布</Button>
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

const PublishForm = Form.create()(Publish);
export default PublishForm;