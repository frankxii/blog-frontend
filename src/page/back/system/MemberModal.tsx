import {Divider, Modal, Select, Tag} from "antd"
import {useEffect, useState} from "react"
import {Member} from "../../../interface"
import request from "../../../request"
import {backSystemApi} from "../../../api"

export default function MemberModal(props: { visibleProp: Array<any>, currentGroupId: number }) {

  const [visible, setVisible] = props.visibleProp
  const [oldMembers, setOldMembers] = useState<Member[]>([])

  // 新成员下拉
  const [options, setOptions] = useState<Member[]>([])
  const [newMembers, setNewMembers] = useState<string[]>([])
  const {Option} = Select

  const [loading, setLoading] = useState<boolean>(false)

  useEffect(function getMemberOfGroup() {
    if (visible && props.currentGroupId !== 0) {
      // 清空输入框
      setNewMembers([])
      // 填充下拉
      onSearch("")
      // 填充成员标签
      request(backSystemApi.getGroupMembers, {group: props.currentGroupId})
        .then((res: any) => {
          if (res !== undefined) setOldMembers(res.data)
        })
    }
    // eslint-disable-next-line
  }, [visible])


  // 弹窗确认回调
  function updateMembersOfGroup() {
    setLoading(true)
    // 获取旧成员信息
    let idOfOldMembers: number[] = []
    oldMembers.forEach((member: Member) => {
      idOfOldMembers.push(member.id)
    })
    // 获取新添加成员信息
    let idOfNewMembers: number[] = []
    newMembers.forEach((item: string) => {
      let id = Number.parseInt(item.split('|')[1])
      idOfNewMembers.push(id)
    })
    request(
      backSystemApi.updateGroupMembers,
      {
        group: props.currentGroupId,
        old_members: idOfOldMembers,
        new_members: idOfNewMembers
      })
      .then((res: any) => {
        if (res!==undefined)setVisible(false)
      })
      .finally(() => setLoading(false))
  }


  // 下拉输入时回调，查询对应模糊搜索的结果填充选项
  function onSearch(fuzzyName: string) {
    request(backSystemApi.getUserSearchList, {fuzzy_name: fuzzyName})
      .then((res: any) => {
        if (res!==undefined)setOptions(res.data)
      })
  }


  return (
    <Modal
      title="成员维护"
      visible={visible}
      onCancel={() => setVisible(false)}
      onOk={updateMembersOfGroup}
      confirmLoading={loading}
    >
      {oldMembers.map(member => (
        <Tag
          key={"group tag" + member.id}
          closable={true}
          // 移除标签时从memberList里移除掉成员
          onClose={() => setOldMembers(oldMembers.filter(item => item !== member))}
          style={{fontSize: 15}}
        >
          {member.username}
        </Tag>))}
      <Divider/>

      <Select
        mode={"multiple"}
        style={{width: 400}}
        onChange={(values) => setNewMembers(values)}
        onSearch={onSearch}
        value={newMembers}
      >
        {options.map(member =>
          (<Option
              key={"group option" + member.id}
              value={member.username + "|" + member.id}
            >{member.username}
            </Option>
          )
        )}
      </Select>
    </Modal>
  )
}