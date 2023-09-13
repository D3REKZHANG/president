import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BackButton = ({ route } : { route?: string }) => {

  const navigate = useNavigate();

  return (
    <Button
      className="back-button"
      shape="circle"
      icon={<LeftOutlined />}
      size="large"
      onClick={() => navigate((route !== undefined) ? route : '/' )}
    />
  );
}

export { BackButton }
