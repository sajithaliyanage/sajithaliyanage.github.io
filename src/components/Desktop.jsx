import { useEffect, useCallback, useState, useRef } from "react";
import { motion } from "framer-motion";
import useStore from "../store/useStore";
import Icon from "./Icon";
import Taskbar from "./Taskbar";
import WindowManager from "./WindowManager";
import StartMenu from "./StartMenu";
import ContextMenu from "./ContextMenu";
import ErrorDialog from "./ErrorDialog";
import NotificationBalloon from "./NotificationBalloon";
import TurnOffDialog from "./TurnOffDialog";
import LogOffDialog from "./LogOffDialog";
import { useSound } from "../hooks/useSound";

const desktopIcons = [
  {
    id: "my-computer",
    label: "My Computer",
    icon: "myComputer",
    appId: "my-computer",
  },
  { id: "about-me", label: "About Me", icon: "about", appId: "about-me" },
  { id: "resume-pdf", label: "Resume.pdf", icon: "odf", appId: "resume-pdf" },
  { id: "my-projects", label: "My Projects", icon: "ie", appId: "my-projects" },
  {
    id: "contact-me",
    label: "Contact Me",
    icon: "outlook",
    appId: "contact-me",
  },
];

export default function Desktop() {
  const {
    closeStartMenu,
    startMenuOpen,
    systemState,
    showContextMenu,
    hideContextMenu,
    openWindow,
    showNotification,
    turnOffDialogOpen,
    logOffDialogOpen,
  } = useStore();
  const play = useSound();
  const [selectRect, setSelectRect] = useState(null);
  const selectStart = useRef(null);
  const hasNotified = useRef(false);

  const isDialogOpen = turnOffDialogOpen || logOffDialogOpen;

  // Welcome notification on first load
  useEffect(() => {
    if (systemState === "desktop" && !hasNotified.current) {
      hasNotified.current = true;
      const timer = setTimeout(() => {
        showNotification(
          "Welcome!",
          "Double-click icons to explore. Right-click the desktop for more options.",
          "💡",
        );
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [systemState, showNotification]);

  const handleDesktopClick = useCallback(
    (e) => {
      if (
        e.target === e.currentTarget ||
        e.target.closest("[data-desktop-bg]")
      ) {
        closeStartMenu();
        hideContextMenu();
      }
    },
    [closeStartMenu, hideContextMenu],
  );

  // Right-click context menu on desktop
  const handleContextMenu = useCallback(
    (e) => {
      e.preventDefault();
      closeStartMenu();
      play("click");

      showContextMenu(e.clientX, e.clientY, [
        { label: "View", icon: "👁️", disabled: true },
        { label: "Sort By", icon: "📊", disabled: true },
        {
          label: "Refresh",
          icon: "🔄",
          action: () => window.location.reload(),
        },
        { separator: true },
        {
          label: "New Folder",
          icon: "📁",
          action: () => {
            play("navigate");
            useStore
              .getState()
              .showNotification(
                "New Folder",
                "A new folder was created on the desktop.",
                "📁",
              );
          },
        },
        { separator: true },
        { label: "Paste", icon: "📋", disabled: true },
        { separator: true },
        {
          label: "Open Notepad",
          icon: "📝",
          action: () => {
            play("open");
            openWindow({
              id: "notepad",
              title: "Untitled - Notepad",
              icon: "notepad",
              component: "notepad",
              width: 600,
              height: 400,
            });
          },
        },
        {
          label: "Run...",
          icon: "▶️",
          action: () => {
            play("open");
            openWindow({
              id: "run-dialog",
              title: "Run",
              icon: "folder",
              component: "run-dialog",
              width: 420,
              height: 210,
            });
          },
        },
        { separator: true },
        {
          label: "Properties",
          icon: "⚙️",
          action: () => {
            play("ding");
            useStore
              .getState()
              .showErrorDialog(
                "Display Properties",
                "Display properties are not available in this version of Portfolio SL.",
                "info",
              );
          },
        },
      ]);
    },
    [closeStartMenu, play, showContextMenu, openWindow],
  );

  // Desktop drag select
  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    if (
      e.target === e.currentTarget ||
      e.target.hasAttribute("data-desktop-bg")
    ) {
      selectStart.current = { x: e.clientX, y: e.clientY };
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!selectStart.current) return;
    const sx = selectStart.current.x;
    const sy = selectStart.current.y;
    const ex = e.clientX;
    const ey = e.clientY;
    setSelectRect({
      left: Math.min(sx, ex),
      top: Math.min(sy, ey),
      width: Math.abs(ex - sx),
      height: Math.abs(ey - sy),
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    selectStart.current = null;
    setSelectRect(null);
  }, []);

  // Handle logoff
  useEffect(() => {
    if (systemState === "logoff") {
      useStore.getState().closeAllWindows();
      const timer = setTimeout(() => {
        useStore.getState().setSystemState("login");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [systemState]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: systemState === "logoff" ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full h-full flex flex-col relative"
    >
      {/* Wrapper that applies grayscale + dim when dialog is open */}
      <div
        className="flex-1 flex flex-col"
        style={{
          filter: isDialogOpen
            ? "grayscale(100%) brightness(0.6)"
            : "grayscale(0%) brightness(1)",
          transition: "filter 0.5s ease",
        }}
      >
        {/* Desktop area */}
        <div
          className="flex-1 relative overflow-hidden"
          style={{ background: "#3a6ea5" }}
          onClick={handleDesktopClick}
          onContextMenu={handleContextMenu}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Bliss wallpaper */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/wallpaper.webp')" }}
            data-desktop-bg="true"
          />

          {/* Desktop Icons */}
          <div className="absolute inset-0 z-10">
            {desktopIcons.map((icon, index) => (
              <Icon
                key={icon.id}
                {...icon}
                defaultX={16}
                defaultY={16 + index * 100}
              />
            ))}
          </div>

          {/* Window Manager */}
          <WindowManager />

          {/* Start Menu */}
          {startMenuOpen && <StartMenu />}

          {/* Drag select rectangle */}
          {selectRect && selectRect.width > 5 && selectRect.height > 5 && (
            <div
              className="fixed pointer-events-none"
              style={{
                left: selectRect.left,
                top: selectRect.top,
                width: selectRect.width,
                height: selectRect.height,
                border: "1px solid #316ac5",
                background: "rgba(49,106,197,0.15)",
                zIndex: 5,
              }}
            />
          )}
        </div>

        {/* Taskbar */}
        <Taskbar />
      </div>

      {/* --- Overlays rendered OUTSIDE the grayscale wrapper --- */}

      {/* Turn Off Dialog */}
      <TurnOffDialog />

      {/* Log Off Dialog */}
      <LogOffDialog />

      {/* Context Menu */}
      <ContextMenu />

      {/* Error Dialog */}
      <ErrorDialog />

      {/* Notification Balloon */}
      <NotificationBalloon />
    </motion.div>
  );
}
