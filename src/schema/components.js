import { createElement } from "react"

//此文件为画布渲染的依据，同文件夹下的另外三个类型component是负责左侧组件布局，不涉及画布渲染和右侧属性栏。

export default [
    {
        type: 'p',
        props: {
            name: '<p>',
            className:'',
            style: {
                position: 'relative',
                width: '',
                height: '',
                color: '#000000',
                fontSize: '16px',
                fontWeight: 'light',
                fontStyle: 'normal',
                textAlign: 'left',
                textDecoration: 'none',
                flexWrap: 'wrap',
                zIndex: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
                opacity: '',
            }
        },
        children: [
            '文本',
        ]
    },
    {
        type: 'span',
        props: {
            name: '<span>',
            className:'',
            style: {
                position: 'relative',
                width: '',
                height: '',
                color: '#000000',
                fontSize: '16px',
                fontWeight: 'light',
                fontStyle: 'normal',
                textAlign: 'left',
                textDecoration: 'none',
                zIndex: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
                opacity: '',
            }
        },
        children: [
            '文本',
        ]
    },
    {
        type: 'button',
        props: {
            name: '<button>',
            className:'',
            style: {
                position: 'relative',
                cursor: 'pointer',
                color: '#FFFFFF',
                width: '100px',
                height: '30px',
                borderWidth: '0px',
                borderStyle: 'solid',
                backgroundColor: '#2c82f2',
                borderColor: '#000000',
                borderRadius: '6px',
                fontWeight: 'bold',
                textAlign: 'center',
                zIndex: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
                opacity: '',
                fontSize:'12px',
            },
            eventlist:{
                '弹窗事件':'alert("你好");\n',
                '打印事件':'console.log("你好");\n',
                '获取其他组件':'const item = document.getElementsByClassName("")[0];\n',
                '获取组件后弹窗':'alert(item.value);\n',
            },
            addedlist:{
                
            },
            onClick: `(e) => {}`,
        },
        children: [
            '预览按钮',
        ]
    },
    {
        type: 'input',
        props: {
            name: '<input>',
            className:'',
            defaultValue: '请输入文本',
            type: 'text',
            style: {
                position: 'relative',
                width: '',
                height: '',
                borderColor: 'grey',
                borderWidth: '1px',
                borderRadius: '4px',
                backgroundColor: 'white',
                zIndex: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
                opacity: '',

            },
            eventlist:{
                '弹窗事件':'alert("失去焦点");\n',
                '打印事件':'console.log("失去焦点");\n',
            },
            addedlist:{
            },
            onBlur: `(e) => {}`
        },
        children: [

        ]
    },
    {
        type: 'textarea',

        props: {
            name: '<textarea>',
            className:'',
            defaultValue: '请输入段落',
            style: {
                position: 'relative',
                width: '200px',
                height: '100px',
                borderColor: 'grey',
                borderWidth: '1px',
                borderRadius: '4px',
                backgroundColor: '',
                zIndex: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
                opacity: '',

            },
            eventlist:{
            },
            addedlist:{
            },
            onChange: `(e) => {console.log(e)}`
        },
        children: [


        ]
    },
    {
        type: 'div',

        props: {
            name: '<div>',
            className:'',
            style: {
                boxSizing: 'border-box',
                margin: '0px',
                padding: '0px',
                position: 'relative',
                left: '',
                right: '',
                top: '',
                bottom: '',
                width: '100%',
                height: '',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                flex: '',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
                zIndex: '1',
                backgroundColor: '#ffffff',
                color:'#000000',
                backgroundImage: 'url("")',
                backgroundSize: 'contain',
                opacity: "",
                zIndex: '',
                borderWidth:'',
                borderColor:'',
                borderRadius:'',
            }
        },
        children: [
            'div'
        ]
    },
    {
        type: 'h1',

        props: {
            name: '<h>',
            className:'',
            style: {
                position: 'relative',
                color: 'black',
                textAlign: 'left',
                fontSize: '32px',
                fontStyle: 'normal',
                zIndex: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
                opacity: '',
            }
        },
        children: [
            '标题'

        ]
    },

    {
        type: 'a',
        props: {
            name: '<a>',
            className:'',
            label: '链接',
            href: 'https://www.bilibili.com/',
            style: {
                position: 'relative',
                cursor: 'pointer',
                textDecoration: 'none',
                fontStyle: 'normal',
                color: 'blue',
                zIndex: '',
                pointerEvents: 'auto',
                left: '',
                right: '',
                top: '',
                bottom: '',
                opacity: '',
            }

        },
        children: [
            '链接',

        ]
    },
    {
        type: 'img',
        props: {
            name: '<img>',
            className:'',
            label: '图片',
            alt: '',
            src: 'https://images.pexels.com/photos/9287901/pexels-photo-9287901.jpeg',
            // src: '/img/logo.png',
            style: {
                position: 'relative',
                width: '200px',
                height: '',
                zIndex: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
                opacity: '',
            }
        },
        children: [

        ]
    },

    {
        type: 'video',
        props: {
            name: '<video>',
            className:'',
            label: '视频',
            controls: 'controls',
            src: 'https://pic.oh4k.com/spdiy/wp-content/uploads/2022/08/20220809-mGFGRn.mp4',
            style: {
                position: 'relative',
                width: '200px',
                height: '',
                zIndex: '',
                left: '',
                right: '',
                top: '',
                bottom: '',
                opacity: '',
            }
        },
        children: [
        ]
    },
    {
        type:'title',
        props:{
            style:{},
            className:'',
            title: '我是标题',
            content:'文段文段文段'
        },
        children:[]
    },
    {
        type:'submitCard',
        props:{
            style:{},
            className:'',
            placeholder: '输入要提交的信息',
            buttoncontent:'提交'
        },
        children:[]
    },
    {
        type:'layoutSingle',
        props:{
            style:{},
            className:'',
            type:'cus',
            content:'我是单列布局',
        },
        children:[]
    },


]


