import {Modal, Tree} from "antd"
import {useEffect, useState} from "react"
import {PermissionNode} from "../../../interface"
import request from "../../../request"
import {backSystemApi} from "../../../api"

export default function AuthorityModal(props: { visibleProp: any[], currentGroupId: number }) {

  const [visible, setVisible] = props.visibleProp
  const [loading, setLoading] = useState<boolean>(false)

  const [treeData, setTreeData] = useState<PermissionNode[]>([])
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])

  // 请求权限结构树
  useEffect(function getTreeData() {
    if (visible) {
      setCheckedKeys([])
      request(backSystemApi.getPermissionTree)
        .then(res => {
          if (res !== undefined) setTreeData(res.data)
        })
      request(backSystemApi.getGroupPermission, {group: props.currentGroupId})
        .then(res => {
          if (res !== undefined) setCheckedKeys(res.data)
        })
    }
    // eslint-disable-next-line
  }, [visible])

  function onOk() {
    setLoading(true)
    request(backSystemApi.updateGroupPermission,
      {
        group: props.currentGroupId,
        checked_keys: checkedKeys
      }
    ).then((res: any) => {
      if (res !== undefined) setVisible(false)
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