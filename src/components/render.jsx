// 根据pageInfo渲染组件
import React from "react";
import componentList from '../schema/components'
import {Title,SubmitCard,LayoutSingle} from '../schema/customComponents'
import { deepCopy } from "../utilts/clone";

//组件映射表
const componentmap = {
    title:Title,
    submitCard:SubmitCard,
    layoutSingle:LayoutSingle

}

//判断映射表中是否存在自定义组件名称
function isMap(type){
    if(componentmap[type]){
        return true
    }else{
        return false
    }
}

//输入自定义组件名称，输出自定义函数组件
function componentMap (type){
    return componentmap[type]
}


// 将字符串转换为函数？
function parse(str) {
    if (typeof str === 'string') {
        return new Function('return' + str)()
    } else {
        console.log(`函数转换错误: ${str} ${typeof str}`)
    }
}

// 判断属性是否是函数
function isFunction(key) {
    // 假设所有事件属性都以on开头
    // 或者对应的value使用特殊前缀
    return key.startsWith('on')//检测key名是否有'on'开头，放回true或false
}

// 根据页面信息pageInfo递归渲染组件
// 供预览使用，不添加额外功能
function Component(props) {
    // 把props函数属性从字符串转为函数
    // 不要直接修改props
    let newProps = {}
    for (let key in props.props) {//每个组件的props属性
        if (isFunction(key)) {
            newProps[key] = parse(props.props[key])
        } else {
            newProps[key] = props.props[key]
        }
    }

    //渲染自定义组件
    if(isMap(props.type)){
        let customCom = componentMap(props.type)
        return React.createElement(customCom,props.props)
    }
    //

    if (props.children.length > 0) {
        const children = props.children.map((child, index) => {
            return typeof child === 'string' ? child : <Component key={index} {...child}></Component>
        })
        return React.createElement(props.type, newProps, children// 格式为：React.createElement("div", {id: "foo"}, "bar");
        )
    } else {
        return React.createElement(props.type, newProps)
    }
}


