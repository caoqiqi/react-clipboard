'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CopyImg = function (_React$Component) {
    _inherits(CopyImg, _React$Component);

    function CopyImg() {
        _classCallCheck(this, CopyImg);

        var _this = _possibleConstructorReturn(this, (CopyImg.__proto__ || Object.getPrototypeOf(CopyImg)).call(this));

        _this.state = {
            visible: false
        };
        _this.componentDidMount = function () {
            document.addEventListener('paste', _this.handlePaste);
        };
        _this.componentWillUnmount = function () {
            document.removeEventListener('paste', _this.handlePaste);
        };

        _this.fileLength_base64 = function (v) {
            var str = v.substring(22);
            var equalIndex = str.indexOf('=');
            if (str.indexOf('=') > 0) {
                str = str.substring(0, equalIndex);
            }
            var strLength = str.length;
            var fileLength = parseInt(strLength - strLength / 8 * 2);
            return fileLength;
        };
        _this.handleOk = function () {
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
        };
        _this.handlePaste = function (e) {
            var imgReader = function imgReader(item) {
                var blob = item.getAsFile(),
                    reader = new FileReader();
                var imgObj = void 0;
                reader.onload = function (e) {
                    var imgObj = _react2.default.createElement('img', { style: { display: 'inline-block', height: '100%', width: '100%' }, src: e.target.result });
                    _this.setState({
                        img: imgObj,
                        result: e.target.result
                    });
                };
                reader.readAsDataURL(blob);
            };
            var clipboardData = e.clipboardData,
                i = 0,
                items,
                item,
                types;

            if (clipboardData) {
                items = clipboardData.items;

                if (!items) {
                    return;
                }

                item = items[0];
                types = clipboardData.types || [];

                for (; i < types.length; i++) {
                    if (types[i] === 'Files') {
                        item = items[i];
                        break;
                    }
                }

                if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
                    imgReader(item);
                }
            }
        };
        return _this;
    }

    _createClass(CopyImg, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                {
                    style: {
                        width: this.props.width ? this.props.width : '300px',
                        height: this.props.height ? this.props.height : '300px',
                        border: '1px dotted #ccc',
                        borderRadius: '4px',
                        textAlign: 'center',
                        lineHeight: this.props.height ? this.props.height : '300px'
                    } },
                this.state.img ? this.state.img : "ctrl+v或鼠标右键进行粘贴"
            );
        }
    }]);

    return CopyImg;
}(_react2.default.Component);

exports.default = CopyImg;
//# sourceMappingURL=clipoboard.js.map