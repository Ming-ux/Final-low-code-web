import {useRef,useEffect,createRef,useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import {nanoid} from 'nanoid'
import { deepCopy } from '../../../utilts/clone'
import style from './index.module.scss'
function findComponentByID(page, id) {
  if (typeof page === 'string') {
      return false
  } else if (page.props.id === id) {
      return page.props
  } else {
      let result
      for (let i in page.children) {
          if (result = findComponentByID(page.children[i], id)) {
              return result
          }
      }
      return false
  }
}

function change(page, selectComponent, key, value) {
  if (typeof page === 'string') {
      return page
  }

  if (page.props.id === selectComponent) {
      page.props.style[key] = value
      page.props[key] = value
      return page
  } else {
      page.children = page.children.map((child) => change(child, selectComponent, key, value))
      return page
  }
}




export default function Event({ pageInfo, selectComponent, setPageInfo}) {
  function handleChange(key, value) {
    let newPageInfo = deepCopy(pageInfo)
    newPageInfo.page = change(newPageInfo.page, selectComponent, key, value)
    setPageInfo(newPageInfo)
  }


  let props = findComponentByID(pageInfo.page, selectComponent)//拿到该组件的props

  const [updater,serUpdater] = useState(false)
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




  

  //事件设置
  //找寻'on'开头的事件
  let theEventname = Object.keys(props).filter((x)=>x.startsWith('on'))
  //为每个增加的事件添加ref
  const addref = useRef()//获取事件下拉列表的值
  const textarearef = useRef()//获取事件源码的value值
  let list = props.eventlist//所有事件list
  let addedlist = props.addedlist//已经添加的事件list


  //更新事件语句中
  function update(eventcontent){
    let eventcontentstr = eventcontent.join('')//去除事件语句的逗号
    let str = props[theEventname]
    let strpart = str.split(/\{|\}/)
    let str1 = strpart[0]
    let newstr = str1.concat('{\n',eventcontentstr,'}')
    props[theEventname] = newstr
    console.log(eventcontentstr)
  }

  //展示插入的事件
  function showevent(eventname){
    if(addedlist[eventname]){
      alert('该事件已存在')
    }else{
      addedlist[eventname] = list[eventname]
    }
  }
  //删除事件
  function deleteEvent(e){
    let deletename = e.target.innerText
    if(window.confirm(`你确认要删除${deletename}?`)){
      delete addedlist[deletename]
    }
    let eventcontent = Object.values(addedlist)//已添加的事件数组
    update(eventcontent)
    saveSchema()
    serUpdater(!updater)
    

  }
  //添加事件名称将事件内容插入到组件的事件语句中
  function addevent(){
    let eventname = addref.current.value
    console.log(eventname)
    showevent(eventname)
    let eventcontent = Object.values(addedlist)//已添加的事件数组
    update(eventcontent)
    saveSchema()
    serUpdater(!updater)
    
    //增加保存并reload
  }
  let name1 = "(e) => {"
  let name2 = "}"
  return (
    <div>
       {
        Object.keys(props).map((key,index) => {
           if(key.startsWith('on')){
                return (
                <div key={index}>
                  {/* 展示事件代码区 */}
                  <div className={style.setterItemLabel} >
                    <div className={style.styleName}>组件事件{key} :</div>
                    <textarea className={style.tabText} value={props[key]} ref={textarearef} onChange={event => handleChange(key, event.target.value)}></textarea>

                  </div>
                  {/* 选择事件区 */}
                  <div className={style.setEvent}>
                    <div className={style.styleName}>已绑定的事件:</div>
                      <div className={style.settedEvent} onClick={(e)=>deleteEvent(e)}>
                        {
                          Object.keys(addedlist).map((key,index)=>{
                            const id = nanoid()
                            return (
                              <div key={id} className={style.deleteitem}>
                                <span>{index+1}</span><button className={style.deleteButton}>{key}</button><button className={style.smallButton}>-</button>
                              </div>
                            )
                          })
                        }
                      </div>
                      <div className={style.styleName}>添加绑定事件:</div>
                      <div className={style.select}>
                        <select ref={addref} className={style.styleselect}>
                          {
                            Object.keys(list).map((key,index)=>{
                              return(
                                <option value={key} key={index}>{key}</option>
                              )
                            })
                          }

                        </select>
                        <button onClick={addevent} className={style.button}>+</button>
                      </div>
                  </div>
                </div>
            )
         
            }else {
              return null
            }
        })
      }
    </div>
  )
}