// 在Component基础上添加一层div, 加入拖动事件, 选中突出显示
// 在Container中使用
// 禁止<a>超链接点击：css pointer-events:none
// 不设置onXXX函数，
function PreviewComponent({ selectComponent, setSelectComponent, pageInfo, setPageInfo, ...props }) {
    console.assert(typeof selectComponent === 'number')//？
    // console.log('@',pageInfo)
    // 开始拖动时添加组件id和类型.拖动时完成数据传输
    const handle_dragStart = (e) => {
        e.dataTransfer.setData('component/id', `${props.props.id}`) // props.id为数字，传输时使用字符串！！
        e.dataTransfer.setData('component/type', `${props.type}`)//setData('component/type', `${props.type}`)
        e.stopPropagation()
    }

    // 拖拽经过释放区域
    const handle_dragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }


    // 在pageInfo.page中根据id查找组件
    const findComponentByID = (id, page) => {
        if (typeof page === 'string' || !page)
            return false

        if (page.props.id === id) {
            return page

        } else {
            for (let index in page.children) {
                let result = findComponentByID(id, page.children[index])
                if (result) {
                    return result
                }
            }
            return false
        }
    }

    // 遍历page删除id对应的组件，返回新组件
    function removeComponentByID(ID, page) {
        if (typeof page === 'string') {
            // 字符串结点直接返回
            return page
        } else if (page.props.id !== ID) {
            // 普通节点ID不同，递归遍历子节点
            let newChildren = []
            for (let index in page.children) {
                let result = removeComponentByID(ID, page.children[index])
                if (result !== false) {
                    // 保留子结点
                    newChildren.push(result)
                }
            }
            page.children = newChildren
            return page
        } else {
            // 要删除的结点
            return false
        }
    }

    // 将component插入page中id=parentID的组件的children中，返回修改后的page
    function addToChildren(component, parentID, page) {
        if (typeof page === 'string') {
            return page
        } else if (page.props.id === parentID) {//加载根组件处
            page.children.push(component)
            return page
        } else {
            page.children = page.children.map((child) => {//加载子组件的childfren
                return addToChildren(component, parentID, child)
            })
            return page
        }
    }

    // 在pageInfo中将ID对应的组件移动至parentID内
    function moveToChildren(ID, parentID, page) {
        // 找到要移动的组件
        const component = findComponentByID(ID, page)
        if (component === false) {
            console.log('不存在的组件id:', ID)
            return pageInfo
        }

        // 删除要移动的组件得到newPage
        const newPage = removeComponentByID(ID, page)

        // 在parentID组件children中push结点
        return addToChildren(component, parentID, newPage)

    }

    function findParentID(targetID, page) {
        if (typeof page === 'string') {
            return false
        } else {
            for (let i in page.children) {
                if (typeof page.children[i] === 'string') {
                    continue
                } else if (page.children[i].props.id === targetID)
                    return page.props.id
                else {
                    let result = findParentID(targetID, page.children[i])
                    if (result !== false) {
                        return result
                    }
                }
            }
            return false
        }

    }

    // 释放
    function handle_drop(e) {
        e.preventDefault()
        e.stopPropagation() // 避免触发两次

        const dragID = parseInt(e.dataTransfer.getData('component/id'))
        const dragType = e.dataTransfer.getData('component/type')
        const dropID = parseInt(e.target.id)
        const dropType = e.target.localName

        console.assert(typeof dragID === 'number')
        console.assert(typeof dropID === 'number')

        console.log(`drag ${dragID}/${dragType} into ${dropID}/${dropType}`)
        // console.log(e)

        function isChildren(parentID, childID, page) {
            let component = findComponentByID(parentID, page)
            return findComponentByID(childID, component) !== false
        }

        if (dragID) {
            // dragID存在，移动组件
            // 拖动画布已有的组件，不需要移动
            if (dragID === dropID) {
                return false
            }
            // 检查并禁止父节点向子节点拖动
            if (isChildren(dragID, dropID, pageInfo.page)) {
                return false
            }
            if (dropType === 'div') {
                // 如果目标容器可嵌套(div)，则向children push
                let newPageInfo = pageInfo
                newPageInfo.page = moveToChildren(dragID, dropID, newPageInfo.page)
                setPageInfo({ ...newPageInfo })

            } else {
                let newPageInfo = pageInfo
                let parentID = findParentID(dropID, newPageInfo.page)
                newPageInfo.page = moveToChildren(dragID, parentID, newPageInfo.page)
                setPageInfo({ ...newPageInfo })
            }
        } else {
            // dragID不存在，新建组件

            let newPageInfo = pageInfo
            newPageInfo.maxID += 1//在此处维护maxID
            let component

            for (let index in componentList) {
                if (componentList[index].type === dragType) {
                    // 直接赋值bug，所有相同类型的组件使用同一个page的引用
                    // 需要深拷贝新建component
                    // component = componentList[index]
                    component = deepCopy(componentList[index])
                    component.props.id = newPageInfo.maxID//为每一个拖拽的组件新增一个id

                    break
                }
            }


            if (dropType === 'div') {
                // 如果目标容器可嵌套(div)，则向children push
                console.log('div-dropType:',dropType,dropID)
                newPageInfo.page = addToChildren(component, dropID, newPageInfo.page)//包括根组件跟小组件

            } 
            // else if(dropType === 'div' && dropID !== 1){//失效，试图push组件到自定义的布局组件中,但是无法分清原有的div和自定义组件的外层div
            //     console.log('dropType:',dropType,dropID)
            //     newPageInfo.page = addToChildren(component, -dropID, newPageInfo.page)

            // }
            else {
                // 寻找父节点，向其孩子插入
                // 如果目标不可嵌套，则根据y轴坐标判断在上面还是下面添加，并没有实现，而是放在了根组件的children处
                let parentID = findParentID(dropID, newPageInfo.page)
                console.assert(parentID !== false)
                newPageInfo.page = addToChildren(component, parentID, newPageInfo.page)

            }

            setPageInfo({ ...newPageInfo })
        }

        // 避免冒泡
        return false
    }

    // 组件是string, 不需要渲染
    if (typeof props === 'string') {
        return { props }
    }





    // 递归渲染子组件
    let children = []
    //递归渲染子组件
    if (props.children.length > 0) {
        
            children = props.children.map((child, index) => {
                return typeof child === 'string' ? child
                    : <div className="canvas-field" key={index} id={child.props.id} style={child.props.style}>
                        <PreviewComponent  {...child} pageInfo={pageInfo} setPageInfo={setPageInfo} selectComponent={selectComponent} setSelectComponent={setSelectComponent}></PreviewComponent>
                    </div>
            })
    }

    





    // 编辑时删除组件onXXX函数
    let newProps = deepCopy(props.props)
    for (let key in newProps) {
        // console.log(`props.${key} = ${props.props[key]}`)
        if (isFunction(key)) {
            delete newProps[key]
        }
    }

    // 编辑时禁用<a>点击效果
    if (props.type === 'a') {
        newProps.style['pointerEvents'] = 'none'
    }

    // 编辑时禁用input 和 textarea标签输入功能（设置只读）
    if (props.type === 'input' || props.type === 'textarea') {
        newProps.readOnly = true
    }

    //渲染自定义组件
    if(isMap(props.type)){
        let customCom = componentMap(props.type)
        console.log('newProps.id:'+ newProps.id,'selectComponent'+ selectComponent)
        return React.createElement(customCom,{
            ...newProps,
            className: selectComponent === props.props.id ? "preview-component-click" : "preview-component",
            draggable: true,
            onDragStart: handle_dragStart,
            onDragOver: handle_dragOver,
            onDrop: handle_drop
        })
    }
    //





    // img标签不能传children参数
    // 通过切换className高亮被选中的组件
    if (children.length !== 0) {
        return React.createElement(props.type, {
            // ...props.props,
            ...newProps,
            className: selectComponent === props.props.id ? "preview-component-click" : "preview-component",//设置高亮
            draggable: true,
            onDragStart: handle_dragStart,
            onDragOver: handle_dragOver,
            onDrop: handle_drop
        }, children)
    } else {
        return React.createElement(props.type, {
            // ...props.props,
            ...newProps,
            className: selectComponent === props.props.id ? "preview-component-click" : "preview-component",
            draggable: true,
            onDragStart: handle_dragStart,
            onDragOver: handle_dragOver,
            onDrop: handle_drop
        })
    }



}


// 渲染左侧列表中的可拖动组件
function DragComponent(props) {
    function handle_dragStart(e) {
        e.dataTransfer.setData('component/type', props.type)
    }
    // const styleLeft = {
    //     border: '1px solid #BFC3F2', 
    //     borderRadius:'4px', 
    //     userSelect: 'none',
    //     textAlign:'center',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     height:'30px',
    //     color:'#000CF5',
    //     fontFamily:'Geneva',
    //     cursor:'-webkit-grab',

    // }


    return (
        <div draggable onDragStart={handle_dragStart}>

            <div>{props.props.name}</div>
            {/*<Component {...props}></Component>
            <Component {...props}></Component> */}
        </div>
    )
}
export { Component, DragComponent, PreviewComponent }