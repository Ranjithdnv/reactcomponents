// import React, { useState } from "react";
// import { Drawer, Button } from "antd";

// const BasicDrawer = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);

//   const showDrawer = () => {
//     setIsDrawerOpen(true);
//   };

//   const closeDrawer = () => {
//     setIsDrawerOpen(false);
//   };

//   return (
//     <div>
//       <Button type="primary" onClick={showDrawer}>
//         Open Drawer
//       </Button>
//       <Drawer
//         title="Basic Drawer"
//         placement="right" // Can be 'left', 'right', 'top', 'bottom'
//         onClose={closeDrawer}
//         open={isDrawerOpen}
//         width={400} // Width of the drawer
//       >
//         <p>Some content inside the drawer...</p>
//         <p>You can add anything here!</p>
//       </Drawer>
//     </div>
//   );
// };

// export default BasicDrawer;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { Drawer, Button } from "antd";

const BasicDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showDrawer}>
        Open Drawer
      </Button>
      <Drawer
        title="Ant Design Drawer with All Props" // 1. Drawer title
        open={isDrawerOpen} // 2. Controls visibility of the drawer
        onClose={closeDrawer} // 3. Callback when the drawer is closed
        placement="left" // 4. Drawer position ('left', 'right', 'top', 'bottom')
        width={450} // 5. Drawer width (for 'left'/'right' placement)
        height={300} // 6. Drawer height (for 'top'/'bottom' placement)
        closable={true} // 7. Show or hide the close (X) button
        mask={true} // 8. Show or hide the backdrop (mask)
        maskClosable={true} // 9. Allow closing by clicking the mask
        keyboard={true} // 10. Allow closing with "Escape" key
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }} // 11. Custom styles for the backdrop
        bodyStyle={{ padding: "20px", backgroundColor: "#f0f0f0" }} // 12. Custom styles for drawer content
        drawerStyle={{ border: "2px solid #1890ff" }} // 13. Custom styles for the drawer
        style={{ borderRadius: "10px" }} // 14. Custom styles for the outer drawer wrapper
        zIndex={1500} // 15. Custom z-index
        forceRender={true} // 16. Render drawer content even when not visible
        destroyOnClose={true} // 17. Destroy drawer content when closed
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              // type="primary"
              onClick={closeDrawer}
            >
              Confirm
            </Button>
          </div>
        } // 18. Custom footer
        footerStyle={{ padding: "10px", backgroundColor: "#f5f5f5" }} // 19. Custom styles for the footer
        push={{ distance: 100 }} // 20. Distance to push neighboring content (only when "placement" is "left" or "right")
        closeIcon={<span style={{ fontSize: "16px" }}>×</span>} // 21. Custom close icon
      >
        <p>
          This is a demonstration of all props in Ant Design's Drawer component.
        </p>
        <p>Feel free to customize the drawer according to your needs!</p>
      </Drawer>
    </div>
  );
};

export default BasicDrawer;
