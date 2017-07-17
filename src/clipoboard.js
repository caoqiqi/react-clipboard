import React from 'react';

export default class CopyImg extends React.Component {
    constructor () {
        super();
        this.state = {
            visible: false
        };
        this.componentDidMount = () => {
            document.addEventListener( 'paste', this.handlePaste);
        };
        this.componentWillUnmount = () => {
            document.removeEventListener('paste', this.handlePaste);
        };

        this.fileLength_base64 = (v) => {
                let str = v.substring(22);
                let equalIndex= str.indexOf('=');
                if(str.indexOf('=')>0)
                {
                    str=str.substring(0, equalIndex);
                }
                let strLength=str.length;
                let fileLength=parseInt(strLength-(strLength/8)*2);
                return fileLength;
        }
        this.handleOk = () => {
            // if(!this.state.result) {
            //     message.warning('请先粘贴图片');
            // }
            // else {
            //     const fileLength = this.fileLength_base64(this.state.result);
            //     const isLt2M = fileLength / 1024 / 1024 < 2;
            //     if (!isLt2M) {
            //         message.error('图片必须小于2M!');
            //     }
            //     else {

            //         this.setState({
            //             visible: false
            //         });
            //         let xhr = new XMLHttpRequest();
            //         let fd = new FormData();
            //         xhr.open('post', '***', true);
            //         fd.append('file', this.state.result);
            //         xhr.send(fd);
            //     }             
            // }       
        }
        this.handlePaste = (e) => {
            var imgReader = (item) => {
                var blob = item.getAsFile(),
                    reader = new FileReader();
                let imgObj;
                reader.onload = (e) => {
                    let imgObj = <img style={{display: 'inline-block', height: '100%', width: '100%'}} src={e.target.result}/>;
                    this.setState({
                        img: imgObj,
                        result: e.target.result
                    });
                }
                reader.readAsDataURL( blob );
            };
            var clipboardData = e.clipboardData,
            i = 0,
            items, item, types;

            if( clipboardData ){
                items = clipboardData.items;

                if( !items ){
                    return;
                }

                item = items[0];
                types = clipboardData.types || [];

                for( ; i < types.length; i++ ){
                    if( types[i] === 'Files' ){
                        item = items[i];
                        break;
                    }
                }

                if( item && item.kind === 'file' && item.type.match(/^image\//i) ){
                    imgReader( item );
                }
            }
        };
    }
    render () {
        return <div
                  style={{
                        width: this.props.width ? this.props.width : '300px',
                        height: this.props.height ? this.props.height :'300px',
                        border: '1px dotted #ccc',
                        borderRadius: '4px',
                        textAlign: 'center',
                        lineHeight: this.props.height ? this.props.height :'300px'
                  }}>
                  {this.state.img ? this.state.img : "ctrl+v或鼠标右键进行粘贴"}

            </div>
    }
}   