import MobileMenu from "@modules/layout/mobile-menu";
import Sidebar from "@modules/layout/sidebar";
import { useUI } from "@context/ui-managed-context";

interface Props {}

const SidebarView: React.FC<Props> = ({}) => {
  const { sidebarView, closeSidebar } = useUI();
  return (
    <Sidebar onClose={closeSidebar}>
      {sidebarView === "MOBILE_MENU" ? <MobileMenu /> : null}
    </Sidebar>
  );
};
export default SidebarView;
