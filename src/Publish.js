import React, {Component} from 'react';
import SimpleMDE from 'simplemde'
import marked from 'marked'
import { Form, Input, Button} from 'antd';
const FormItem = Form.Item;
const TextArea = Input.TextArea;
class Publish extends Component {
    constructor(props){
        super(props);
        this.state={
            article: {}
        };
        this.smde = null;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.smde = new SimpleMDE({
            element: document.getElementById('editor').childElementCount,  
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
    handleSubmit = (e) => {
        e.preventDefault();
        const articleData = {
            title: this.props.form.getFieldsValue().title,
            contents: this.smde.value(),
            autor: this.props.form.getFieldsValue().autor,
        };
        let callArgs = "[\"" + articleData.title + "\",\"" + articleData.autor + "\",\"" + articleData.contents + "\"]";
        nebPay.call(dappAddress, "0", "save", callArgs, {    //使用nebpay的call接口去调用合约,
            listener: function(res){console.log("response of push: " + res)}
        });
      }
    render() {
        return (
            <div className="App">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="文章标题">
                        {this.props.form.getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入标题' }],
                        })(
                            <Input size="large" placeholder="输入标题" />
                        )}
                        
                    </FormItem>
                    <FormItem label="作者">
                        {this.props.form.getFieldDecorator('autor', {
                            rules: [{ required: true, message: '请输入名字' }],
                        })(
                            <Input placeholder="输入名字" />
                        )}
                        
                    </FormItem>
                    <FormItem label="文章内容">
                        <TextArea id="editor" rows={20} />
                    </FormItem>
                    <Button type="primary" htmlType="submit">发布</Button>
                </Form>
            </div>
        )
    }
}

const PublishForm = Form.create()(Publish);
export default PublishForm;