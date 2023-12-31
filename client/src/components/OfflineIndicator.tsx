import { DisconnectOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"

export const OfflineIndicator = ({ isHidden } : { isHidden: boolean }) => {
  return (
    <>
      {!isHidden && 
        <Tooltip title="Offline">
          <DisconnectOutlined style={{position: 'absolute', bottom: 10}} />
        </Tooltip>}
    </>
  )
}
