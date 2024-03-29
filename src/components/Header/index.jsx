import React, { useState, useEffect } from "react"
import { deepCopy } from "../../utilts/clone";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/router";


<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>



export function Header({ selectComponent, setSelectComponent, pageInfo, setPageInfo, canvasSize, setCanvasSize, editMode, setEditMode }) {
    // 每次调用pageInfo可能会变化，记录pageInfo
    // 撤销、恢复使用setPageInfo
    // console.log({ ...pageInfo });//获取schema数据
    // console.log({ ...pageInfo.page.children });//获取schema数据
    // console.log(selectComponent);


    const [pageInfoHistory, setPageInfoHistory] = useState([])//设置初始状态为空数组，页面历史pageInfoHistory为空。
    const [index, setIndex] = useState(-1)//初始index为-1
    useEffect(() => {//
        // let newPageInfo = deepCopy()
        //将新的pageInfo追加到数组中，并深赋值，防止覆盖
        if (pageInfoHistory[pageInfoHistory.length - 1] !== pageInfo) {
            let newPageInfoHistory = deepCopy([...pageInfoHistory, pageInfo])
            setPageInfoHistory(newPageInfoHistory)
            setIndex(index + 1)
            // console.log(pageInfoHistory)
            // console.log(index)
        }
        // console.log(pageInfoHistory[pageInfoHistory.length - 1]);

    }, [pageInfo])//检测pageInfo的变化，保存了才会改，因为diffuser是浅比较

    //撤销
    const undo = () => {
        if (index > 0 && pageInfoHistory[pageInfoHistory.length - 1] !== pageInfo) {
            // TODO bug?
            setIndex(index - 2)  //当点击时也会追加新的pageInfo，因此需要index减两次
            let newPageInfoHistory = deepCopy(pageInfoHistory)
            // newPageInfoHistory.length = index
            setSelectComponent(0)
            setPageInfoHistory([...newPageInfoHistory])
            setPageInfo({ ...newPageInfoHistory[index - 1] })
        }

    }


    //重做
    const redo = () => {
        let newPageInfoHistory = deepCopy(pageInfoHistory)
        if (index + 1 < newPageInfoHistory.length && pageInfoHistory[pageInfoHistory.length - 1] !== pageInfo) {
            setSelectComponent(0)
            setPageInfoHistory([...newPageInfoHistory])
            setPageInfo({ ...newPageInfoHistory[index + 1] })
        }
    }


    //清空画布,将page.children内数据清空
    const clearClick = () => {
        let newPageInfo = pageInfo
        newPageInfo.page.children = []
        setSelectComponent(0)
        setPageInfo({ ...newPageInfo })
    }

    // 递归删除节点
    function selectDelete(arr, newPageInfo) {
        if (selectComponent == NaN) return false
        for (let i = 0; i < arr.length; i++) {
            // id与selectComponent值相同，则选中
            if (!arr[i].props) {
                continue // div没有id值，跳过本次循环
            }
            if (arr[i].props.id == selectComponent) {
                arr.splice(i, 1)
                return setPageInfo({ ...newPageInfo })
            } else if (arr[i].children.length > 1) {
                // 若为div嵌套，则递归遍历其中的节点
                selectDelete(arr[i].children, newPageInfo)
            }
        }
    }

    //删除组件
    const deleteFocus = () => {
        // console.log('删除');
        let newPageInfo = pageInfo
        let arr = newPageInfo.page.children
        setSelectComponent(0)
        selectDelete(arr, newPageInfo)
    }



    // 递归上移节点
    function selectUp(arr, newPageInfo) {
        if (selectComponent == NaN) return false
        for (let i = 0; i < arr.length; i++) {
            // id与selectComponent值相同，则选中
            if (!arr[i].props) {
                continue // 跳过本次循环，继续下一个循环
            }
            if (arr[i].props.id == selectComponent && i !== 0) {
                arr[i] = arr.splice(i - 1, 1, arr[i])[0]
                return setPageInfo({ ...newPageInfo })
            } else if (arr[i].children.length > 1) {
                // 若为div嵌套，则递归遍历其中的节点
                selectUp(arr[i].children, newPageInfo)
            }
        }
    }
    //上移
    const placeTop = () => {
        let newPageInfo = pageInfo
        let arr = newPageInfo.page.children
        selectUp(arr, newPageInfo)
    }

    // 递归下移节点
    function selectDown(arr, newPageInfo) {
        if (selectComponent == NaN) return false
        for (let i = 0; i < arr.length; i++) {
            // id与selectComponent值相同，则选中
            if (!arr[i].props) {
                continue // 跳过本次循环，继续下一个循环
            }
            if (arr[i].props.id == selectComponent && i !== arr.length - 1) {
                // console.log(i);
                arr[i] = arr.splice(i + 1, 1, arr[i])[0]
                return setPageInfo({ ...newPageInfo })
            } else if (arr[i].children.length > 1) {
                // 若为div嵌套，则递归遍历其中的节点
                selectDown(arr[i].children, newPageInfo)
            }
        }
    }
    //下移
    const placeBottom = () => {
        let newPageInfo = pageInfo
        let arr = newPageInfo.page.children
        selectDown(arr, newPageInfo)
    }
    //保存
    const saveSchema = () => {
        // sessionStorage.setItem('schema', JSON.stringify(pageInfo));
        let newPageInfo = pageInfo
        let pageID_ = newPageInfo.userID
        let page_ = newPageInfo
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/savePage', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(
            JSON.stringify({
                page: page_,
            })
        );
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = JSON.parse(xhr.responseText)
                // console.log(res)
                if (res.code === 0) {
                    // console.log(res.msg)
                    toast.success(res.msg)
                } else if (res.code === 1) {
                    // 不存在
                    toast.success(res.msg)
                } else if (res.code === 2) {
                    // 参数错误
                    toast.success(res.msg)
                } else if (res.code === -1) {
                    // 未知错误
                    toast.success(res.msg)
                }
            } else {
                console.log(xhr.statusText)
            }
        }
    }
    

    const buttons = [
        { label: '撤销', handler: undo },
        { label: '重做', handler: redo },
        { label: '删除', handler: deleteFocus },
        { label: '清空', handler: clearClick },
        { label: '上移', handler: placeTop },
        { label: '下移', handler: placeBottom },
    ]
    return (
        <div className='editor-header'>
            <div className='editor-header-logo'>
                <a href={`/admin.html?userID=${pageInfo.userID}`}>
                    <img className='editor-header-logo-pic' src="/img/logo.png"></img>
                </a>
            </div>
            <div className='editor-header-content'>
                <div className='editor-header-content-button'>
                    {buttons.map((button, index) => (
                        <button key={index} className="editor-header-button" onClick={button.handler}>{button.label}<Toaster /></button>
                    ))}
                </div>
                <div className='editor-header-content-block'></div>
                <div style={{ color: '#606266', marginLeft: '10px ' }} className='editor-header-canvas-setter'>

                    <div className="setter-box">
                        <span>自定义尺寸:</span>
                        <input
                            className="header-canvas-setter-input"
                            value={canvasSize.width}
                            onChange={(e) => setCanvasSize({ width: e.target.value, height: canvasSize.height })}//这里待改进，应该是点击enter后尺寸修改，而不是onchange就立刻响应


                        />
                        <span> * </span>
                        <input
                            className="header-canvas-setter-input"
                            value={canvasSize.height}
                            onChange={(e) => setCanvasSize({ width: canvasSize.width, height: e.target.value })}

                        />
                    </div>

                    <div className="setter-box">
                        <label htmlFor="canvas-select">画布尺寸规格:</label>
                        <select id="canvas-select" onChange={(e) => setCanvasSize({ width: e.target.value.split('*')[0], height: e.target.value.split('*')[1] })} className="header-canvas-setter-select">
                            <option value="800*1000" >PC:800*1000px</option>
                            <option value="1024*768" >PC:1024*768px</option>
                            <option value="1280*768" >PC:1280*768px</option>
                            <option value="1920*960" >PC:1920*960px</option>
                            <option value="375*667" >iPhone SE:375*667px</option>
                            <option value="360*740" >Samsung:360*740px</option>
                        </select>
                    </div>
                </div>

                <div className="editor-header-right-box">
                    <button className="editor-header-button-right edit-button" onClick={() => setEditMode(!editMode)} >
                        <svg t="1661338746290" className="icon-trans" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2312" width="20" height="20"><path d="M956.994933 307.22722c4.950755-11.95017 2.214435-25.705452-6.931876-34.851763L799.528576 121.840976l-45.227064 45.227064 95.941096 95.941096-722.30068 0 0 63.960731 799.507086 0C940.384627 326.969866 952.046225 319.179436 956.994933 307.22722zM959.430402 646.774543L159.923316 646.774543c-12.935614 0-24.596188 7.791453-29.54592 19.741623-4.950755 11.95017-2.214435 25.705452 6.931876 34.851763l150.534482 150.534482 45.227064-45.226041-95.941096-95.941096 722.30068 0L959.430402 646.774543z" p-id="2313"></path></svg>
                        {editMode ? '当前为编辑模式' : '当前为预览模式'}</button>
                    <button className="editor-header-button-right save-button" onClick={saveSchema}>保存<Toaster /></button>
                    {/* <a className="editor-header-button-right publish-button" href={"https://lowcode.fly.dev/view/" + pageInfo._id}>发布</a> */}
                    <a className="editor-header-button-right publish-button" href={"/view/" + pageInfo._id}>发布</a>
                </div>
            </div>

            {/* <Link to="/attack/" className="editor-header-button right" style={{ textDecoration: 'none' }}>发布</Link> */}

        </div>
    )

}
