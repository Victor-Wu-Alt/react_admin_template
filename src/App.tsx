import './App.css'
import zhCN from "antd/locale/zh_CN";
import {ConfigProvider} from "antd";
import routes from './router'
import {useRoutes} from 'react-router-dom'
import useGlobalStore from "@/store/global.ts";

function App() {
    const {primaryColor} = useGlobalStore();
    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                token: {
                    colorPrimary: primaryColor,
                },
            }}
        >{useRoutes(routes)}
        </ConfigProvider>
    )
}

export default App
