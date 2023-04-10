import cusStyle from './index.module.scss'
//编写自定义组件
export function Title(props){
    const {title,content} = props
    return (
        <div {...props}>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    )
}


export function SubmitCard(props){
    const {placeholder,buttoncontent} = props
    return (
        <div {...props}>
            <input pointerEvents='none' placeholder={placeholder}></input>
            <button>{buttoncontent}</button>
        </div>
    )
}

export function LayoutSingle(props){
    const {content} = props
    return (
        <div {...props}>
            <div className={cusStyle.layout_header} id={-props.id}>
                <header></header>

            </div>
        </div>
    )
}

