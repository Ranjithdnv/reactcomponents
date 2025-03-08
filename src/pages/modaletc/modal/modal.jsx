// // import React, { useState } from "react";
// // import { Modal, Button } from "antd";

// // const CustomModal = ({ title, content, triggerText = "Open Modal" }) => {
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const showModal = () => {
// //     setIsModalOpen(true);
// //   };

// //   const handleOk = () => {
// //     setIsModalOpen(false);
// //   };

// //   const handleCancel = () => {
// //     setIsModalOpen(false);
// //   };

// //   return (
// //     <div>
// //       <Button type="primary" onClick={showModal}>
// //         {triggerText}
// //       </Button>
// //       <Modal
// //         title={title || "Default Title"}
// //         open={isModalOpen}
// //         onOk={handleOk}
// //         onCancel={handleCancel}
// //         // mask={false}
// //         maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
// //         centered
// //       >
// //         {content || <p>Default modal content</p>}
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default CustomModal;
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // import React, { useState } from "react";
// // import { Modal, Button } from "antd";

// // const CustomModal = () => {
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const showModal = () => {
// //     setIsModalOpen(true);
// //   };

// //   const handleOk = () => {
// //     console.log("OK clicked");
// //     setIsModalOpen(false);
// //   };

// //   const handleCancel = () => {
// //     console.log("Cancel clicked");
// //     setIsModalOpen(false);
// //   };

// //   return (
// //     <div>
// //       <Button type="primary" onClick={showModal}>
// //         Open Modal
// //       </Button>
// //       <Modal
// //         title="Ant Design Modal with All Props"
// //         open={isModalOpen}
// //         onOk={handleOk}
// //         onCancel={handleCancel}
// //         footer={[
// //           <Button key="cancel" onClick={handleCancel}>
// //             Cancel
// //           </Button>,
// //           <Button
// //             key="ok"
// //             // type="primary"
// //             // className="text-black"
// //             onClick={handleOk}
// //           >
// //             Confirm
// //           </Button>,
// //         ]}
// //         centered
// //         maskClosable={true}
// //         mask={true}
// //         styles={{
// //           body: { padding: "20px", backgroundColor: "#f9f9f9" },
// //           mask: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
// //         }}
// //         width={600}
// //         closable={true}
// //         keyboard={true}
// //         destroyOnClose={true}
// //         zIndex={1500}
// //         className="custom-modal-class"
// //         style={{ borderRadius: "10px", overflow: "hidden" }}
// //       >
// //         <p>This modal demonstrates all 17 properties of Ant Design `Modal`.</p>
// //         <p>Adjust the properties as needed to fit your use case.</p>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default CustomModal;
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// // import React, { useState } from "react";
// // import { Modal, Button } from "antd";

// // const CustomModal = () => {
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const showModal = () => {
// //     setIsModalOpen(true);
// //   };

// //   const handleOk = () => {
// //     setLoading(true); // Show loading indicator on the OK button
// //     setTimeout(() => {
// //       setLoading(false); // Stop loading after 2 seconds
// //       setIsModalOpen(false);
// //     }, 2000);
// //   };

// //   const handleCancel = () => {
// //     setIsModalOpen(false);
// //   };

// //   return (
// //     <div>
// //       <Button type="primary" onClick={showModal}>
// //         Open Modal
// //       </Button>
// //       <Modal
// //         title="Custom Modal"
// //         open={isModalOpen}
// //         onOk={handleOk}
// //         onCancel={handleCancel}
// //         confirmLoading={loading}
// //       >
// //         <p>Some modal content...</p>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default CustomModal;
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from "react";
// import { Modal, Skeleton, Button } from "antd";

// const CustomModal = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (isModalOpen) {
//       setLoading(true);
//       // Simulate data fetch
//       setTimeout(() => {
//         setLoading(false);
//       }, 3000); // 3-second loading simulation
//     }
//   }, [isModalOpen]);

//   return (
//     <div>
//       <Button color="red" type="primary" onClick={() => setIsModalOpen(true)}>
//         Open Modal
//       </Button>
//       <Modal
//         title="Skeleton Loading Example"
//         open={isModalOpen}
//         onCancel={() => setIsModalOpen(false)}
//         footer={null}
//       >
//         {loading ? (
//           <>
//             <Skeleton active /> <Skeleton active /> <Skeleton active />
//           </> // Show Skeleton Loader
//         ) : (
//           <p>Content loaded successfully!</p>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default CustomModal;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from "react";
import { Modal, Skeleton, Button } from "antd";
const BasicModal = ({ title, content, triggerText = "Open Modal" }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(triggerText);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        className="
    bg-transparent 
   border-none
    text-blue-500 
    hover:bg-blue-500 hover:text-white 
    focus:outline-none 
    focus:ring-0 
    active:border-0 
    active:outline-none"
        onClick={showModal}
      >
        {triggerText}
      </Button>

      <Modal
        title={title || "Default Title"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        // mask={false}
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        centered
      >
        {content || <p>Default modal content</p>}
      </Modal>
    </div>
  );
};

const CustomModalProps = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(props);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log("OK clicked");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button
        type="primary"
        className="
       bg-transparent 
      border-none
      shadow-md
       text-blue-500 
       hover:bg-blue-500 hover:text-white 
       focus:outline-none 
       focus:ring-0 
       active:border-0 
       active:outline-none"
        onClick={showModal}
      >
        Open Modal
      </Button>
      <Modal
        title="Ant Design Modal with All Props"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="ok"
            // type="primary"
            // className="text-black"
            onClick={handleOk}
          >
            Confirm
          </Button>,
        ]}
        centered
        maskClosable={true}
        mask={true}
        styles={{
          body: { padding: "20px", backgroundColor: "#f9f9f9" },
          mask: { backgroundColor: "rgba(0, 0, 0, 0.4)" },
        }}
        width={600}
        closable={true}
        keyboard={true}
        destroyOnClose={true}
        zIndex={1500}
        className="custom-modal-class"
        style={{ borderRadius: "10px", overflow: "hidden" }}
      >
        <p>This modal demonstrates all 17 properties of Ant Design `Modal`.</p>
        <p>Adjust the properties as needed to fit your use case.</p>
      </Modal>
    </div>
  );
};
const LoadingModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      setLoading(true);
      // Simulate data fetch
      setTimeout(() => {
        setLoading(false);
      }, 3000); // 3-second loading simulation
    }
  }, [isModalOpen]);

  return (
    <div>
      <Button
        autoFocus={false}
        type="primary"
        className="
    bg-transparent 
    border-blue-500
    shadow-md
    border-none
    text-blue-500 
    hover:text-white"
        style={{
          outline: "none",
          boxShadow: "none",
          borderColor: "transparent",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal loading
      </Button>
      <Modal
        title="Skeleton Loading Example"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {loading ? (
          <>
            <div className="flex  flex-col  gap-4">
              <Skeleton active /> <Skeleton active /> <Skeleton active />
            </div>
          </> // Show Skeleton Loader
        ) : (
          <p>Content loaded successfully!</p>
        )}
      </Modal>
    </div>
  );
};

const CustomModalWrapper = ({ variant = "basic", ...props }) => {
  switch (variant) {
    case "confirm":
      return <CustomModalProps {...props} />;
    case "loading":
      return <LoadingModal />;
    default:
      return <BasicModal {...props} />;
  }
};

export default CustomModalWrapper;
