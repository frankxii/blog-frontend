import {message, Modal, Tree} from "antd"
import {useEffect, useState} from "react"
import {PermissionNode} from "../../../interface"
import request from "../../../request"
import {api} from "../../../api"

export default function AuthorityModal(props: { visibleProp: any[], currentGroupId: number }) {

  const [visible, setVisible] = props.visibleProp
  const [loading, setLoading] = useState<boolean>(false)

  const [treeData, setTreeData] = useState<PermissionNode[]>([])
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  // 请求权限结构树
  useEffect(function getTreeData() {
    if (visible) {
      setCheckedKeys([])
      request(api.getPermissionTree)
        .then(res => {
          setTreeData(res.data)
        })
      request(api.getGroupPermission, {group: props.currentGroupId})
        .then(res => {
          setCheckedKeys(res.data)
        })
    }
    // eslint-disable-next-line
  }, [visible])

  function onOk() {
    setLoading(true)
    request(api.updateGroupPermission,
      {
        group: props.currentGroupId,
        checked_keys: checkedKeys
      }
    ).then((res: any) => {
      message.success(res.msg).then()
      setVisible(false)
    }).finally(() => setLoading(false))
  }

  return (
    <Modal
      title="权限设置"
      visible={visible}
      confirmLoading={loading}
      onCancel={() => setVisible(false)}
      onOk={onOk}
    >
      <Tree
        checkable
        showLine={{showLeafIcon: false}}
        checkedKeys={checkedKeys}
        onCheck={checkedKeys => {
          // @ts-ignore
          setCheckedKeys(checkedKeys)
        }}
        treeData={treeData}
      />
    </Modal>
  )
}