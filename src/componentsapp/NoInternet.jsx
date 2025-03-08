import React from "react";
import { Modal } from "antd";
import { MdWifiOff } from "react-icons/md";

function NoInternet({connectionStatus}) {
    return (
        <Modal
        open={connectionStatus}
        closeIcon = {false}
        footer={[]}
        width={700} // Adjust modal width if needed
        >
        <div className=" dark:bg-[#f2ffeb] text-center">
            <h2 className="text-4xl font-bold">Internet is disconnected</h2>
        </div>

        <div className="flex  justify-center  mt-10 mb-8" >
            <MdWifiOff className="w-20 h-20" style={{ color: '#4688f2' }} />
        </div>
        <div className=" dark:bg-[#f2ffeb] text-center">
            <h2 className="text-xl font-semibold">No internet connection found. Please check internet to continue.</h2>
        </div>
        </Modal>
    )
}

export default NoInternet;
